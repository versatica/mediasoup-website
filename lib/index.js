var domready = require('domready');
var loading = require('./loading');
var shields = require('./shields');
var menu = require('./menu');
var arrowUp = require('./arrowUp');
var anchors = require('./anchors');
var apiToc = require('./apiToc');
// var piwik = require('./piwik');

domready(function()
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
