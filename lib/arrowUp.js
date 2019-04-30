module.exports = () =>
{
	const arrow = document.querySelector('.arrow-up');
	let isVisible = false;
	let elem;
	let startTime = new Date();
	const interval = 1000;
	let timer;

	if (!arrow)
		return;

	function checkScroll()
	{
		const scrollHeight = elem.scrollHeight;
		const visibleHeight = elem.offsetHeight;
		const scrollTop = elem.scrollTop;

		// Reset timer.
		clearTimeout(timer);
		timer = null;

		if (
			scrollTop > visibleHeight &&
			(scrollTop + visibleHeight < scrollHeight - 100)
		)
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

	document.addEventListener('scroll', () =>
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

		// Check interval.
		const now = new Date();

		if (now - startTime >= interval)
		{
			startTime = now;
			checkScroll();
		}
		else
		{
			if (!timer)
			{
				timer = setTimeout(() =>
				{
					if (!timer)
						return;

					checkScroll();
				}, interval * 1.5);
			}

			return;
		}
	}, { passive: true });

	arrow.addEventListener('click', () =>
	{
		// Hack: https://miketaylr.com/posts/2014/11/document-body-scrolltop.html
		const d = document;

		if (d.documentElement && d.documentElement.scrollTop)
			d.documentElement.scrollTop = 0;
		else if (d.body.parentNode && d.body.parentNode.scrollTop)
			d.body.parentNode.scrollTop = 0;
		else if (d.body && d.body.scrollTop)
			d.body.scrollTop = 0;
	});
};
