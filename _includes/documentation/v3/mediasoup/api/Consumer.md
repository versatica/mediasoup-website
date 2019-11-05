## Consumer
{: #Consumer}

<section markdown="1">

A consumer represents an audio or video source being forwarded from a mediasoup router to an endpoint. It's created on top of a transport that defines how the media packets are carried.

</section>


### Dictionaries
{: #Consumer-dictionaries}

<section markdown="1">

#### ConsumerOptions
{: #ConsumerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`producerId`    | String  | The id of the producer to consume. | Yes |
`rtpCapabilities` | [RtpCapabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCapabilities) | RTP capabilities of the consuming endpoint. | Yes |
`paused`        | Boolean | Whether the consumer must start in paused mode. See note below. | No | `false`
`preferredLayers` | [ConsumerLayers](#ConsumerLayers) | Preferred spatial and temporal layer for simulcast or SVC media sources. If unset, the highest ones are selected. | No |
`appData`       | Object  | Custom application data. | No | `{ }`

</div>

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

#### ConsumerLayers
{: #ConsumerLayers .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`spatialLayer`  | Number  | The spatial layer index (from 0 to N). | Yes |
`temporalLayer` | Number  | The temporal layer index (from 0 to N). | No |

</div>

#### ConsumerScore
{: #ConsumerScore .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`score`         | Number  | Score of the RTP stream in the consumer (from 0 to 10) representing its transmission quality. | Yes |
`producerScore` | Number  | Score of the currently selected RTP stream in the associated producer (from 0 to 10) representing its transmission quality. | Yes |

</div>

</section>


### Enums
{: #Consumer-enums}

<section markdown="1">

#### ConsumerType
{: #ConsumerType .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"simple"       | A single RTP stream is sent with no spatial/temporal layers.
"simulcast"    | Two or more RTP streams are sent, each of them with one or more temporal layers.
"svc"          | A single RTP stream is sent with spatial/temporal layers.
"pipe"         | Special type for consumers created on a [PipeTransport](#PipeTransport).

</div>

</section>


### Properties
{: #Consumer-properties}

<section markdown="1">

#### consumer.id
{: #consumer-id .code}

Consumer identifier.

> `@type` String, read only

#### consumer.producerId
{: #consumer-producerId .code}

The associated producer identifier.

> `@type` String, read only

#### consumer.closed
{: #consumer-closed .code}

Whether the consumer is closed.

#### consumer.kind
{: #consumer-kind .code}

The media kind ("audio" or "video").

> `@type` [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind), read only

#### consumer.rtpParameters
{: #consumer-rtpParameters .code}

Consumer RTP parameters.

> `@type` [RtpReceiveParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters), read only

<div markdown="1" class="note">
Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.
</div>

#### consumer.type
{: #consumer-type .code}

Consumer type.

> `@type` [ConsumerType](#ConsumerType), read only

#### consumer.paused
{: #consumer-paused .code}

Whether the consumer is paused. It does not take into account whether the associated producer is paused.

> `@type` Boolean, read only

#### consumer.producerPaused
{: #consumer-producerPaused .code}

Whether the associated producer is paused.

> `@type` Boolean, read only

#### consumer.score
{: #consumer-score .code}

The score of the RTP stream being sent, representing its tranmission quality. 

> `@type` [ConsumerScore](#ConsumerScore), read only

#### consumer.currentLayers
{: #consumer-currentLayers .code}

Current spatial and temporal layers (for simulcast and SVC consumers). It's `null` if no layers are being sent to the consuming endpoint at this time.

> `@type` [ConsumerLayers](#ConsumerLayers)\|Null, read only

#### consumer.appData
{: #consumer-appData .code}

Custom data Object provided by the application in the consumer factory method. The app can modify its content at any time.

> `@type` Object, read only

#### consumer.observer
{: #consumer-observer .code}

See the [Observer Events](#Consumer-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #Consumer-methods}

<section markdown="1">

#### consumer.close()
{: #consumer-close .code}

Closes the consumer.

#### consumer.getStats()
{: #consumer-getStats .code}

Returns current RTC statistics of the consumer.

> `@async`
> 
> `@returns` Array&lt;ConsumerStat&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### consumer.pause()
{: #consumer-pause .code}

Pauses the consumer (no RTP is sent to the consuming endpoint).

> `@async`

#### consumer.resume()
{: #consumer-resume .code}

Resumes the consumer (RTP is sent again to the consuming endpoint).

> `@async`

#### consumer.setPreferredLayers(preferredLayers)
{: #consumer-setPreferredLayers .code}

Sets the preferred (highest) spatial and temporal layers to be sent to the consuming endpoint. Just valid for simulcast and SVC consumers.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`preferredLayers` | [ConsumerLayers](#ConsumerLayers) | Preferred spatial and temporal layers. The temporal layer is optional (if unset, the highest one is chosen). | Yes |

</div>

> `@async`

```javascript
await consumer.setPreferredLayers({ spatialLayer: 3 });
```

#### consumer.requestKeyFrame()
{: #consumer-requestKeyFrame .code}

Request a key frame to the associated producer. Just valid for video consumers.

> `@async`

</section>


### Events
{: #Consumer-events}

<section markdown="1">

#### consumer.on("transportclose", fn())
{: #consumer-on-transportclose .code}

Emitted when the transport this consumer belongs to is closed for whatever reason. The consumer itself is also closed.

```javascript
consumer.on("transportclose", () =>
{
  console.log("transport closed so consumer closed");
});
```

#### consumer.on("producerclose", fn())
{: #consumer-on-producerclose .code}

Emitted when the associated producer is closed for whatever reason. The consumer itself is also closed.

```javascript
consumer.on("producerclose", () =>
{
  console.log("associated producer closed so consumer closed");
});
```

#### consumer.on("producerpause", fn())
{: #consumer-on-producerpause .code}

Emitted when the associated producer is paused.

#### consumer.on("producerresume", fn())
{: #consumer-on-producerresume .code}

Emitted when the associated producer is resumed.

#### consumer.on("score", fn(score))
{: #consumer-on-score .code}

Emitted when the consumer score changes.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`score`   | [ConsumerScore](#ConsumerScore) | RTP stream score.

</div>

#### consumer.on("layerschange", fn(layers))
{: #consumer-on-layerschange .code}

Emitted when the spatial/temporal layers being sent to the endpoint change. Just for simulcast or SVC consumers.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`layers`   | [ConsumerLayers](#ConsumerLayers)\|Null | Current spatial and temporal layers (or `null` if there are no current layers).

</div>

<div markdown="1" class="note">
This event is emitted under various circumstances in SVC or simulcast consumers (assuming the consumer endpoints supports BWE via REMB or Transport-CC):

* When the consumer (or its associated producer) is paused.
* When all the RTP streams of the associated producer become inactive (no RTP received for a while).
* When the available bitrate of the BWE makes the consumer upgrade or downgrade the spatial and/or temporal layers.
* When there is no available bitrate for this consumer (even for the lowest layers) so the event fires with `null` as argument.

The Node.js application can detect the latter (consumer deactivated due to not enough bandwidth) by checking if both `consumer.paused` and `consumer.producerPaused` are falsy after the consumer has emitted this event with `null` as argument.
</div>

</section>


### Observer Events
{: #Consumer-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### consumer.observer.on("close", fn())
{: #consumer-observer-on-close .code}

Emitted when the consumer is closed for whatever reason.

#### consumer.observer.on("pause", fn())
{: #consumer-observer-on-pause .code}

Emitted when the consumer or its associated producer is paused and, as result, the consumer becomes paused.

#### consumer.observer.on("resume", fn())
{: #consumer-observer-on-resume .code}

Emitted when the consumer or its associated producer is resumed and, as result, the consumer is no longer paused.

#### consumer.observer.on("score", fn(score))
{: #consumer-observer-on-score .code}

Same as the [score](#consumer-on-score) event.

#### consumer.observer.on("layerschange", fn(layers))
{: #consumer-observer-on-layerschange .code}

Same as the [layerschange](#consumer-on-layerschange) event.

</section>
