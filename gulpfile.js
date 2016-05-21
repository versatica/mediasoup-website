var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var sitemap = require('gulp-sitemap');
var browserify = require('browserify');
var vinyl_source_stream = require('vinyl-source-stream');
var vinyl_buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var request = require('request');
var rsync = require('rsyncwrapper');

const PKG = require('./package.json');

gulp.task('clean', shell.task(
	[ 'rm -rf _site/ .sass-cache/' ]
));

gulp.task('browserify', function()
{
	return browserify([path.join(__dirname, PKG.main)])
		.bundle()
		.pipe(vinyl_source_stream(PKG.name + '.js'))
		.pipe(vinyl_buffer())
		.pipe(uglify())
		.pipe(rename('site.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('npm-shield', function()
{
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

gulp.task('build', gulp.series('clean', 'browserify', 'npm-shield', 'jekyll:build', 'sitemap'));

gulp.task('live', gulp.series('clean', 'browserify', 'jekyll:watch'));

gulp.task('deploy', gulp.series('build', 'rsync'));

gulp.task('default', gulp.series('build'));
