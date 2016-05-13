var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var request = require('request');
var shell = require('gulp-shell');
var sitemap = require('gulp-sitemap');
var fs = require('fs');
var rsync = require('rsyncwrapper');

const PKG = require('./package.json');

gulp.task('clean', shell.task(
	[ 'rm -rf _site/ .sass-cache/' ]
));

gulp.task('bower:clean', shell.task(
	[ 'rm -rf ./js/libs/' ]
));

gulp.task('bower:install', shell.task(
	[ 'bower install' ]
));

gulp.task('bower:main-files', function()
{
	return gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(gulp.dest('./js/libs'));
});

gulp.task('bower', gulp.series('bower:clean', 'bower:install', 'bower:main-files'));

gulp.task('npm-shield', function () {
  return request('https://img.shields.io/npm/v/mediasoup.svg')
  	.pipe(fs.createWriteStream('images/npm-shield-mediasoup.svg'));
});

gulp.task('sitemap', function()
{
	return gulp.src('_site/**/*.html')
		.pipe(sitemap(
			{
				siteUrl : PKG.homepage
			}))
		.pipe(gulp.dest('./_site'));
});

gulp.task('jekyll:build', shell.task(
	[ 'jekyll build' ]
));

gulp.task('jekyll:watch', shell.task(
	[ 'jekyll serve' ]
));

gulp.task('rsync', function(done)
{
	var options =
	{
		src	      : './_site/',
		dest      : 'v2:/var/www/mediasoup.org/',
		ssh       : true,
		recursive : true,
		deleteAll : true,
		args      : [ '--no-perms' ],
		onStdout  : function(data)
		{
			console.log(String(data));
		},
		onStderr  : function(data)
		{
			console.error(String(data));
		},
	};

	rsync(options, function(error, stdout, stderr, cmd)
	{
		if (!error)
		{
			console.log(cmd + ' succeeded');
			done();
		}
		else
		{
			console.log(cmd + ' failed');
			done(error);
		}
	});
});

gulp.task('build', gulp.series('clean', 'bower', 'npm-shield', 'jekyll:build', 'sitemap'));

gulp.task('live', gulp.series('clean', 'bower', 'jekyll:watch'));

gulp.task('deploy', gulp.series('build', 'rsync'));

gulp.task('default', gulp.series('build'));
