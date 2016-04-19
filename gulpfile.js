var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var request = require('request');
var shell = require('gulp-shell');
var fs = require('fs');

gulp.task('bower', function()
{
	return gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(gulp.dest('./js/libs'));
});

gulp.task('npm-shield', function () {
  return request('https://img.shields.io/npm/v/mediasoup.svg')
  	.pipe(fs.createWriteStream('images/npm-shield-mediasoup.svg'));
});

gulp.task('jekyll:build', shell.task(
	[ 'jekyll build' ]
));

gulp.task('jekyll:watch', shell.task(
	[ 'jekyll serve' ]
));

gulp.task('clean', shell.task(
	[ 'rm -rf _site/ .sass-cache/' ]
));

gulp.task('build', gulp.series('clean', 'bower', 'npm-shield', 'jekyll:build'));

gulp.task('live', gulp.series('clean', 'bower', 'jekyll:watch'));

gulp.task('default', gulp.series('build'));
