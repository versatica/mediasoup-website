window.addEventListener('load', function()
{
	var fadeinElems = document.querySelectorAll('.shields');

	for (var i = 0, len = fadeinElems.length; i < len; i++)
	{
		var fadeinElem = fadeinElems[i];

		fadeinElem.classList.remove('fadein');
	}
});
