## Transport
{: #Transport}

<section markdown="1">

> `@abstract`

A transport connects an endpoint with a mediasoup router and enables transmission of media in both directions by means of [Producer](#Producer) and [Consumer](#Consumer) instances created on it.

mediasoup implements the following transport classes:

* [WebRtcTransport](#WebRtcTransport)
* [PlainRtpTransport](#PlainRtpTransport)
* [PipeTransport](#PipeTransport)

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
Both `remoteIp` and `remotePort` are unset until the media address of the remote endpoint is known, which happens after calling `transport.connect()` in `PlainRtpTransport` and `PipeTransport`, or via dynamic detection as it happens in `WebRtcTransport` (in which the remote media address is detected by ICE means), or in `PlainRtpTransport` (when using `comedia` mode).
</div>

#### TransportPacketEventData
{: #TransportPacketEventData .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`type`             | [TransportPacketEventType](#TransportPacketEventType) | Packet event type. | Yes |
`timestamp`        | Number  | Event timestamp. | Yes | 
`direction`        | String  | "in" (packet received by mediasoup) or "out" (packet sent by mediasoup). | Yes |
`info`             | Object  | Per type specific information. | Yes |

</div>

</section>


### Enums
{: #Transport-enums}

<section markdown="1">

#### TransportPacketEventType
{: #TransportPacketEventType .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description
-------------- | -------------
"probation"    | RTP probation packet.

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

Custom data Object provided by the application in the transport factory method. The app can modify its content at any time.

> `@type` Object, read only

```javascript
transport.appData.foo = "bar";
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
`bitrate`  | Number | Maximum sending bitrate in `bps`. | Yes | 0 (no limit)

</div>

> `@async`

<div markdown="1" class="note">
This method just works when REMB is available in the remote sender, which is typically just supported in WebRTC.
</div>

```javascript
await transport.setMaxIncomingBitrate(3500000);
```

#### transport.produce(options)
{: #transport-produce .code}

Instructs the transport to receive audio or video RTP (or SRTP depending on the transport class). This is the way to inject media into mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [ProducerOptions](#ProducerOptions) | Producer options. | Yes |

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

#### transport.consume(options)
{: #transport-consume .code}

Instructs the transport to send audio or video RTP (or SRTP depending on the transport class). This is the way to extract media from mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [ConsumerOptions](#ConsumerOptions) | Consumer options. | Yes |

</div>

> `@async`
> 
> `@returns` [Consumer](#Consumer)

<div markdown="1" class="note">
Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.
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

#### transport.produceData(options)
{: #transport-producedata .code}

Instructs the transport to receive data via [SCTP](https://tools.ietf.org/html/rfc4960) stream. This is the way to inject data into mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [DataProducerOptions](#DataProducerOptions) | Data producer options. | No | `{ }`

</div>

> `@async`
> 
> `@returns` [DataProducer](#DataProducer)

```javascript
const dataProducer = await transport.produceData();
```

#### transport.consumeData(options)
{: #transport-consumedata .code}

Instructs the transport to send data via [SCTP](https://tools.ietf.org/html/rfc4960) stream. This is the way to extract data from mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [DataConsumerOptions](#DataConsumerOptions) | Data Consumer options. | Yes |

</div>

> `@async`
> 
> `@returns` [DataConsumer](#DataConsumer)

```javascript
const dataConsumer = await transport.consumeData(
  {
    producerId : "a7a955cf-fe67-4327-bd98-bbd85d7e2ba4"
  });
```

#### transport.enablePacketEvent(types)
{: #transport-enablePacketEvent .code}

Instructs the transport to emit "packet" events. For monitoring purposes. Use with caution.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`types`     | Array&lt;[TransportPacketEventType](#TransportPacketEventType)&gt; | Enabled types. | No | Unset (so disabled)

</div>

> `@async`

```javascript
await transport.enablePacketEvent([ "probation" ]);

transport.on("packet", (packet) =>
{
  // packet.type can just be "probation".
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

#### transport.on("packet", fn(packet))
{: #transport-on-packet .code}

See [enablePacketEvent()](#transport-enablePacketEvent) method.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`packet`    | [TransportPacketEventData](#TransportPacketEventData) | Packet data.

</div>

```javascript
transport.on("packet", (packet) =>
{
  console.log(packet);
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

#### transport.observer.on("packet", fn(packet))
{: #transport-observer-on-packet .code}

Same as the [packet](#transport-on-packet) event.

</section>

