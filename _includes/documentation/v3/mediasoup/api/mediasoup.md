## mediasoup
{: #mediasoup}

<section markdown="1">

The top-level exported module.

```javascript
const mediasoup = require("mediasoup");

// Or using destructuring assignment.
const {
  version,
  observer,
  createWorker,
  getSupportedRtpCapabilities,
  parseScalabilityMode
} = require("mediasoup");
```

</section>


### Properties
{: #mediasoup-properties}

<section markdown="1">

#### mediasoup.version
{: #mediasoup-version .code}

The mediasoup version.

> `@type` String, read only

```javascript
console.log(mediasoup.version);
// => "3.0.0"
```

#### mediasoup.observer
{: #mediasoup-observer .code}

An event emitter that allows the application (or third party libraries) monitor [Worker](#Worker) instances created by the application. See the [Observer Events](#mediasoup-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Functions
{: #mediasoup-functions}

<section markdown="1">

#### mediasoup.createWorker(settings)
{: #mediasoup-createWorker .code}

Creates a new worker with the given settings.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`settings` | [WorkerSettings](#WorkerSettings) | Worker settings. | No |

</div>

> `@async`
> 
> `@returns` [Worker](#Worker)

```javascript
const worker = async mediasoup.createWorker(
  {
    logLevel            : "warn",
    dtlsCertificateFile : "/home/foo/dtls-cert.pem",
    dtlsPrivateKeyFile  : "/home/foo/dtls-key.pem"
  });
```

#### mediasoup.getSupportedRtpCapabilities()
{: #mediasoup-getSupportedRtpCapabilities .code}

Returns a cloned copy of the mediasoup supported RTP capabilities, specifically the content of the [mediasoup/src/supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file.

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
