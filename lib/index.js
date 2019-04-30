const domready = require('domready');
const loading = require('./loading');
const shields = require('./shields');
const menu = require('./menu');
const arrowUp = require('./arrowUp');
const anchors = require('./anchors');
const apiToc = require('./apiToc');
// const piwik = require('./piwik');

domready(() =>
{
	loading();
	shields();
	menu();
	arrowUp();

	// Set anchors if requested.
	if (window.siteSettings.anchors)
		anchors();

	// Set API TOC if requested.
	if (window.siteSettings.apiToc)
		apiToc();

	// Set Piwik.
	// piwik();
});
