var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var shell = require('gulp-shell');

gulp.task('bower', function()
{
	return gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(gulp.dest('./js/libs'));
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

gulp.task('build', gulp.series('clean', 'bower', 'jekyll:build'));

gulp.task('live', gulp.series('bower', 'jekyll:watch'));

gulp.task('default', gulp.series('build'));
