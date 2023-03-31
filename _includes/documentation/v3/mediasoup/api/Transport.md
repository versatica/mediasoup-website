## Transport
{: #Transport}

<section markdown="1">

> `@abstract`

A transport connects an endpoint with a mediasoup router and enables transmission of media in both directions by means of [Producer](#Producer), [Consumer](#Consumer), [DataProducer](#DataProducer) and [DataConsumer](#DataConsumer) instances created on it.

mediasoup implements the following transport classes:

* [WebRtcTransport](#WebRtcTransport)
* [PlainTransport](#PlainTransport)
* [PipeTransport](#PipeTransport)
* [DirectTransport](#DirectTransport)

</section>


### Dictionaries
{: #Transport-dictionaries}

<section markdown="1">

#### TransportListenIp
{: #TransportListenIp .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`ip`          | String  | Listening IPv4 or IPv6. | Yes      |
`announcedIp` | String  | Announced IPv4 or IPv6 (useful when running mediasoup behind NAT with private IP). | No      |

</div>

<div markdown="1" class="note">
If you use "0.0.0.0" or "::" as `ip` value, then you need to also provide `announcedIp`.
</div>

#### TransportTuple
{: #TransportTuple .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`localIp`          | String  | Local IP address. | Yes |
`localPort`        | Number  | Local port. | Yes |
`remoteIp`         | String  | Remote IP address. | No |
`remotePort`       | Number  | Remote port. | No |
`protocol`         | String  | Protocol ("udp" / "tcp"). | Yes |

</div>

<div markdown="1" class="note">
Both `remoteIp` and `remotePort` are unset until the media address of the remote endpoint is known, which happens after calling `transport.connect()` in `PlainTransport` and `PipeTransport`, or via dynamic detection as it happens in `WebRtcTransport` (in which the remote media address is detected by ICE means), or in `PlainTransport` (when using `comedia` mode).
</div>

#### TransportTraceEventData
{: #TransportTraceEventData .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`type`             | [TransportTraceEventType](#TransportTraceEventType) | Trace event type. | Yes |
`timestamp`        | Number  | Event timestamp. | Yes | 
`direction`        | String  | "in" (icoming direction) or "out" (outgoing direction). | Yes |
`info`             | Object  | Per type specific information. | Yes |

</div>

<div markdown="1" class="note">
See also "trace" Event in the [Debugging](/documentation/v3/mediasoup/debugging#trace-Event) section.
</div>

</section>


### Enums
{: #Transport-enums}

<section markdown="1">

#### TransportTraceEventType
{: #TransportTraceEventType .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description
-------------- | -------------
"probation"    | RTP probation packet.
"bwe"          | Transport bandwidth estimation changed.

</div>

#### TransportSctpState
{: #TransportSctpState .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description
-------------- | -------------
"new"          | SCTP procedures not yet initiated.
"connecting"   | SCTP connecting.
"connected"    | SCTP successfully connected.
"failed"       | SCTP connection failed.
"closed"       | SCTP state when the transport has been closed.

</div>

</section>


### Properties
{: #Transport-properties}

<section markdown="1">

These are properties common to all transport classes. Each transport class may define new ones.

#### transport.id
{: #transport-id .code}

Transport identifier.

> `@type` String, read only

#### transport.closed
{: #transport-closed .code}

Whether the transport is closed.

> `@type` Boolean, read only

#### transport.appData
{: #transport-appData .code}

Custom data provided by the application in the worker factory method. The app can modify it at any time.

> `@type` [AppData](#AppData)

```javascript
transport.appData.foo = "bar";

transport.appData = { foo: "bar", bar: 123 };
```

#### transport.observer
{: #transport-observer .code}

See the [Observer Events](#Transport-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

These are methods common to all transport classes. Each transport class may define new ones.

#### transport.close()
{: #transport-close .code}

Closes the transport. Triggers a ["transportclose"](#producer-on-transportclose) event in all its producers and also ["transportclose"](#consumer-on-transportclose) event in all its consumers.

#### transport.getStats()
{: #transport-getStats .code}

Returns current RTC statistics of the transport. Each transport class produces a different set of statistics.

> `@async`
> 
> `@abstract`
> 
> `@returns` Array&lt;Object&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### transport.connect()
{: #transport-connect .code}

Provides the transport with the remote endpoint's transport parameters. Each transport class requires specific arguments in this method. Check the `connect()` method in each one of them.

> `@async`
> 
> `@abstract`

#### transport.setMaxIncomingBitrate(bitrate)
{: #transport-setMaxIncomingBitrate .code}

Set maximum incoming bitrate for media streams sent by the remote endpoint over this transport.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`bitrate`  | Number | Maximum incoming bitrate in `bps`. | Yes | 0 (no limit)

</div>

> `@async`

<div markdown="1" class="note">
* This method just works when REMB is available in the remote sender, which is typically just supported in WebRTC.
* In order to reset the limit, call the method with argument 0.
</div>

```javascript
await transport.setMaxIncomingBitrate(3500000);
```

#### transport.setMaxOutgoingBitrate(bitrate)
{: #transport-setMaxOutgoingBitrate .code}

Set maximum outgoing bitrate for media streams sent by mediasoup to the remote endpoint over this transport. By calling this method, the estimated outgoing bitrate is overridden if given value is lower than the estimated one.


<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`bitrate`  | Number | Maximum outgoing bitrate in `bps`. Must be given than 30000. | Yes | 0 (no limit)

</div>

> `@async`

<div markdown="1" class="note">
* This method just works when transport congestion control is available in the remote receiver, which is typically just supported in WebRTC.
* In order to reset the limit, call the method with argument 0.
</div>

```javascript
await transport.setMaxOutgoingBitrate(2000000);
```

#### transport.setMinOutgoingBitrate(bitrate)
{: #transport-setMinOutgoingBitrate .code}

Set minimum outgoing bitrate for media streams sent by mediasoup to the remote endpoint over this transport. By calling this method, the estimated outgoing bitrate is overridden if given value is higher than the estimated one.


<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`bitrate`  | Number | Minimum outgoing bitrate in `bps`. Must be given than 30000. | Yes | 0 (no limit)

</div>

> `@async`

<div markdown="1" class="note">
* This method just works when transport congestion control is available in the remote receiver, which is typically just supported in WebRTC.
* In order to reset the limit, call the method with argument 0.
</div>

```javascript
await transport.setMinOutgoingBitrate(1000000);
```

#### transport.produce&lt;ProducerAppData&gt(options)
{: #transport-produce .code}

Instructs the router to receive audio or video RTP (or SRTP depending on the transport class). This is the way to inject media into mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [ProducerOptions](#ProducerOptions) | Producer options. | Yes |

</div>

<div markdown="1" class="table-wrapper L3">

TypeScript argument | Type    | Description | Required | Default 
------------------- | ------- | ----------- | -------- | ----------
`ProducerAppData` | [AppData](#AppData) | Custom `appData` definition. | No | `{ }`

</div>

> `@async`
> 
> `@returns` [Producer](#Producer)

<div markdown="1" class="note">
Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.
</div>

```javascript
const producer = await transport.produce(
  {
    kind          : "video",
    rtpParameters :
    {
      mid    : "1",
      codecs :
      [
        {
          mimeType    : "video/VP8",
          payloadType : 101,
          clockRate   : 90000,
          rtcpFeedback :
          [
            { type: "nack" },
            { type: "nack", parameter: "pli" },
            { type: "ccm", parameter: "fir" },
            { type: "goog-remb" }
          ]
        },
        {
          mimeType    : "video/rtx",
          payloadType : 102,
          clockRate   : 90000,
          parameters  : { apt: 101 }
        }
      ],
      headerExtensions :
      [
        {
          id  : 2, 
          uri : "urn:ietf:params:rtp-hdrext:sdes:mid"
        },
        { 
          id  : 3, 
          uri : "urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id"
        },
        { 
          id  : 5, 
          uri: "urn:3gpp:video-orientation" 
        },
        { 
          id  : 6, 
          uri : "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time"
        }
      ],
      encodings :
      [
        { rid: "r0", active: true, maxBitrate: 100000 },
        { rid: "r1", active: true, maxBitrate: 300000 }
        { rid: "r2", active: true, maxBitrate: 900000 }
      ],
      rtcp :
      {
        cname : "Zjhd656aqfoo"
      }
    }
  });
```

#### transport.consume&lt;ConsumerAppData&gt(options)
{: #transport-consume .code}

Instructs the router to send audio or video RTP (or SRTP depending on the transport class). This is the way to extract media from mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [ConsumerOptions](#ConsumerOptions) | Consumer options. | Yes |

</div>

<div markdown="1" class="table-wrapper L3">

TypeScript argument | Type    | Description | Required | Default 
------------------- | ------- | ----------- | -------- | ----------
`ConsumerAppData` | [AppData](#AppData) | Custom `appData` definition. | No | `{ }`

</div>

> `@async`
> 
> `@returns` [Consumer](#Consumer)

<div markdown="1" class="note">
Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.
</div>

<div markdown="1" class="note">
When creating a consumer it's recommended to set `paused` to `true`, then transmit the consumer parameters to the consuming endpoint and, once the consuming endpoint has created its local side consumer, unpause the server side consumer using the [resume()](#consumer-resume) method.

Reasons for create the server side consumer in `paused` mode:

* If the remote endpoint is a WebRTC browser or application and it receives a RTP packet of the new consumer **before** the remote `RTCPeerConnection` is ready to process it (this is, before the remote consumer is created in the remote endpoint) it may happen that the `RTCPeerConnection` will wrongly associate the SSRC of the received packet to an already existing SDP `m=` section, so the imminent creation of the new consumer and its associated `m=` section will fail.
  * Related [issue](https://github.com/versatica/libmediasoupclient/issues/57).

* Also, when creating a video consumer, this is an optimization to make it possible for the consuming endpoint to render the video as far as possible. If the server side consumer was created with `paused: false`, mediasoup will immediately request a key frame to the producer and that key frame may reach the consuming endpoint even before it's ready to consume it, generating "black" video until the device requests a keyframe by itself. 
</div>

```javascript
const consumer = await transport.consume(
  {
    producerId      : "a7a955cf-fe67-4327-bd98-bbd85d7e2ba3",
    rtpCapabilities :
    {
      codecs :
      [
        {
          mimeType             : "audio/opus",
          kind                 : "audio",
          clockRate            : 48000,
          preferredPayloadType : 100,
          channels             : 2
        },
        {
          mimeType             : "video/H264",
          kind                 : "video",
          clockRate            : 90000,
          preferredPayloadType : 101,
          rtcpFeedback         :
          [
            { type: "nack" },
            { type: "nack", parameter: "pli" },
            { type: "ccm", parameter: "fir" },
            { type: "goog-remb" }
          ],
          parameters :
          {
            "level-asymmetry-allowed" : 1,
            "packetization-mode"      : 1,
            "profile-level-id"        : "4d0032"
          }
        },
        {
          mimeType             : "video/rtx",
          kind                 : "video",
          clockRate            : 90000,
          preferredPayloadType : 102,
          rtcpFeedback         : [],
          parameters           :
          {
            apt : 101
          }
        }
      ],
      headerExtensions :
      [
        {
          kind             : "video",
          uri              : "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time", // eslint-disable-line max-len
          preferredId      : 4,
          preferredEncrypt : false
        },
        {
          kind             : "audio",
          uri              : "urn:ietf:params:rtp-hdrext:ssrc-audio-level",
          preferredId      : 8,
          preferredEncrypt : false
        },
        {
          kind             : "video",
          uri              : "urn:3gpp:video-orientation",
          preferredId      : 9,
          preferredEncrypt : false
        },
        {
          kind             : "video",
          uri              : "urn:ietf:params:rtp-hdrext:toffset",
          preferredId      : 10,
          preferredEncrypt : false
        }
      ]
    }
  });
```

#### transport.produceData&lt;DataProducerAppData&gt(options)
{: #transport-producedata .code}

Instructs the router to receive data messages. Those messages can be delivered by an endpoint via [SCTP](https://tools.ietf.org/html/rfc4960) protocol (AKA DataChannel in WebRTC) or can be directly sent from the Node.js application if the transport is a `DirectTransport`.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [DataProducerOptions](#DataProducerOptions) | Data producer options. | No | `{ }`

</div>

<div markdown="1" class="table-wrapper L3">

TypeScript argument | Type    | Description | Required | Default 
------------------- | ------- | ----------- | -------- | ----------
`DataProducerAppData` | [AppData](#AppData) | Custom `appData` definition. | No | `{ }`

</div>


> `@async`
> 
> `@returns` [DataProducer](#DataProducer)

```javascript
// Using SCTP:
const dataProducer = await transport.produceData(
  {
    sctpStreamParameters :
    {
      streamId : 4,
      ordered  : true
    },
    label : 'foo'
  });

// Using a direct transport:
const dataProducer = await transport.produceData();
```

#### transport.consumeData&lt;DataConsumerAppData&gt(options)
{: #transport-consumedata .code}

Instructs the router to send data messages to the endpoint via [SCTP](https://tools.ietf.org/html/rfc4960) protocol (AKA DataChannel in WebRTC) or directly to the Node.js process if the transport is a `DirectTransport`.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [DataConsumerOptions](#DataConsumerOptions) | Data Consumer options. | Yes |

</div>

<div markdown="1" class="table-wrapper L3">

TypeScript argument | Type    | Description | Required | Default 
------------------- | ------- | ----------- | -------- | ----------
`DataConsumerAppData` | [AppData](#AppData) | Custom `appData` definition. | No | `{ }`

</div>

> `@async`
> 
> `@returns` [DataConsumer](#DataConsumer)

```javascript
const dataConsumer = await transport.consumeData(
  {
    dataProducerId : "a7a955cf-fe67-4327-bd98-bbd85d7e2ba4"
  });
```

#### transport.enableTraceEvent(types)
{: #transport-enableTraceEvent .code}

Instructs the transport to emit "trace" events. For monitoring purposes. Use with caution.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`types`     | Array&lt;[TransportTraceEventType](#TransportTraceEventType)&gt; | Enabled types. | No | Unset (so disabled)

</div>

> `@async`

```javascript
await transport.enableTraceEvent([ "probation" ]);

transport.on("trace", (trace) =>
{
  // trace.type can just be "probation".
});
```

</section>


### Events
{: #Transport-events}

<section markdown="1">

These are events common to all transport classes. Each transport class may define new ones.

#### transport.on("routerclose", fn())
{: #transport-on-routerclose .code}

Emitted when the router this transport belongs to is closed for whatever reason. The transport itself is also closed. A ["transportclose"](#producer-on-transportclose) event is triggered in all its producers and a ["transportclose"](#consumer-on-transportclose) event is triggered in all its consumers.

```javascript
transport.on("routerclose", () =>
{
  console.log("router closed so transport closed");
});
```

#### transport.on("listenserverclose", fn())
{: #transport-on-listenserverclose .code}

Just emitted in WebRTC transports when the WebRTC server the transport uses is closed for whatever reason. The transport itself is also closed. A ["transportclose"](#producer-on-transportclose) event is triggered in all its producers and a ["transportclose"](#consumer-on-transportclose) event is triggered in all its consumers.

```javascript
transport.on("listenserverclose", () =>
{
  console.log("WebRTC server closed so transport closed");
});
```

#### transport.on("trace", fn(trace))
{: #transport-on-trace .code}

See [enableTraceEvent()](#transport-enableTraceEvent) method.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`trace`     | [TransportTraceEventData](#TransportTraceEventData) | Trace data.

</div>

```javascript
transport.on("trace", (trace) =>
{
  console.log(trace);
});
```

</section>


### Observer Events
{: #Transport-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

These are observer events common to all transport classes. Each transport class may define new ones.

#### transport.observer.on("close", fn())
{: #transport-observer-on-close .code}

Emitted when the transport is closed for whatever reason.

#### transport.observer.on("newproducer", fn(producer))
{: #transport-observer-on-newproducer .code}

Emitted when a new producer is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`producer` | [Producer](#Producer) | New producer.

</div>

```javascript
transport.observer.on("newproducer", (producer) =>
{
  console.log("new producer created [id:%s]", producer.id);
});
```

#### transport.observer.on("newconsumer", fn(consumer))
{: #transport-observer-on-newconsumer .code}

Emitted when a new consumer is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`consumer` | [Consumer](#Consumer) | New consumer.

</div>

```javascript
transport.observer.on("newconsumer", (consumer) =>
{
  console.log("new consumer created [id:%s]", consumer.id);
});
```

#### transport.observer.on("newdataproducer", fn(dataProducer))
{: #transport-observer-on-newdataproducer .code}

Emitted when a new data producer is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`dataProducer` | [DataProducer](#DataProducer) | New producer.

</div>

```javascript
transport.observer.on("newdataproducer", (dataProducer) =>
{
  console.log("new data producer created [id:%s]", dataProducer.id);
});
```

#### transport.observer.on("newdataconsumer", fn(dataConsumer))
{: #transport-observer-on-newdataconsumer .code}

Emitted when a new data consumer is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`dataConsumer` | [DataConsumer](#DataConsumer) | New consumer.

</div>

```javascript
transport.observer.on("newdataconsumer", (dataConsumer) =>
{
  console.log("new data consumer created [id:%s]", dataConsumer.id);
});
```

#### transport.observer.on("trace", fn(trace))
{: #transport-observer-on-trace .code}

Same as the [trace](#transport-on-trace) event.

</section>

