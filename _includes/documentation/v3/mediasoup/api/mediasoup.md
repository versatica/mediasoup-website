## mediasoup
{: #mediasoup}

<section markdown="1">

The top-level module exported by the mediasoup module.

```javascript
const mediasoup = require("mediasoup");
```

</section>


### Properties
{: #mediasoup-properties}

<section markdown="1">

#### mediasoup.version
{: #mediasoup-version .code}

* `@type` String, read only

The mediasoup version.

```javascript
console.log(mediasoup.version);
// => "3.0.0"
```

#### mediasoup.observer
{: #mediasoup-observer .code}

* `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

An event emitter that allows the application (or third party libraries) monitor [Worker](#Worker) instances created by the application. See the [Observer Events](#mediasoup-observer-events) section below.

</section>


### Functions
{: #mediasoup-functions}

<section markdown="1">

#### mediasoup.createWorker(settings)
{: #mediasoup-createWorker .code}

* `@async`
* `@returns` [Worker](#Worker)

Creates a new worker with the given settings.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`settings` | [WorkerSettings](#Worker-Settings) | Worker settings. | No |

</div>

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

* `@returns` [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*)

Returns a cloned copy of the mediasoup supported RTP capabilities, specifically the content of the [mediasoup/lib/supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

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
