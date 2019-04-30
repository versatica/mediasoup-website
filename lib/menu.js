const hammerjs = require('hammerjs');
const dontscrollthebody = require('dontscrollthebody');

module.exports = () =>
{
	const menuButton = document.querySelector('.menu-button');
	const footerMore = document.querySelector('.footer-more');
	const menu = document.querySelector('.menu');
	const menuClose = menu.querySelector('.close');
	let isVisible = false;
	const hammer = new hammerjs.Manager(menu);

	hammer.add(new hammerjs.Pan({ threshold: 15 }));

	dontscrollthebody(menu);

	document.addEventListener('click', (event) =>
	{
		if (menuButton.contains(event.target))
		{
			showMenu();
		}
		else if (footerMore.contains(event.target))
		{
			event.preventDefault();

			if (!isVisible)
				showMenu();
			else
				hideMenu();
		}
		else if (!menu.contains(event.target))
		{
			hideMenu();
		}
	});

	menuClose.addEventListener('click', hideMenu);

	// ESC key hides the menu.
	document.addEventListener('keydown', (event) =>
	{
		if (event.keyCode === 27)
			hideMenu();
	});

	hammer.on('panright', () => hideMenu());

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
