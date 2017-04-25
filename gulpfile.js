'use strict';

const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const sitemap = require('gulp-sitemap');
const browserify = require('browserify');
const vinyl_source_stream = require('vinyl-source-stream');
const vinyl_buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const request = require('request');
const rsync = require('rsyncwrapper');

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
	[ 'jekyll serve --host 0.0.0.0' ]
));

gulp.task('rsync', function(done)
{
	const options =
	{
		src	      : './_site/',
		dest      : 'v2:/var/www/mediasoup.org/',
		ssh       : true,
		recursive : true,
		deleteAll : true,
		args      : [ '--no-perms' ],
		onStdout  : (data) =>
		{
			console.log(String(data));
		},
		onStderr  : (data) =>
		{
			console.error(String(data));
		}
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

gulp.task('d', gulp.series('deploy'));

gulp.task('default', gulp.series('build'));
