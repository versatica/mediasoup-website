## mediasoupClient
{: #mediasoupClient}

<section markdown="1">

  The top-level exported module.

```javascript
// Using ES6 import syntax.
import * as mediasoupClient from "mediasoup-client";

// Using CommonJS syntax.
const mediasoupClient = require("mediasoup-client");
```

</section>


### Properties
{: #mediasoupClient-properties}

<section markdown="1">

#### mediasoupClient.version
{: #mediasoupClient-version .code}

The mediasoup-client version.

> `@type` String, read only

```javascript
console.log(mediasoupClient.version);
// => "3.0.0"
```

</section>


### Classes
{: #mediasoupClient-classes}

<section markdown="1">

#### mediasoupClient.Device
{: #mediasoupClient-Device .code}

The main `Device` class.

> `@type` [Device](#Device), read only

```javascript
const device = new mediasoup.Device();
```

</section>


### Functions
{: #mediasoupClient-functions}

<section markdown="1">

#### mediasoupClient.parseScalabilityMode(scalabilityMode)
{: #mediasoupClient-parseScalabilityMode .code}

Parses the given `scalabilityMode` string according to the rules in [webrtc-svc](https://w3c.github.io/webrtc-svc/).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`scalabilityMode` | String | Scalability mode. | No |

</div>

> `@returns` Object:
> 
> * `spatialLayers` {`@type` Number} Number of spatial layers (by default 1).
>
> * `temporalLayers` {`@type` Number} Number of temporal layers (by default 1).

```javascript
mediasoup.parseScalabilityMode("L2T3");
// => { spatialLayers: 2, temporalLayers: 3 }

mediasoup.parseScalabilityMode("L4T7_KEY_SHIFT");
// => { spatialLayers: 4, temporalLayers: 7 }

mediasoup.parseScalabilityMode(undefined);
// => { spatialLayers: 1, temporalLayers: 1 }
```

</section>
