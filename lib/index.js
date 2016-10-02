var domready = require('domready');

var menu = require('./menu');
var arrowUp = require('./arrowUp');
var anchors = require('./anchors');
var apiToc = require('./apiToc');
var piwik = require('./piwik');

domready(function()
{
	// Always set the menu
	menu();

	// Always set the arrow-up
	arrowUp();

	// Set anchors if requested
	if (window.settings.anchors)
		anchors();

	// Set API TOC if requested
	if (window.settings.apiToc)
		apiToc();

	// Set Piwik
	// piwik();
});
