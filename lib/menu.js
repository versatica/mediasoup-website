var hammerjs = require('hammerjs');
var dontscrollthebody = require('dontscrollthebody');

module.exports = function()
{
	var menuButton = document.querySelector('.menu-button');
	var menu = document.querySelector('.menu');
	var menuClose = menu.querySelector('.close');
	var isVisible = false;
	var hammer = new hammerjs.Manager(menu);

	hammer.add(new hammerjs.Pan({ threshold: 15 }));

	dontscrollthebody(menu);

	document.addEventListener('click', function(event)
	{
		if (menuButton.contains(event.target))
		{
			showMenu();
		}
		else if (!menu.contains(event.target))
		{
			hideMenu();
		}
	});

	menuClose.addEventListener('click', hideMenu);

	document.addEventListener('keydown', function(event)
	{
		// ESC
		if (event.keyCode === 27)
			hideMenu();
	});

	hammer.on('panright', function()
	{
		hideMenu();
	});

	function showMenu()
	{
		if (isVisible)
			return;

		isVisible = true;
		menu.classList.add('visible');
		menuButton.classList.add('hidden');

		// Avoid body scroll in mobile.
		document.body.classList.add('noscroll');
	}

	function hideMenu()
	{
		if (!isVisible)
			return;

		isVisible = false;
		menu.classList.remove('visible');
		menuButton.classList.remove('hidden');

		// Allow body scroll in mobile.
		document.body.classList.remove('noscroll');
	}
};
