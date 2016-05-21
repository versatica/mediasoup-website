var domready = require('domready');

var menu = require('./menu');
var arrowUp = require('./arrowUp');
var anchors = require('./anchors');
var apiToc = require('./apiToc');
var piwik = require('./piwik');

domready(function()
{
	var page = window.page;

	// Always set the menu
	menu();

	// Always set the arrow-up
	arrowUp();

	// Set anchors if requested
	if (page.anchors)
		anchors();

	// Set API TOC if requested
	if (page.apiToc)
		apiToc();

	// Set Piwik
	// piwik();
});
