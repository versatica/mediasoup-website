window.addEventListener('load', function()
{
	var loadingElems = document.querySelectorAll('.loading');

	for (var i = 0, len = loadingElems.length; i < len; i++)
	{
		var elem = loadingElems[i];

		elem.classList.remove('loading');
	}

	// Load anchor-js
	if (window.anchors)
	{
		anchors.add('.content h2, .content h3, .content h4');
	}
});
