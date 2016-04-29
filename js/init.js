window.addEventListener('load', function()
{
	setLoading();
	setMenu();
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
		var hammer = new Hammer.Manager(menu);

		hammer.add(new Hammer.Pan({ threshold: 15 }));

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

			// Avoid body scroll in mobile.
			document.body.classList.add('noscroll');
		}

		function hideMenu()
		{
			if (!isVisible)
				return;

			isVisible = false;
			menu.classList.remove('visible');

			// Allow body scroll in mobile.
			document.body.classList.remove('noscroll');
		}
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
		var elem;

		if (!arrow)
			return;

		document.addEventListener('scroll', function()
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

			var scrollHeight = elem.scrollHeight;
			var visibleHeight = elem.offsetHeight;
			var scrollTop = elem.scrollTop;

			if ((scrollTop > visibleHeight) && (scrollTop + visibleHeight < scrollHeight - 150))
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
			// Hack: https://miketaylr.com/posts/2014/11/document-body-scrolltop.html
			var d = document;

			if (d.documentElement && d.documentElement.scrollTop)
				d.documentElement.scrollTop = 0;
			else if (d.body.parentNode && d.body.parentNode.scrollTop)
				d.body.parentNode.scrollTop = 0;
			else if (d.body && d.body.scrollTop)
				d.body.scrollTop = 0;
		});
	}
});
