const path = require('path');
const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const sitemap = require('gulp-sitemap');
const browserify = require('browserify');
const stream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const rsync = require('rsyncwrapper');

const PKG = require('./package.json');

gulp.task('clean', () =>
{
	return del([ '_site', '.sass-cache' ], { force: true });
});

gulp.task('browserify', () =>
{
	return browserify([path.join(__dirname, PKG.main)])
		.bundle()
		.pipe(stream(PKG.name + '.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(rename('site.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('sitemap', () =>
{
	return gulp.src('_site/**/*.html')
		.pipe(sitemap(
			{
				siteUrl : PKG.homepage
			}))
		.pipe(gulp.dest('./_site'));
});

gulp.task('jekyll:build', shell.task(
	[ 'bundle exec jekyll build' ]
));

gulp.task('jekyll:watch', shell.task(
	[ 'bundle exec jekyll serve --host 0.0.0.0' ]
));

gulp.task('rsync', (done) =>
{
	const options =
	{
		src	      : './_site/',
		dest      : 'vhost1-deploy:/var/www/mediasoup.org/',
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

	rsync(options, (error, stdout, stderr, cmd) =>
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

gulp.task('build', gulp.series('clean', 'browserify', 'jekyll:build', 'sitemap'));

gulp.task('live', gulp.series('clean', 'browserify', 'jekyll:watch'));

gulp.task('deploy', gulp.series('build', 'rsync'));

gulp.task('default', gulp.series('build'));
