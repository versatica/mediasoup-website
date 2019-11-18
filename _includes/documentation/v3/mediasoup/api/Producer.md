## Producer
{: #Producer}

<section markdown="1">

A producer represents an audio or video source being injected into a mediasoup router. It's created on top of a transport that defines how the media packets are carried.

</section>


### Dictionaries
{: #Producer-dictionaries}

<section markdown="1">

#### ProducerOptions
{: #ProducerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`kind`          | [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind) | Media kind ("audio" or "video"). | Yes |
`rtpParameters` | [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters) | RTP parameters defining what the endpoint is sending. | Yes |
`paused`        | Boolean | Whether the producer must start in paused mode. | No | `false`
`appData`       | Object  | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.
</div>

#### ProducerScore
{: #ProducerScore .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`ssrc`          | Number  | RTP stream SSRC. | Yes |
`rid`           | String  | RTP stream RID value. | No |
`score`         | Number  | RTP stream score (from 0 to 10) representing the transmission quality. | Yes |

</div>

#### ProducerVideoOrientation
{: #ProducerVideoOrientation .code}

As documented in [WebRTC Video Processing and Codec Requirements](https://tools.ietf.org/html/rfc7742#section-4).

<div markdown="1" class="table-wrapper L3">

Field       | Type    | Description   | Required | Default
----------- | ------- | ------------- | -------- | ---------
`camera`    | Boolean | Whether the source is a video camera. | Yes |
`flip`      | Boolean | Whether the video source is flipped. | Yes |
`rotation`  | Number  | Rotation degrees (0, 90, 180 or 270). | Yes |

</div>

#### ProducerPacketEventData
{: #ProducerPacketEventData .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`type`             | [ProducerPacketEventType](#ProducerPacketEventType) | Packet event type. | Yes |
`timestamp`        | Number  | Event timestamp. | Yes | 
`direction`        | String  | "in" (packet received by mediasoup) or "out" (packet sent by mediasoup). | Yes |
`info`             | Object  | Per type specific information. | Yes |

</div>

</section>


### Enums
{: #Producer-enums}

<section markdown="1">

#### ProducerType
{: #ProducerType .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"simple"       | A single RTP stream is received with no spatial/temporal layers.
"simulcast"    | Two or more RTP streams are received, each of them with one or more temporal layers.
"svc"          | A single RTP stream is received with spatial/temporal layers.

</div>

#### ProducerPacketEventType
{: #ProducerPacketEventType .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description
-------------- | -------------
"rtp"          | RTP packet.
"keyframe"     | RTP video keyframe packet.
"nack"         | RTCP NACK packet.
"pli"          | RTCP PLI packet.
"fir"          | RTCP FIR packet.

</div>

</section>


### Properties
{: #Producer-properties}

<section markdown="1">

#### producer.id
{: #producer-id .code}

Producer identifier.

> `@type` String, read only

#### producer.closed
{: #producer-closed .code}

Whether the producer is closed.

> `@type` Boolean, read only

#### producer.kind
{: #producer-kind .code}

The media kind ("audio" or "video").

> `@type` [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind), read only

#### producer.rtpParameters
{: #producer-rtpParameters .code}

Producer RTP parameters.

> `@type` [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters), read only

<div markdown="1" class="note">
Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.
</div>

#### producer.type
{: #producer-type .code}

Producer type.

> `@type` [ProducerType](#ProducerType), read only

#### producer.paused
{: #producer-paused .code}

Whether the producer is paused.

> `@type` Boolean, read only

#### producer.score
{: #producer-score .code}

The score of each RTP stream being received, representing their tranmission quality. 

> `@type` Array&lt;[ProducerScore](#ProducerScore)&gt;, read only

#### producer.appData
{: #producer-appData .code}

Custom data Object provided by the application in the producer factory method. The app can modify its content at any time.

> `@type` Object, read only

#### producer.observer
{: #producer-observer .code}

See the [Observer Events](#Producer-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #Producer-methods}

<section markdown="1">

#### producer.close()
{: #producer-close .code}

Closes the producer. Triggers a ["producerclose"](#consumer-on-producerclose) event in all its associated consumers.

#### producer.getStats()
{: #producer-getStats .code}

Returns current RTC statistics of the producer.

> `@async`
> 
> `@returns` Array&lt;ProducerStat&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### producer.pause()
{: #producer-pause .code}

Pauses the producer (no RTP is sent to its associated consumers). Triggers a ["producerpause"](#consumer-on-producerpause) event in all its associated consumers.


> `@async`

#### producer.resume()
{: #producer-resume .code}

Resumes the producer (RTP is sent again to its associated consumers). Triggers a ["producerresume"](#consumer-on-producerresume) event in all its associated consumers.


> `@async`

#### producer.enablePacketEvent(types)
{: #producer-enablePacketEvent .code}

Instructs the producer to emit "packet" events. For monitoring purposes. Use with caution.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`types`     | Array&lt;[ProducerPacketEventType](#ProducerPacketEventType)&gt; | Enabled types. | No | Unset (so disabled)

</div>

> `@async`

```javascript
await producer.enablePacketEvent([ "rtp", "pli" ]);

producer.on("packet", (packet) =>
{
  // packet.type can be "rtp" or "pli".
});
```

</section>


### Events
{: #Producer-events}

<section markdown="1">

#### producer.on("transportclose", fn())
{: #producer-on-transportclose .code}

Emitted when the transport this producer belongs to is closed for whatever reason. The producer itself is also closed. A ["producerclose"](#consumer-on-producerclose) event is triggered in all its associated consumers.

```javascript
producer.on("transportclose", () =>
{
  console.log("transport closed so producer closed");
});
```

#### producer.on("score", fn(score))
{: #producer-on-score .code}

Emitted when the producer score changes.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`score`   | Array&lt;[ProducerScore](#ProducerScore)&gt; | RTP streams' scores.

</div>

#### producer.on("videoorientationchange", fn(videoOrientation))
{: #producer-on-videoorientationchange .code}

Emitted when the video orientation changes. This is just possible if the "urn:3gpp:video-orientation" RTP extension has been negotiated in the producer RTP parameters.

<div markdown="1" class="table-wrapper L3">

Argument           | Type    | Description   
------------------ | ------- | ----------------
`videoOrientation` | [ProducerVideoOrientation](#ProducerVideoOrientation) | New video orientation.

</div>

#### producer.on("packet", fn(packet))
{: #producer-on-packet .code}

See [enablePacketEvent()](#producer-enablePacketEvent) method.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`packet`    | [ProducerPacketEventData](#ProducerPacketEventData) | Packet data.

</div>

```javascript
producer.on("packet", (packet) =>
{
  console.log(packet);
});
```

</section>


### Observer Events
{: #Producer-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### producer.observer.on("close", fn())
{: #producer-observer-on-close .code}

Emitted when the producer is closed for whatever reason.

#### producer.observer.on("pause", fn())
{: #producer-observer-on-pause .code}

Emitted when the producer is paused.

#### producer.observer.on("resume", fn())
{: #producer-observer-on-resume .code}

Emitted when the producer is resumed.

#### producer.observer.on("score", fn(score))
{: #producer-observer-on-score .code}

Same as the [score](#producer-on-score) event.

#### producer.observer.on("videoorientationchange", fn(videoOrientation))
{: #producer-observer-on-videoorientationchange .code}

Same as the [videoorientationchange](#producer-on-videoorientationchange) event.

#### producer.observer.on("packet", fn(packet))
{: #producer-observer-on-packet .code}

Same as the [packet](#producer-on-packet) event.

</section>
