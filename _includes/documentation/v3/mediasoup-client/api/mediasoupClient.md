## mediasoupClient
{: #mediasoupClient}

<section markdown="1">

The top-level exported module.

```javascript
// Using import.
import * as mediasoupClient from "mediasoup-client";

// Also using import with destructuring assignment.
import {
  types,
  version,
  Device,
  detectDevice,
  parseScalabilityMode,
  debug
} from "mediasoup-client";

// Using CommonJS.
const mediasoupClient = require("mediasoup-client");

// Also using CommonJS with destructuring assignment.
const {
  types,
  version,
  Device,
  detectDevice,
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

import { Producer, RtpParameters } from "mediasoup-client/lib/types";

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

#### mediasoupClient.detectDevice()
{: #mediasoupClient-detectDevice .code}

Performs current browser/device detection and returns the corresponding mediasoup-client WebRTC handler name (or nothing if the browser/device is not supported).

> `@async`
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
