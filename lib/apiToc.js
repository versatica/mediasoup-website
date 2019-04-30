const hammerjs = require('hammerjs');
const dontscrollthebody = require('dontscrollthebody');

module.exports = () =>
{
	const tocButton = document.querySelector('.api-toc-button');
	const toc = document.querySelector('.api-toc-wrapper');
	const tocUl = toc.children[0];
	const transitionDuration = 200;
	let isTocVisible = false;
	const tocButtonHammer = new hammerjs.Manager(tocButton);
	const tocHammer = new hammerjs.Manager(toc);

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

	document.addEventListener('click', (event) =>
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
	document.addEventListener('keydown', (event) =>
	{
		if (event.keyCode === 27)
			hideToc();
	});

	tocButtonHammer.on('panleft', () => showToc());

	tocHammer.on('panright', () => hideToc());

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
