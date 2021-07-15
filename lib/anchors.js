const AnchorJS = require('anchor-js');
const anchorjs = new AnchorJS();

module.exports = () =>
{
	anchorjs.add('.content h2, .content h3, .content h4');
};
