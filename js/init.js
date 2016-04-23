window.addEventListener('load', function()
{
	setLoading();
	setMenu();
	setFastClick();
	setAnchors();
	setArrowUp();

	function setLoading()
	{
		var elems = document.querySelectorAll('.loading');

		for (var i = 0, len = elems.length; i < len; i++)
		{
			var elem = elems[i];

			elem.classList.remove('loading');
		}
	}

	function setMenu()
	{
		var menuButton = document.querySelector('.menu-button');
		var menu = document.querySelector('.menu');
		var menuClose = menu.querySelector('.close');
		var isVisible = false;
		var hammer = new Hammer(menu);

		menuButton.addEventListener('click', function(event)
		{
			event.stopPropagation();

			if (isVisible)
				hideMenu();
			else
				showMenu();
		});

		menuClose.addEventListener('click', hideMenu);

		document.addEventListener('click', hideMenu);

		document.addEventListener('keydown', function(event)
		{
			// ESC
			if (event.keyCode === 27)
				hideMenu();
		});

		menu.addEventListener('click', function(event)
		{
			event.stopPropagation();
		});

		menu.addEventListener('wheel', function(event)
		{
			event.preventDefault();
		});

		hammer.on('panright', function()
		{
			hideMenu();
		});

		function showMenu()
		{
			if (isVisible)
				return;

			isVisible = true;
			menu.classList.add('visible');
		}

		function hideMenu()
		{
			if (!isVisible)
				return;

			isVisible = false;
			menu.classList.remove('visible');
		}
	}

	function setFastClick()
	{
		FastClick.attach(document.body);
	}

	function setAnchors()
	{
		if (window.anchors)
			anchors.add('.content h2, .content h3, .content h4');
	}

	function setArrowUp()
	{
		var arrow = document.querySelector('.arrow-up');
		var isVisible = false;

		if (!arrow)
			return;

		document.addEventListener('scroll', function()
		{
			var contentHeight = document.body.scrollHeight;
			var visibleHeight = document.body.offsetHeight;
			var scrollTop = document.body.scrollTop;

			if ((scrollTop > visibleHeight) && (scrollTop + visibleHeight < contentHeight - 150))
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
		});

		arrow.addEventListener('click', function()
		{
			document.body.scrollTop = 0;
		});
	}
});
