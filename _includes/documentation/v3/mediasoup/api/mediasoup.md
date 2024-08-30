## mediasoup
{: #mediasoup}

<section markdown="1">

The top-level exported module.

```typescript
// Using ES6 import:
import * as mediasoup from "mediasoup";

// Or using destructuring assignment:
import {
  types,
  version,
  observer,
  createWorker,
  getSupportedRtpCapabilities,
  parseScalabilityMode
} from "mediasoup";

// Using CommonJS:
const mediasoup = require("mediasoup");

// Or using destructuring assignment:
const {
  types,
  version,
  observer,
  createWorker,
  getSupportedRtpCapabilities,
  parseScalabilityMode
} = require("mediasoup");
```

</section>


### Dictionaries
{: #mediasoup-dictionaries}

<section markdown="1">

#### LogEventListeners
{: #LogEventListeners .code}

<div markdown="1" class="table-wrapper L3 M5">

Field     | Type                | Description   | Required | Default
--------- | ------------------- | ------------- | -------- | ---------
`ondebug` | `(namespace: string, log: string) => void` | Listener for debug logs. | No |
`onwarn`  | `(namespace: string, log: string) => void` | Listener for warn logs.  | No |
`onerror` | `(namespace: string, log: string, error?: Error) => void` | Listener for error logs. | No |

</div>

```javascript
mediasoup.setLogEventListeners(
  {
    ondebug: undefined,
    onwarn: (namespace, log) => {
      MyEnterpriseLogger.warn(`${namespace} ${log}`);
    },
    onerror: (namespace, log, error) => {
      if (error) {
        MyEnterpriseLogger.error(`${namespace} ${log}: ${error}`);
      } else {
        MyEnterpriseLogger.error(`${namespace} ${log}`);
      }
    }
  });
```

</section>


### Properties
{: #mediasoup-properties}

<section markdown="1">

#### mediasoup.types
{: #mediasoup-types .code}

An Object holding all classes, utils, **TypeScript** types and constants exported by mediasoup.


> `@type` Object, read only

```typescript
import { types as mediasoupTypes } from "mediasoup";

let worker: mediasoupTypes.Worker;
let rtpParameters: mediasoupTypes.RtpParameters;

// or alternatively:

import { Worker, RtpParameters } from "mediasoup/node/lib/types";

let worker: Worker;
let rtpParameters: RtpParameters;
```

In addition to those types it also exports `AppData` TypeScript type, which can be used to specify the custom `appData` content of each mediasoup entity.
{: #AppData .code}

<div markdown="1">

```typescript
export type AppData =
{
  [key: string]: unknown;
};
```

</div>

#### mediasoup.version
{: #mediasoup-version .code}

The mediasoup version.

> `@type` String, read only

```javascript
console.log(mediasoup.version);
// => "3.0.0"
```

#### mediasoup.workerBin
{: #mediasoup-workerBin .code}

The absolute path to the mediasoup-worker binary.

> `@type` String, read only

```javascript
console.log(mediasoup.workerBin);
// => "/home/deploy/media-server-app/node_modules/mediasoup/worker/out/Release/mediasoup-worker"
```

<div markdown="1" class="note">
If "MEDIASOUP_WORKER_BIN" environment variable is given then its value is assigned to `workerBin`.
</div>

#### mediasoup.observer
{: #mediasoup-observer .code}

An event emitter that allows the application (or third party libraries) monitor [Worker](#Worker) instances created by the application. See the [Observer Events](#mediasoup-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Functions
{: #mediasoup-functions}

<section markdown="1">

#### mediasoup.setLogEventListeners(listeners)
{: #mediasoup-setLogEventListeners .code}

Set event listeners for mediasoup generated logs. If called with no arguments then no events will be emitted.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`listeners` | [LogEventListeners](#LogEventListeners) | Event listeners. | No |

</div>

> `@returns` [Worker](#Worker)

```javascript
const worker = await mediasoup.createWorker<{ foo: number }>(
  {
    logLevel            : "warn",
    dtlsCertificateFile : "/home/foo/dtls-cert.pem",
    dtlsPrivateKeyFile  : "/home/foo/dtls-key.pem",
    appData             : { foo: 123 }
  });
```

#### mediasoup.createWorker&lt;WorkerAppData&gt;(settings)
{: #mediasoup-createWorker .code}

Creates a new worker with the given settings.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`settings` | [WorkerSettings](#WorkerSettings) | Worker settings. | No |

</div>

<div markdown="1" class="table-wrapper L3">

TypeScript argument | Type    | Description | Required | Default 
------------------- | ------- | ----------- | -------- | ----------
`WorkerAppData`     | [AppData](#AppData) | Custom `appData` definition. | No | `{ }`

</div>

> `@async`
> 
> `@returns` [Worker](#Worker)

```javascript
const worker = await mediasoup.createWorker<{ foo: number }>(
  {
    logLevel            : "warn",
    dtlsCertificateFile : "/home/foo/dtls-cert.pem",
    dtlsPrivateKeyFile  : "/home/foo/dtls-key.pem",
    appData             : { foo: 123 }
  });
```

#### mediasoup.getSupportedRtpCapabilities()
{: #mediasoup-getSupportedRtpCapabilities .code}

Returns a cloned copy of the mediasoup supported RTP capabilities, specifically the content of the [mediasoup/node/src/supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/node/src/supportedRtpCapabilities.ts) file.

> `@returns` [RtpCapabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCapabilities)

```javascript
const rtpCapabilities = mediasoup.getSupportedRtpCapabilities();

console.log(rtpCapabilities);
// => { codecs: [...], headerExtensions: [...] }
```

<div markdown="1" class="note warn">
Those are **NOT** the RTP capabilities needed by mediasoup-client's [device.load()](/documentation/v3/mediasoup-client/api/#device-load) and libmediasoupclient's [device.Load()](/documentation/v3/libmediasoupclient/api/#device-Load) methods. There you must use [router.rtpCapabilities](#router-rtpCapabilities) getter instead.
</div>

#### mediasoup.parseScalabilityMode(scalabilityMode)
{: #mediasoup-parseScalabilityMode .code}

Parses the given `scalabilityMode` string according to the rules in [webrtc-svc](https://w3c.github.io/webrtc-svc/).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`scalabilityMode` | String | Scalability mode. | No |

</div>

> `@returns` ScalabilityMode:
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


### Observer Events
{: #mediasoup-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### mediasoup.observer.on("newworker", fn(worker))
{: #mediasoup-observer-on-newworker .code}

Emitted when a new worker is created.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`worker` | [Worker](#Worker) | New worker.

</div>

```javascript
mediasoup.observer.on("newworker", (worker) =>
{
  console.log("new worker created [pid:%d]", worker.pid);
});
```

</section>
