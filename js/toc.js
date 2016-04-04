window.addEventListener('load', function()
{
	var tocButton = document.querySelector('.toc-button');
	var toc = document.querySelector('.toc-wrapper');
	var tocUl = document.querySelector('.toc-wrapper ul.toc');
	var transitionDuration = 200;

	function showToc()
	{
		if (toc.classList.contains('visible'))
			return;

		toc.classList.add('visible');
		tocUl.style.display = '';
	}

	function hideToc()
	{
		if (! toc.classList.contains('visible'))
			return;

		toc.classList.remove('visible');
		setTimeout(function()
		{
			if (!toc.classList.contains('visible'))
			{
				tocUl.style.display = 'none';
			}
		}, transitionDuration * 1.5);
	}

	// Click on the TOC button shows/hides the TOC panel.
	tocButton.addEventListener('click', function(event)
	{
		if (! toc.classList.contains('visible'))
			showToc();
		else
			hideToc();
	});

	// ESC key hides the TOC panel.
	window.addEventListener('keydown', function(event)
	{
		// ESC
		if (event.keyCode === 27)
			hideToc();
	});

	// Click on the whole page hides the TOC panel,
	document.body.addEventListener('click', function(event)
	{
		hideToc();
	});
	// ...unless it is the TOC button,
	tocButton.addEventListener('click', function(event)
	{
		event.stopPropagation();
	});
	// ...or the TOC panel.
	toc.addEventListener('click', function(event)
	{
		event.stopPropagation();
	});

	// Hack 1 to avoid content (body) scrolling while scrolling the TOC.
	toc.addEventListener('mouseover', function(event)
	{
		// NOTE: This does not work in Chrome but does work in Firefox and Safari.
		document.body.style.overflow = 'hidden';
	});
	toc.addEventListener('mouseout', function(event)
	{
		document.body.style.overflow = 'auto';
	});

	// Hack 2 to avoid content (body) scrolling while scrolling the TOC.
	toc.addEventListener('mousewheel', function(event)
	{
		// This works in Chrome but just if the TOC needs a vertical scroll.
		return false;
	});

});
