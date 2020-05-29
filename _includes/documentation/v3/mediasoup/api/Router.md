## Router
{: #Router}

<section markdown="1">

A router enables injection, selection and forwarding of media streams through [Transport](#Transport) instances created on it.

<div markdown="1" class="note">
Developers may think of a mediasoup router as if it were a "multi-party conference room", although mediasoup is much more low level than that and doesn't constrain itself to specific high level use cases (for instance, a "multi-party conference room" could involve various mediasoup routers, even in different physicals hosts).
</div>

</section>


### Dictionaries
{: #Router-dictionaries}

<section markdown="1">

#### RouterOptions
{: #RouterOptions .code}

<div markdown="1" class="table-wrapper L3 M5">

Field         | Type               | Description   | Required | Default
------------- | ------------------ | ------------- | -------- | ---------
`mediaCodecs` | Array&lt;[RtpCodecCapability](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCodecCapability)&gt; | Router media codecs. | No | `[ ]`
`appData`      | Object  | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
* Feature codecs such as RTX **MUST NOT** be placed into the `mediaCodecs` list.
* If `preferredPayloadType` is given in a `RtpCodecCapability` (although it's unnecessary) it's extremely recommended to use a value in the 96-127 range.
</div>

#### PipeToRouterOptions
{: #PipeToRouterOptions .code}

<div markdown="1" class="table-wrapper L3 M5">

Field         | Type               | Description   | Required | Default
------------- | ------------------ | ------------- | -------- | ---------
`mediaCodecs` | Array&lt;[RtpCodecCapability](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCodecCapability)&gt; | Router media codecs. | No | `[ ]`

`producerId` | String  | Producer id | No      |
`dataProducerId` | String  | Data producer id | No      |
`router`     | [Router](#Router) | Destination router to pipe the given producer. | Yes |
`listenIp`   | String  | IP to connect both routers in the same host. | No | "127.0.0.1"
`enableSctp` | Boolean | Create a SCTP association. | No | `true`
`numSctpStreams` | [NumSctpStreams](#NumSctpStreams) | SCTP streams number. | No |
`enableRtx` | Boolean | Enable RTX and NACK for RTP retransmission. Typically not needed since the link is typically localhost. | No | `false`
`enableSrtp` | Boolean | Enable SRTP. | No | `false`

</div>

<div markdown="1" class="note">
* Only one of `producerId` and `dataProducerId` must be provided.
* SCTP arguments will only apply the first time the underlying transports are created.
</div>

#### PipeToRouterResult
{: #PipeToRouterResult .code}

<div markdown="1" class="table-wrapper L3 M5">

Field               | Type               | Description   | Required | Default
------------------- | ------------------ | ------------- | -------- | ---------
`pipeConsumer`      | [Consumer](#Consumer) | The consumer created in the current router. | No | 
`pipeProducer`      | [Producer](#Producer) | The producer created in the target router. | No | 
`pipeDataConsumer`      | [DataConsumer](#DataConsumer) | The data consumer created in the current router. | No | 
`pipeDataProducer`      | [DataProducer](#DataProducer) | The data producer created in the target router. | No | 

</div>

</section>


### Properties
{: #Router-properties}

<section markdown="1">

#### router.id
{: #router-id .code}

Router identifier.

> `@type` String, read only

```javascript
console.log(router.id);
// => "15177e19-5665-4eba-9a6a-c6cf3db16259"
```

#### router.closed
{: #router-closed .code}

Whether the router is closed.

> `@type` Boolean, read only

#### router.rtpCapabilities
{: #router-rtpCapabilities .code}

An Object with the RTP capabilities of the router. These capabilities are tipically needed by mediasoup clients to compute their sending RTP parameters.

> `@type` [RtpCapabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCapabilities), read only

<div markdown="1" class="note">
* Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.

* See also how to [filter these RTP capabilities](/documentation/v3/tricks/#rtp-capabilities-filtering) before using them into a client.
</div>

#### router.appData
{: #router-appData .code}

Custom data Object provided by the application in the router factory method. The app can modify its content at any time.

> `@type` Object, read only

#### router.observer
{: #router-observer .code}

See the [Observer Events](#Router-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #Router-methods}

<section markdown="1">

#### router.close()
{: #router-close .code}

Closes the router. Triggers a ["routerclose"](#transport-on-routerclose) event in all its transports and also ["routerclose"](#rtpObserver-on-routerclose) event in all its RTP observers.

#### router.createWebRtcTransport(options)
{: #router-createWebRtcTransport .code}

Creates a new WebRTC transport.

<div markdown="1" class="table-wrapper L3">

Argument      | Type    | Description | Required | Default 
------------- | ------- | ----------- | -------- | ----------
`options` | [WebRtcTransportOptions](#WebRtcTransportOptions) | WebRTC transport options. | Yes |

</div>

> `@async`
> 
> `@returns` [WebRtcTransport](#WebRtcTransport)

```javascript
const transport = await router.createWebRtcTransport(
  {
    listenIps : [ { ip: "192.168.0.111", announcedIp: "88.12.10.41" } ],
    enableUdp : true,
    enableTcp : true,
    preferUdp : true
  });
```

#### router.createPlainRtpTransport(options) (DEPRECATED)
{: #router-createPlainRtpTransport .code}

<div markdown="1" class="note warn">
`createPlainRtpTransport()` has been renamed to [createPlainTransport()](#router-createPlainTransport) since mediasoup version 3.5.0.
</div>

#### router.createPlainTransport(options)
{: #router-createPlainTransport .code}

Creates a new plain transport.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [PlainTransportOptions](#PlainTransportOptions) | Plain transport options. | Yes |

</div>

> `@async`
> 
> `@returns` [PlainTransport](#PlainTransport)

```javascript
const transport = await router.createPlainTransport(
  {
    listenIp : "a1:22:aA::08",
    rtcpMux  : true,
    comedia  : true
  });
```

#### router.createPipeTransport(options)
{: #router-createPipeTransport .code}

Creates a new pipe transport.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [PipeTransportOptions](#PipeTransportOptions) | Pipe transport options. | Yes |

</div>

> `@async`
> 
> `@returns` [PipeTransport](#PipeTransport)

```javascript
const transport = await router.createPipeTransport(
  {
    listenIp : "192.168.1.33"
  });
```

#### router.createDirectTransport(options)
{: #router-createDirectTransport .code}

Creates a new direct transport.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [DirectTransportOptions](#DirectTransportOptions) | Plain transport options. | Yes |

</div>

> `@async`
> 
> `@returns` [DirectTransport](#DirectTransport)

```javascript
const transport = await router.createDirectTransport();
```

#### router.pipeToRouter({ producerId, dataProducerId, router, listenIp })
{: #router-pipeToRouter .code}

Pipes the given media or data producer into another router in the same host. It creates an underlying [PipeTransport](#PipeTransport) (if not previously created) that interconnects both routers.

This is specially useful to expand broadcasting capabilities (one to many) by interconnecting different routers that run in separate workers (so in different CPU cores).

<div markdown="1" class="table-wrapper L3">

Argument     | Type    | Description | Required | Default 
------------ | ------- | ----------- | -------- | ----------
`options`    | [PipeToRouterOptions](#PipeToRouterOptions) | Options | Yes |

</div>

> `@async`
> 
> `@returns` [PipeToRouterResult](#PipeToRouterResult)

```javascript
// Have two workers.
const worker1 = await mediasoup.createWorker();
const worker2 = await mediasoup.createWorker();

// Create a router in each worker.
const router1 = await worker1.createRouter({ mediaCodecs });
const router2 = await worker2.createRouter({ mediaCodecs });

// Produce in router1.
const transport1 = await router1.createWebRtcTransport({ ... });
const producer1 = await transport1.produce({ ... });

// Pipe producer1 into router2.
await router1.pipeToRouter({ producerId: producer1.id, router: router2 });

// Consume producer1 from router2.
const transport2 = await router2.createWebRtcTransport({ ... });
const consumer2 = await transport2.consume({ producerId: producer1.id, ... });
```

#### router.createAudioLevelObserver(options)
{: #router-createAudioLevelObserver .code}

Creates a new audio level observer.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [AudioLevelObserverOptions](#AudioLevelObserverOptions) | Options. | Yes |

</div>

> `@async`
> 
> `@returns` [AudioLevelObserver](#AudioLevelObserver)

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

Whether the given RTP capabilities are valid to consume the given producer.

<div markdown="1" class="table-wrapper L3">

Argument          | Type    | Description  | Required | Default 
----------------- | ------- | ------------ | -------- | ----------
`producerId`      | String  | Producer id. | Yes |
`rtpCapabilities` | [RtpCapabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCapabilities) | RTP capabilities of the potential consumer. | Yes |

</div>

> `@returns` Boolean

```javascript
if (router.canConsume({ producerId, rtpCapabilities }))
{
  // Consume the producer by calling transport.consume({ producerId, rtpCapabilities }).
}
```

</section>


### Events
{: #Router-events}

<section markdown="1">

#### router.on("workerclose", fn())
{: #router-on-workerclose .code}

Emitted when the worker this router belongs to is closed for whatever reason. The router itself is also closed. A ["routerclose"](#transport-on-routerclose) event is triggered in all its transports and a ["routerclose"](#rtpObserver-on-routerclose) event is triggered in all its RTP observers.

```javascript
router.on("workerclose", () =>
{
  console.log("worker closed so router closed");
});
```


</section>

### Observer Events
{: #Router-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### router.observer.on("close", fn())
{: #router-observer-on-close .code}

Emitted when the router is closed for whatever reason.

#### router.observer.on("newtransport", fn(transport))
{: #router-observer-on-newtransport .code}

Emitted when a new transport is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`transport` | [Transport](#Transport) | New transport.

</div>

```javascript
router.observer.on("newtransport", (transport) =>
{
  console.log("new transport created [id:%s]", transport.id);
});
```

#### router.observer.on("newrtpobserver", fn(rtpObserver))
{: #router-observer-on-newrtpobserver .code}

Emitted when a new RTP observer is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`rtpObserver` | [RtpObserver](#RtpObserver) | New RTP observer.

</div>

```javascript
router.observer.on("newrtpobserver", (rtpObserver) =>
{
  console.log("new RTP observer created [id:%s]", rtpObserver.id);
});
```

</section>
