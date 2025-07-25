## mediasoupClient
{: #mediasoupClient}

<section markdown="1">

The top-level exported module.

```typescript
// Using ES6 import.
import * as mediasoupClient from "mediasoup-client";

// Or using destructuring assignment:
import {
  types,
  version,
  Device,
  detectDevice,
  detectDeviceAsync,
  parseScalabilityMode,
  debug
} from "mediasoup-client";

// Using CommonJS.
const mediasoupClient = require("mediasoup-client");

// Or using destructuring assignment:
const {
  types,
  version,
  Device,
  detectDevice,
  detectDeviceAsync,
  parseScalabilityMode,
  debug
} = require("mediasoup-client");
```

</section>


### Properties
{: #mediasoupClient-properties}

<section markdown="1">

#### mediasoupClient.types
{: #mediasoupClient-types .code}

An Object holding all classes and **TypeScript** types exported by mediasoup-client.

> `@type` Object, read only

```typescript
import { types as mediasoupTypes } from "mediasoup-client";

let producer: mediasoupTypes.Producer;
let rtpParameters: mediasoupTypes.RtpParameters;

// or alternatively:

import { Producer, RtpParameters } from "mediasoup-client/types";

let producer: Producer;
let rtpParameters: RtpParameters;
```

#### mediasoupClient.version
{: #mediasoupClient-version .code}

The mediasoup-client version.

> `@type` String, read only

```javascript
console.log(mediasoupClient.version);
// => "3.0.0"
```

#### mediasoupClient.debug
{: #mediasoupClient-debug .code}

Exposes the [debug](https://www.npmjs.com/package/debug) dependency used by mediasoup-client. Useful if you need to enable/disable `debug` namespaces programatically.  

</section>


### Classes
{: #mediasoupClient-classes}

<section markdown="1">

#### mediasoupClient.Device
{: #mediasoupClient-Device .code}

The main `Device` class.

> `@type` [Device](#Device), read only

```javascript
const device = new mediasoupClient.Device();
```

</section>


### Functions
{: #mediasoupClient-functions}

<section markdown="1">

#### mediasoupClient.detectDeviceAsync(userAgent)
{: #mediasoupClient-detectDeviceAsync .code}

Performs current browser/device detection and returns the corresponding mediasoup-client WebRTC handler name (or nothing if the browser/device is not supported).

<div markdown="1" class="table-wrapper L3">
  
Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`userAgent` | String  | Optional browser User-Agen string. If not given, `navigator.userAgent` will be used (in case of browser). | No |

</div>

> `@async`
> 
> `@returns` [BuiltinHandlerName](#BuiltinHandlerName) \| undefined

```javascript
const handlerName = await mediasoupClient.detectDeviceAsync();

if (handlerName) {
  console.log("detected handler: %s", handlerName);
} else {
  console.warn("no suitable handler found for current browser/device");
}
```

<div markdown="1" class="note">
* Compared to [detectDevice()](#mediasoupClient-detectDevice), `detectDeviceAsync()` not only uses the browser `User-Agent` string to deternine which handler to asign, but it also performs available API checks using [withFeatureCheck()](https://docs.uaparser.dev/api/main/idata/with-feature-check.html) in **ua-parser-js** library.
* So for example, `detectDevice()` fails to detect Safari on iPad in "desktop mode" while `detectDeviceAsync()` detects it properly.
</div>

#### mediasoupClient.detectDevice(userAgent)
{: #mediasoupClient-detectDevice .code}

Performs current browser/device detection and returns the corresponding mediasoup-client WebRTC handler name (or nothing if the browser/device is not supported).

<div markdown="1" class="table-wrapper L3">
  
Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`userAgent` | String  | Optional browser User-Agen string. If not given, `navigator.userAgent` will be used (in case of browser). | No |

</div>
> `@deprecated`
>
> `@returns` [BuiltinHandlerName](#BuiltinHandlerName) \| undefined

```javascript
const handlerName = mediasoupClient.detectDevice();

if (handlerName) {
  console.log("detected handler: %s", handlerName);
} else {
  console.warn("no suitable handler found for current browser/device");
}
```

<div markdown="1" class="note warn">
This function is deprecated. Use [detectDeviceAsync()](#mediasoupClient-detectDeviceAsync) instead.
</div>

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
mediasoupClient.parseScalabilityMode("L2T3");
// => { spatialLayers: 2, temporalLayers: 3 }

mediasoupClient.parseScalabilityMode("S3T3");
// => { spatialLayers: 3, temporalLayers: 3 }

mediasoupClient.parseScalabilityMode("L4T7_KEY_SHIFT");
// => { spatialLayers: 4, temporalLayers: 7 }

mediasoupClient.parseScalabilityMode(undefined);
// => { spatialLayers: 1, temporalLayers: 1 }
```

</section>
