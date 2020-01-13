## mediasoupClient
{: #mediasoupClient}

<section markdown="1">

The top-level exported module.

```javascript
// Using ES6 import.
import * as mediasoupClient from "mediasoup-client";

// Also using ES6 import with destructuring assignment.
import {
  types,
  version,
  detectDevice,
  Device,
  parseScalabilityMode
} from "mediasoup-client";

// Using CommonJS.
const mediasoupClient = require("mediasoup-client");

// Also using CommonJS with destructuring assignment.
const {
  types,
  version,
  Device,
  parseScalabilityMode
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

#### mediasoupClient.detectDevice()
{: #mediasoupClient-detectDevice .code}

Performs current browser/device detection and returns the corresponding mediasoup-client WebRTC handler class.

> `@async`
> 
> `@returns` Class

```javascript
const Handler = mediasoup.detectDevice();

if (Handler)
  console.log("detected Handler class: %s", Handler.name);
else
  console.log("no suitable Handler class found for current browser/device");
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

mediasoup.parseScalabilityMode("S3T3");
// => { spatialLayers: 3, temporalLayers: 3 }

mediasoup.parseScalabilityMode("L4T7_KEY_SHIFT");
// => { spatialLayers: 4, temporalLayers: 7 }

mediasoup.parseScalabilityMode(undefined);
// => { spatialLayers: 1, temporalLayers: 1 }
```

</section>
