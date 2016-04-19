window.addEventListener('load', function()
{
	var tocButton = document.querySelector('.toc-button');
	var toc = document.querySelector('.toc-wrapper');
	var tocUl = document.querySelector('.toc-wrapper ul.toc');
	var transitionDuration = 200;
	var isTocVisible = false;

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
			if (!toc.classList.contains('visible'))
				tocUl.style.display = 'none';
		}, transitionDuration * 1.5);
	}

	// Click on the TOC button shows/hides the TOC panel.
	tocButton.addEventListener('click', function(event)
	{
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
});
