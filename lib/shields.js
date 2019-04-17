module.exports = function()
{
	var shields = document.querySelectorAll('.shield img');

	shields.forEach(function(shield)
	{
		shield.src = shield.dataset.canonicalSrc;
	});
};


