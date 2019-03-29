## mediasoup
{: #mediasoup}

<section markdown="1">

The top-level exported module.

```javascript
const mediasoup = require("mediasoup");
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

Returns a cloned copy of the mediasoup supported RTP capabilities, specifically the content of the [mediasoup/lib/supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

> `@returns` [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*)

```javascript
const rtpCapabilities = mediasoup.getSupportedRtpCapabilities();

console.log(rtpCapabilities);
// => { codecs: [], headerExtensions: [] }
```

</section>


### Observer Events
{: #mediasoup-observer-events}

<section markdown="1">

#### mediasoup.observer.on("newworker", fn(worker))
{: #mediasoup-observer-on-newworker .code}

Emitted when a new worker is created.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`worker` | [Worker](#Worker) | New worker.

</div>

</section>
