var init = {};

window.addEventListener('load', function()
{
	init.setLoading();
});

init.setLoading = function()
{
	var elems = document.querySelectorAll('.loading');

	for (var i = 0, len = elems.length; i < len; i++)
	{
		var elem = elems[i];

		elem.classList.remove('loading');
	}
};

init.setAnchors = function()
{
	window.anchors.add('.content h2, .content h3, .content h4');
};
