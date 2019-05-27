const path = require('path');
const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const replace = require('gulp-replace');
const sitemap = require('gulp-sitemap');
const browserify = require('browserify');
const stream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const Octokit = require('@octokit/rest');
const rsync = require('rsyncwrapper');

const pkg = require('./package.json');
const octokit = Octokit();

gulp.task('clean', () =>
{
	return del([ '_site', '.sass-cache' ], { force: true });
});

gulp.task('browserify', () =>
{
	return browserify([path.join(__dirname, pkg.main)])
		.bundle()
		.pipe(stream(pkg.name + '.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(rename('site.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('jekyll:build', shell.task(
	[ 'bundle exec jekyll build' ]
));

gulp.task('jekyll:watch', shell.task(
	[ 'bundle exec jekyll serve --host 0.0.0.0' ]
));

gulp.task('shields', async () =>
{
	let tags;

	tags = await octokit.repos.listTags({ owner:'versatica', repo:'mediasoup' });

	const mediasoupVersion = tags.data[0].name;

	tags = await octokit.repos.listTags({ owner:'versatica', repo:'mediasoup-client' });

	const mediasoupClientVersion = tags.data[0].name;

	tags = await octokit.repos.listTags({ owner:'versatica', repo:'libmediasoupclient' });

	const libmediasoupclientVersion = tags.data[0].name;

	return gulp.src('_site/index.html')
		.pipe(replace(
			/__MEDIASOUP_VERSION_SHIELD__/g,
			`https://img.shields.io/badge/mediasoup-v${mediasoupVersion}-blue.svg`
		))
		.pipe(replace(
			/__MEDIASOUP_CLIENT_VERSION_SHIELD__/g,
			`https://img.shields.io/badge/mediasoup--client-v${mediasoupClientVersion}-blue.svg`
		))
		.pipe(replace(
			/__LIBMEDIASOUPCLIENT_VERSION_SHIELD__/g,
			`https://img.shields.io/badge/libmediasoupclient-v${libmediasoupclientVersion}-blue.svg`
		))
		.pipe(gulp.dest('./_site'));
});

gulp.task('sitemap', () =>
{
	return gulp.src('_site/**/*.html')
		.pipe(sitemap({ siteUrl: pkg.homepage }))
		.pipe(gulp.dest('./_site'));
});

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

gulp.task('build', gulp.series('clean', 'browserify', 'jekyll:build', 'shields', 'sitemap'));

gulp.task('live', gulp.series('clean', 'browserify', 'jekyll:watch', 'shields'));

gulp.task('deploy', gulp.series('build', 'rsync'));

gulp.task('default', gulp.series('build'));
