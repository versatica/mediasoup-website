module.exports = () =>
{
	const shields = document.querySelectorAll('.shield img');

	shields.forEach((shield) =>
	{
		shield.src = shield.dataset.canonicalSrc;
	});
};


