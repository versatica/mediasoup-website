import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());
// Unauthenticated Octokit is enough now that the 'replace' task only hits the
// GitHub API once (for libmediasoupclient, which is not published on NPM nor
// crates.io). Everything else is queried from the NPM and crates.io registries,
// so no GITHUB_TOKEN is needed to stay within the 60 req/hour anonymous limit.
const octokit = new Octokit();

/**
 * Filter releases/tags with just X.Y.Z content.
 */
function getSemverVersions(datas)
{
	return datas.filter(data => /^\d+\.\d+\.\d+$/.test(data.name));
}

/**
 * Get the latest version of a package published on NPM.
 */
function getNpmVersion(name)
{
	return execSync(`npm view ${name} version`).toString().trim();
}

/**
 * Get the latest stable version of a crate published on crates.io.
 */
async function getCrateVersion(name)
{
	const response = await fetch(`https://crates.io/api/v1/crates/${name}`, {
		headers : { 'User-Agent': `${pkg.name} (${pkg.homepage})` },
	});

	if (!response.ok)
	{
		throw new Error(`cannot fetch crates.io version for '${name}': HTTP ${response.status}`);
	}

	return (await response.json()).crate.max_stable_version;
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
	// NPM package.
	const mediasoupNodeVersion = getNpmVersion('mediasoup');
	console.log('"replace" task | mediasoup node:', mediasoupNodeVersion);

	// crates.io crate.
	const mediasoupRustVersion = await getCrateVersion('mediasoup');
	console.log('"replace" task | mediasoup rust:', mediasoupRustVersion);

	// NPM package.
	const mediasoupClientVersion = getNpmVersion('mediasoup-client');
	console.log('"replace" task | mediasoup-client:', mediasoupClientVersion);

	// Not published on NPM nor crates.io, so read its latest tag from GitHub.
	const libmediasoupclientTags = await octokit.repos.listTags({ owner:'versatica', repo:'libmediasoupclient' });

	const libmediasoupclientVersion = getSemverVersions(libmediasoupclientTags.data)[0].name;
	console.log('"replace" task | libmediasoupclient:', libmediasoupclientVersion);

	// NPM package.
	const mediasoupClientAiortcVersion = getNpmVersion('mediasoup-client-aiortc');
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

gulp.task('build', gulp.series('clean', 'browserify', 'jekyll:build', 'replace', 'sitemap'));

gulp.task('live', gulp.series('clean', 'browserify', 'jekyll:watch'));

gulp.task('default', gulp.series('build'));
