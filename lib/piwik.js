module.exports = function()
{
	var _paq = _paq || [];

	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);

	var u = (('https:' == document.location.protocol) ? 'https' : 'http') + '://private.versatica.com/piwik/';

	_paq.push(['setTrackerUrl', u+'piwik.php']);
	_paq.push(['setSiteId', 8]);

	var d = document;
	var g = d.createElement('script');
	var s = d.getElementsByTagName('script')[0];

	g.type = 'text/javascript';
	g.defer = true;
	g.async = true;
	g.src = u+'piwik.js';
	s.parentNode.insertBefore(g, s);
};
