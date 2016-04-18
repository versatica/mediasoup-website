window.addEventListener('load', function()
{
	setLoading();
	setAnchors();
	setArrowUp();

	function setLoading()
	{
		var loadingElems = document.querySelectorAll('.loading');

		for (var i = 0, len = loadingElems.length; i < len; i++)
		{
			var elem = loadingElems[i];

			elem.classList.remove('loading');
		}
	}

	function setAnchors()
	{
		if (window.anchors)
			anchors.add('.content h2, .content h3, .content h4');
	}

	function setArrowUp()
	{
		var arrowElem = document.querySelector('.arrow-up');
		var isVisible = false;

		if (!arrowElem)
			return;

		document.addEventListener('scroll', function()
		{
			var contentHeight = document.body.scrollHeight;
			var visibleHeight = document.body.offsetHeight;
			var scrollTop = document.body.scrollTop;

			if ((scrollTop > visibleHeight) && (scrollTop + visibleHeight < contentHeight - 150))
			{
				if (!isVisible)
				{
					isVisible = true;
					arrowElem.classList.add('visible');
				}
			}
			else
			{
				if (isVisible)
				{
					isVisible = false;
					arrowElem.classList.remove('visible');
				}
			}
		});

		arrowElem.addEventListener('click', function()
		{
			document.body.scrollTop = 0;
		});
	}
});
