import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import { deleteAsync } from 'del';
import { default as gulp } from 'gulp';
import rename from 'gulp-rename';
import { default as shell } from 'gulp-shell';
import replace from 'gulp-replace';
import sitemap from 'gulp-sitemap';
import browserify from 'browserify';
import stream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify-es';
import { Octokit } from '@octokit/rest';
import rsync from 'rsyncwrapper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(fs.readFileSync('./package.json').toString());
const octokit = new Octokit();

/**
 * Filter tags with just X.Y.Z content.
 */
function getSemverVersions(tags)
{
	return tags.filter(tag => /^\d+\.\d+\.\d+$/.test(tag.name));
}

/**
 * Filter tags with just rust-X.Y.Z content.
 */
function getRustSemverVersions(tags)
{
	return tags.filter(tag => /^rust-\d+\.\d+\.\d+$/.test(tag.name));
}

gulp.task('clean', async () =>
{
	return deleteAsync([ '_site', '.sass-cache' ], { force: true });
});

gulp.task('browserify', () =>
{
	return browserify([path.join(__dirname, pkg.main)])
		.bundle()
		.pipe(stream(pkg.name + '.js'))
		.pipe(buffer())
		// TODO: Yes, this sucks.
		.pipe(uglify.default())
		.pipe(rename('site.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('jekyll:build', shell.task(
	[ 'bundle exec jekyll build' ]
));

gulp.task('jekyll:watch', shell.task(
	[ 'bundle exec jekyll serve --host 0.0.0.0 -P 3001' ]
));

gulp.task('replace', async () =>
{
	let tags;

	tags = await octokit.repos.listTags({ owner:'versatica', repo:'mediasoup' });

	const mediasoupNodeVersion = getSemverVersions(tags.data)[0].name;
	console.log('"replace" task | mediasoup node:', mediasoupNodeVersion);

	const mediasoupRustVersion = getRustSemverVersions(tags.data)[0].name.replace(/^rust-/, '');
	console.log('"replace" task | mediasoup rust:', mediasoupRustVersion);

	tags = await octokit.repos.listTags({ owner:'versatica', repo:'mediasoup-client' });

	const mediasoupClientVersion = getSemverVersions(tags.data)[0].name;
	console.log('"replace" task | mediasoup-client:', mediasoupClientVersion);

	tags = await octokit.repos.listTags({ owner:'versatica', repo:'libmediasoupclient' });

	const libmediasoupclientVersion = getSemverVersions(tags.data)[0].name;
	console.log('"replace" task | libmediasoupclient:', libmediasoupclientVersion);

	tags = await octokit.repos.listTags({ owner:'versatica', repo:'mediasoup-client-aiortc' });

	const mediasoupClientAiortcVersion = getSemverVersions(tags.data)[0].name;
	console.log('"replace" task | mediasoup-client-aiortc:', mediasoupClientAiortcVersion);

	return gulp.src('_site/index.html')
		.pipe(replace(/__MEDIASOUP_NODE_VERSION__/g, `v${mediasoupNodeVersion}`))
		.pipe(replace(/__MEDIASOUP_RUST_VERSION__/g, `v${mediasoupRustVersion}`))
		.pipe(replace(/__MEDIASOUP_CLIENT_VERSION__/g, `v${mediasoupClientVersion}`))
		.pipe(replace(/__LIBMEDIASOUPCLIENT_VERSION__/g, `v${libmediasoupclientVersion}`))
		.pipe(replace(/__MEDIASOUP_CLIENT_AIORTC_VERSION__/g, `v${mediasoupClientAiortcVersion}`))
		.pipe(replace(/__CACHE_AVOIDER__/g, `v${Math.random()}`))
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

gulp.task('build', gulp.series('clean', 'browserify', 'jekyll:build', 'replace', 'sitemap'));

gulp.task('live', gulp.series('clean', 'browserify', 'jekyll:watch'));

gulp.task('deploy', gulp.series('build', 'rsync'));

gulp.task('default', gulp.series('build'));
