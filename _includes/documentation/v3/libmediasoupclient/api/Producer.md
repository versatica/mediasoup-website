## Producer
{: #Producer}

<section markdown="1">

A producer represents an audio or video source that will be transmitted to the mediasoup router through a WebRTC transport.

</section>


### Dictionaries
{: #Producer-dictionaries}

<section markdown="1">

#### ProducerCodecOptions
{: #ProducerCodecOptions .code}

> `@type` nlohmann::json

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`opusStereo`    | bool | Enable OPUS stereo (if the audio source is stereo). | No | libwebrtc default.
`opusFec`       | bool | Enable OPUS in band FEC. | No | libwebrtc default.
`opusDtx`       | bool | Enable OPUS discontinuous transmission. | No | libwebrtc default.
`opusMaxPlaybackRate` | Unsigned number | Set OPUS maximum playbak rate. | No | libwebrtc default.
`videoGoogleStartBitrate` | Unsigned number | Set video initial bitrate. | No |
`videoGoogleMaxBitrate` | Unsigned number | Set video maximum bitrate. | No |
`videoGoogleMinBitrate` | Unsigned number | Set video minimum bitrate. | No |
`opusPtime`     | Unsigned number | Set OPUS frame size. | No | libwebrtc default.

</div>

</section>


### Methods
{: #Producer-methods}

<section markdown="1">

#### producer.GetId()
{: #Producer-GetId .code}

Producer identifier.

> `@returns` const std::string&

#### producer.GetKind()
{: #Producer-GetKind .code}

The media kind ("audio" or "video").

> `@returns` std::string [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind)

#### producer.GetTrack()
{: #Producer-GetTrack .code}

The audio or video track being transmitted.

> `@returns` webrtc::MediaStreamTrackInterface\*

#### producer.GetRtpParameters()
{: #Producer-GetRtpParameters .code}

Producer RTP parameters. These parameters are internally built by the library and conform to the syntax and requirements of mediasoup, thus they can be transmitted to the server to invoke [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) with them.

> `@returns` const nlohmann::json& [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters)

<div markdown="1" class="note">
Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### producer.GetMaxSpatialLayer()
{: #Producer-GetMaxSpatialLayer .code}

In case of simulcast, this value determines the highest stream (from 0 to N-1) being transmitted. See the [SetMaxSpatialLayer()](#Producer-SetMaxSpatialLayer) method for more about this.

> `@returns` const uint8_t

#### producer.GetStats()
{: #Producer-GetStats .code}

Gets the local RTP sender statistics by calling `getStats()` in the underlying `RTCRtpSender` instance.

> `@async` blocks current thread
>
> `@returns` nlohmann::json [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### producer.GetAppData()
{: #Producer-GetAppData .code}

Custom data Object provided by the application in the producer factory method. The app can modify its content at any time.

> `@returns` const nlohmann::json&

#### producer.IsClosed()
{: #Producer-IsClosed .code}

Whether the producer is closed.

> `@returns` bool

#### producer.IsPaused()
{: #Producer-IsPaused .code}

Whether the producer is paused.

> `@returns` bool

#### producer.Close()
{: #Producer-Close .code}

Closes the producer. No more media is transmitted.

<div markdown="1" class="note">
This method should be called when the server side producer has been closed (and vice-versa).
</div>

#### producer.Pause()
{: #Producer-Pause .code}

Pauses the producer (no RTP is sent to the server).

<div markdown="1" class="note">
This method should be called when the server side producer has been paused (and vice-versa).
</div>

#### producer.Resume()
{: #Producer-Resume .code}

Resumes the producer (RTP is sent again to the server).

<div markdown="1" class="note">
This method should be called when the server side producer has been resumed (and vice-versa).
</div>

#### producer.ReplaceTrack(track)
{: #Producer-ReplaceTrack .code}

Replaces the audio or video track being transmitted. No negotiation with the server is needed.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`track`         | webrtc::MediaStreamTrackInterface\* | An audio or video track. | Yes |

</div>

```c++
producer.ReplaceTrack(newVideoTrack);
```

#### producer.SetMaxSpatialLayer(spatialLayer)
{: #Producer-SetMaxSpatialLayer .code}

In case of simulcast, this method limits the highest RTP stream being transmitted to the server.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`spatialLayer`  | uint8_t  | The index of the entry in `encodings` representing the highest RTP stream that will be transmitted. | Yes |

</div>

```c++
// Assuming `encodings` array has 3 entries, let's enable just the first and
// second streams (indexes 0 and 1).
producer.setMaxSpatialLayer(1);
```

</section>
