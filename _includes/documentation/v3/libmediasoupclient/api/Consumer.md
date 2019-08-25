## Consumer
{: #Consumer}

<section markdown="1">

A consumer represents an audio or video remote source being transmitted from the mediasoup router to the client application through a WebRTC transport.

</section>


### Methods
{: #Consumer-methods}

<section markdown="1">

#### consumer.GetId()
{: #Consumer-GetId .code}

Consumer identifier.

> `@returns` const std::string&

#### consumer.GetProducerId()
{: #Consumer-GetProducerId .code}

The associated producer identifier.

> `@returns` const std::string&

#### consumer.GetKind()
{: #Consumer-GetKind .code}

The media kind ("audio" or "video").

> `@returns` const std::string& [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind)

#### consumer.GetRtpParameters()
{: #Consumer-GetRtpParameters .code}

Consumer RTP parameters.

> `@returns` const nlohmann::json& [RtpReceiveParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters)

<div markdown="1" class="note">
Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### consumer.GetTrack()
{: #Consumer-GetTrack .code}

The remote audio or video track.

> `@returns` webrtc::MediaStreamTrackInterface\*

#### consumer.GetStats()
{: #Consumer-GetStats .code}

Gets the local RTP receiver statistics by calling `getStats()` in the underlying `RTCRtpReceiver` instance.

> `@async` blocks current thread
>
> `@returns` nlohmann::json  [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### consumer.GetAppData()
{: #Consumer-GetAppData .code}

Custom data Object provided by the application in the consumer factory method. The app can modify its content at any time.

> `@returns` const nlohmann::json&

#### consumer.IsClosed()
{: #Consumer-IsClosed .code}

Whether the consumer is closed.

> `@returns` bool

#### consumer.IsPaused()
{: #Consumer-IsPaused .code}

Whether the consumer is paused.

> `@returns` bool

#### consumer.Close()
{: #Consumer-Close .code}

Closes the consumer.

<div markdown="1" class="note">
This method should be called when the server side consumer has been closed (and vice-versa).
</div>

#### consumer.Pause()
{: #Consumer-Pause .code}

Pauses the consumer. Internally the library executes `track->set_enabled(false)` in the remote track.

<div markdown="1" class="note">
This method should be called when the server side consumer has been paused (and vice-versa).
</div>

#### consumer.Resume()
{: #Consumer-Resume .code}

Resumes the consumer Internally the library executes `track->set_enabled(true)` in the remote track.

<div markdown="1" class="note">
This method should be called when the server side consumer has been resumed (and vice-versa).
</div>

</section>
