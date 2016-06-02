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

	// ESC key hides the menu.
	document.addEventListener('keydown', function(event)
	{
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
	}

	function hideMenu()
	{
		if (!isVisible)
			return;

		isVisible = false;
		menu.classList.remove('visible');
		menuButton.classList.remove('hidden');
	}
};
