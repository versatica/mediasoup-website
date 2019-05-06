## Consumer
{: #Consumer}

<section markdown="1">

A consumer represents an audio or video remote source being transmitted from the mediasoup router to the client application through a WebRTC transport.

</section>


### Methods
{: #Consumer-methods}

<section markdown="1">

#### consumer.GetId()
{: #consumer-GetId .code}

Consumer identifier.

> `@type` const std::string&

#### consumer.GetProducerId()
{: #consumer-GetProducerId .code}

The associated producer identifier.

> `@type` const std::string&

#### consumer.GetKind()
{: #consumer-GetKind .code}

The media kind ("audio" or "video").

> `@type` const std::string&

#### consumer.GetRtpParameters()
{: #consumer-GetRtpParameters .code}

Consumer RTP parameters.

> `@type` const nlohmann::json& [RtpReceiveParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters)

<div markdown="1" class="note">
Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### consumer.GetTrack()
{: #consumer-GetTrack .code}

The remote audio or video track.

> `@type` webrtc::MediaStreamTrackInterface\*

#### consumer.GetStats()
{: #consumer-GetStats .code}

Gets the local RTP receiver statistics by calling `getStats()` in the underlying `RTCRtpReceiver` instance.

> `@returns` nlohmann::json  [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### consumer.GetAppData()
{: #consumer-GetAppData .code}

Custom data Object provided by the application in the consumer factory method. The app can modify its content at any time.

> `@type` const nlohmann::json&

#### consumer.IsClosed()
{: #consumer-IsClosed .code}

Whether the consumer is closed.

> `@type` bool

#### consumer.IsPaused()
{: #consumer-IsPaused .code}

Whether the consumer is paused.

> `@type` bool

#### consumer.Close()
{: #consumer-Close .code}

Closes the consumer.

<div markdown="1" class="note">
This method should be called when the server side consumer has been closed (and vice-versa).
</div>

#### consumer.Pause()
{: #consumer-Pause .code}

Pauses the consumer. Internally the library executes `track->set_enabled(false)` in the remote track.

<div markdown="1" class="note">
This method should be called when the server side consumer has been paused (and vice-versa).
</div>

#### consumer.Resume()
{: #consumer-Resume .code}

Resumes the consumer Internally the library executes `track->set_enabled(true)` in the remote track.

<div markdown="1" class="note">
This method should be called when the server side consumer has been resumed (and vice-versa).
</div>

</section>
