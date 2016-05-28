module.exports = function()
{
	var arrow = document.querySelector('.arrow-up');
	var isVisible = false;
	var elem;
	var startTime = new Date();
	var interval = 1000;
	var timer;

	if (!arrow)
		return;

	function checkScroll()
	{
		var scrollHeight = elem.scrollHeight;
		var visibleHeight = elem.offsetHeight;
		var scrollTop = elem.scrollTop;

		// Reset timer
		clearTimeout(timer);
		timer = null;

		if ((scrollTop > visibleHeight) && (scrollTop + visibleHeight < scrollHeight - 150))
		{
			if (!isVisible)
			{
				isVisible = true;
				arrow.classList.add('visible');
			}
		}
		else
		{
			if (isVisible)
			{
				isVisible = false;
				arrow.classList.remove('visible');
			}
		}
	}

	document.addEventListener('scroll', function()
	{
		if (!elem)
		{
			// Hack: https://miketaylr.com/posts/2014/11/document-body-scrolltop.html

			if (document.documentElement && document.documentElement.scrollTop)
				elem = document.documentElement;
			else if (document.body.parentNode && document.body.parentNode.scrollTop)
				elem = document.body.parentNode;
			else if (document.body.scrollTop)
				elem = document.body;

			if (!elem)
				return;
		}

		// Check interval

		var now = new Date();

		if (now - startTime >= interval)
		{
			startTime = now;
			checkScroll();
		}
		else
		{
			if (!timer)
			{
				timer = setTimeout(function()
				{
					if (!timer)
						return;

					checkScroll();
				}, interval * 1.5);
			}

			return;
		}
	});

	arrow.addEventListener('click', function()
	{
		// Hack: https://miketaylr.com/posts/2014/11/document-body-scrolltop.html
		var d = document;

		if (d.documentElement && d.documentElement.scrollTop)
			d.documentElement.scrollTop = 0;
		else if (d.body.parentNode && d.body.parentNode.scrollTop)
			d.body.parentNode.scrollTop = 0;
		else if (d.body && d.body.scrollTop)
			d.body.scrollTop = 0;
	});
};
