module.exports = function()
{
	// Hack for iOS devices.
	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	if (iOS)
	{
		document.body.classList.add('ios');

		var header = document.querySelector('body > .header')

		if (header)
			header.classList.add('ios');
	}

	// Transition for 'loading' elements.
	var elems = document.querySelectorAll('.loading');

	for (var i = 0, len = elems.length; i < len; ++i)
	{
		var element = elems[i];

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
