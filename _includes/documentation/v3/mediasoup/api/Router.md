## Router
{: #Router}

A router holds a multiparty RTC (Real-Time Communication) conference by allowing injection, selection and forwarding of media streams.


### Dictionaries
{: #Router-dictionaries}

<section markdown="1">

#### RouterMediaCodec
{: #Router-MediaCodec .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`kind`                   | String  | Media kind ("audio" or "video"). | Yes |
`mimeType`               | String  | The codec MIME type, i.e. "audio/opus", "video/VP8". The list of mediasoup supported codecs is available in the [mediasoup/lib/supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file. | Yes |
`clockRate`              | Number  | Codec clock rate expressed in Hertz. | Yes |
`channels`               | Number  | The number of channels (mono=1, stereo=2) for audio codecs. | No | 1
`parameters`             | Dictionary | Codec-specific parameters available for signaling. | No |

</div>

<div markdown="1" class="note warn">
Feature codecs such as RTX or FEC must **NOT** be placed into Router `mediaCodecs`.
</div>

</section>


### Properties
{: #Router-properties}

<section markdown="1">

#### router.id
{: #router-id .code}

* `@type` String, read only

Router identifier.

```javascript
console.log(router.id);
// => "15177e19-5665-4eba-9a6a-c6cf3db16259"
```

#### router.closed
{: #router-closed .code}

* `@type` Boolean, read only

Whether the router is closed.

#### router.rtpCapabilities
{: #router-rtpCapabilities .code}

* `@type` [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*), read only

An Object with the RTP capabilities of the router. There capabilities are tipically needed by mediasoup clients to set their sending RTP parameters.

#### router.observer
{: #router-observer .code}

* `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

See the [Observer Events](#Router-observer-events) section below.

</section>


### Methods
{: #Router-methods}

<section markdown="1">

#### router.close()
{: #router-close .code}

Closes the router, including all its transports and rtpObservers.

#### router.createWebRtcTransport(options)
{: #router-createWebRtcTransport .code}

* `@async`
* `@returns` [WebRtcTransport](#WebRtcTransport)

Creates a new WebRTC transport.

<div markdown="1" class="table-wrapper L3">

Argument      | Type    | Description | Required | Default 
------------- | ------- | ----------- | -------- | ----------
`options` | [WebRtcTransportOptions](#WebRtcTransport-Options) | Options. | Yes |

</div>

```javascript
const transport = await router.createWebRtcTransport(
  {
    listenIps : [ { ip: "192.168.0.111", announcedIp: "88.12.10.41" } ],
    enableUdp : true,
    enableTcp : true,
    preferUdp : true
  });
```

#### router.createPlainRtpTransport(options)
{: #router-createPlainRtpTransport .code}

* `@async`
* `@returns` [PlainRtpTransport](#PlainRtpTransport)

Creates a new plain RTP transport.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [PlainRtpTransportOptions](#PlainRtpTransport-Options) | Options. | Yes |

</div>

```javascript
const transport = await router.createPlainRtpTransport(
  {
    listenIp : "a1:22:aA::08",
    rtcpMux  : true,
    comedia  : true
  });
```

#### router.createPipeTransport(options)
{: #router-createPipeTransport .code}

* `@async`
* `@returns` [PipeTransport](#PipeTransport)

Creates a new pipe transport.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [PipeTransportOptions](#PipeTransport-Options) | Options. | Yes |

</div>

```javascript
const transport = await router.createPipeTransport(
  {
    listenIp : "8.9.10.11",
    appData  : { foo: "bar" }
  });
```

#### router.pipeToRouter({ producerId, router, listenIp })
{: #router-pipeToRouter .code}

* `@async`
* `@returns` Object:
  - `pipeConsumer`: `@type` [Consumer](#Consumer) - Consumer created in the current router.
  - `pipeProducer`: `@type` [Producer](#Producer) - Producer created in the destination router.

Pipes the given producer into another router in the same host. It creates an underlying [PipeTransport](#PipeTransport) (if not previously created) that interconnects two routers.

This is useful to expand broadcasting capabilities (one to many) by interconnecting different routers that run in separate workers (so in different CPU cores).

<div markdown="1" class="table-wrapper L3">

Argument     | Type    | Description | Required | Default 
------------ | ------- | ----------- | -------- | ----------
`producerId` | String  | Producer id | Yes      |
`router`     | [Router](#Router) | Destination router to pipe to the given producer. | Yes |
`listenIp`   | String  | Internal IP to connect both routers. | No      | "127.0.0.1"

</div>

```javascript
// Have two workers.
const worker1 = async mediasoup.createWorker();
const worker2 = async mediasoup.createWorker();

// Create a router in each worker.
const router1 = await worker1.createRouter({ mediaCodecs });
const router2 = await worker2.createRouter({ mediaCodecs });

// Produce in router1.
const transport1 = await router1.createWebRtcTransport({ ... });
const producer1 = await transport1.produce({ ... });

// Pipe producer1 into router2.
await router1.pipeToRouter(
  {
    producerId : producer1.id,
    router     : router2
  });

// Consume in router2.
const transport2 = await router2.createWebRtcTransport({ ... });
const consumer2 = await transport2.consume({ producerId: producer.id, ... });
```

#### router.createAudioLevelObserver(options)
{: #router-createAudioLevelObserver .code}

* `@async`
* `@returns` [AudioLevelObserver](#AudioLevelObserver)

Creates a new audio level observer.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [AudioLevelObserverOptions](#AudioLevelObserver-Options) | Options. | Yes |

</div>

```javascript
const audioLevelObserver = await router.createAudioLevelObserver(
  {
    maxEntries : 1,
    threshold  : -70,
    interval   : 2000
  });
```

#### router.canConsume({ producerId, rtpCapabilities })
{: #router-canConsume .code}

* `@returns` Boolean

Whether the given RTP capabilities are valid to consume the given producer.

<div markdown="1" class="table-wrapper L3">

Argument          | Type    | Description  | Required | Default 
----------------- | ------- | ------------ | -------- | ----------
`producerId`      | String  | Producer id. | Yes |
`rtpCapabilities` | [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*) | RTP capabilities of the potential consumer. | Yes |

</div>

```javascript
if (router.canConsume({ producerId, rtpCapabilities }))
{
  // Consumer the producer calling transport.consume().
}
```

</section>


### Events
{: #Router-events}

<section markdown="1">

#### router.on("workerclose")
{: #router-on-workerclose .code}

Emitted when the worker this router belongs to is closed. The router is then also closed.

</section>

### Observer Events
{: #Router-observer-events}

<section markdown="1">

#### router.observer.on("close")
{: #router-observer-on-close .code}

Emitted when the router is closed.

</section>
