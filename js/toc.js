window.addEventListener('load', function()
{
	var tocButton = document.querySelector('.toc-button');
	var toc = document.querySelector('.toc-wrapper');
	var tocUl = document.querySelector('.toc-wrapper ul.toc');
	var transitionDuration = 200;
	var isTocVisible = false;
	var hammer = new Hammer.Manager(toc);

	hammer.add(new Hammer.Pan(
		{
			threshold : 50,
			direction : Hammer.DIRECTION_RIGHT
		}));

	dontscrollthebody(toc);

	function showToc()
	{
		if (isTocVisible)
			return;

		isTocVisible = true;
		toc.classList.add('visible');
		tocUl.style.display = '';
	}

	function hideToc()
	{
		if (!isTocVisible)
			return;

		isTocVisible = false;
		toc.classList.remove('visible');
		setTimeout(function()
		{
			if (!isTocVisible)
				tocUl.style.display = 'none';
		}, transitionDuration * 1.5);
	}

	// Click on the TOC button shows/hides the TOC panel.
	tocButton.addEventListener('click', function(event)
	{
		event.stopPropagation();

		if (!isTocVisible)
			showToc();
		else
			hideToc();
	});

	// ESC key hides the TOC panel.
	window.addEventListener('keydown', function(event)
	{
		if (event.keyCode === 27)
			hideToc();
	});

	// Click on the whole page hides the TOC panel,
	document.addEventListener('click', function(event)
	{
		hideToc();
	});
	// ...unless it happens in the TOC panel.
	toc.addEventListener('click', function(event)
	{
		event.stopPropagation();
	});

	hammer.on('panright', function(event)
	{
		console.log('deltaX:%s | distante:%s', event.deltaX, event.distance);

		hideToc();
	});
});
