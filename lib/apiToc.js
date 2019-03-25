var hammerjs = require('hammerjs');
var dontscrollthebody = require('dontscrollthebody');

module.exports = function()
{
	var tocButton = document.querySelector('.api-toc-button');
	var toc = document.querySelector('.api-toc-wrapper');
	var tocUl = toc.children[0];
	var transitionDuration = 200;
	var isTocVisible = false;
	var tocButtonHammer = new hammerjs.Manager(tocButton);
	var tocHammer = new hammerjs.Manager(toc);

	tocButtonHammer.add(new hammerjs.Pan(
		{
			threshold : 30,
			direction : hammerjs.DIRECTION_LEFT
		}));

	tocHammer.add(new hammerjs.Pan(
		{
			threshold : 30,
			direction : hammerjs.DIRECTION_RIGHT
		}));

	if (!CSS.supports || !CSS.supports('overscroll-behavior', 'contain'))
		dontscrollthebody(toc);

	document.addEventListener('click', function(event)
	{
		if (tocButton.contains(event.target))
		{
			if (!isTocVisible)
				showToc();
			else
				hideToc();
		}
		else if (!toc.contains(event.target))
		{
			hideToc();
		}
	});

	// ESC key hides the TOC panel.
	document.addEventListener('keydown', function(event)
	{
		if (event.keyCode === 27)
			hideToc();
	});

	tocButtonHammer.on('panleft', function()
	{
		showToc();
	});

	tocHammer.on('panright', function()
	{
		hideToc();
	});

	function showToc()
	{
		if (isTocVisible)
			return;

		isTocVisible = true;
		toc.classList.add('visible');
	}

	function hideToc()
	{
		if (!isTocVisible)
			return;

		isTocVisible = false;
		toc.classList.remove('visible');
	}
};
