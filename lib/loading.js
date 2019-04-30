module.exports = () =>
{
	// Hack for iOS devices.
	const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	if (iOS)
	{
		document.body.classList.add('ios');

		const header = document.querySelector('body > .header')

		if (header)
			header.classList.add('ios');
	}

	// Transition for 'loading' elements.
	const elems = document.querySelectorAll('.loading');

	for (let i = 0, len = elems.length; i < len; ++i)
	{
		const element = elems[i];

		(function(elem)
		{
			elem.classList.remove('loading');
			elem.addEventListener('transitionend', loaded);

			function loaded()
			{
				elem.removeEventListener('transitionend', loaded);
				elem.classList.add('loaded');
			}
		})(element);
	}
};
