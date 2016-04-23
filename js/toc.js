window.addEventListener('load', function()
{
	var tocButton = document.querySelector('.toc-button');
	var toc = document.querySelector('.toc-wrapper');
	var tocUl = document.querySelector('.toc-wrapper ul.toc');
	var transitionDuration = 200;
	var isTocVisible = false;

	toc.addEventListener('wheel', function(event)
	{
		var deltaY = event.deltaY;
		var contentHeight = toc.scrollHeight;
		var visibleHeight = toc.offsetHeight;
		var scrollTop = toc.scrollTop;

		if ((scrollTop === 0 && deltaY < 0) ||
		    (visibleHeight + scrollTop === contentHeight && deltaY > 0))
		{
			event.preventDefault();
		}
	});

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
	document.body.addEventListener('click', function(event)
	{
		hideToc();
	});
	// ...unless it happens in the TOC panel.
	toc.addEventListener('click', function(event)
	{
		event.stopPropagation();
	});
});
