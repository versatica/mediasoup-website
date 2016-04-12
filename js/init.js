window.addEventListener('load', function()
{
	var fadeinElems = document.querySelectorAll('.fadein');

	for (var i = 0, len = fadeinElems.length; i < len; i++)
	{
		var fadeinElem = fadeinElems[i];

		fadeinElem.classList.remove('fadein');
	}
});
