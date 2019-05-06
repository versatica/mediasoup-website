## RecvTransport
{: #RecvTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A WebRTC receive transport connects a mediasoupclient [Device](#Device) with a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) at media level and enables the reception of media (by means of [Consumer](#Consumer) instances).

Internally, the transport holds a WebRTC [RTCPeerConnection](https://w3c.github.io/webrtc-pc/#dom-rtcpeerconnection) instance.

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### recvTransport.Consume(listener, id, producerId, kind, rtpParameters, appData)
{: #transport-Consume .code}

Instructs the transport to receive an audio or video track to the mediasoup router.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`listener`      | [Consumer::Listener](#ConsumerListener) | Consumer listener. | Yes |
`id`            | const std::string&  | The identifier of the server side consumer. | Yes |
`producerId`    | const std::string&  | The identifier of the server side producer being consumed. | Yes |
`kind`          | const std::string&  | Media kind ("audio" or "video"). | Yes |
`rtpParameters` | const nlohmann::json\* [RtpReceiveParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters) | Receive RTP parameters. | Yes |
`appData`       | nlohmann::json  | Custom application data. | No | `{ }`

</div>

> `@async` blocks current thread.
>
> `@returns` [Consumer](#Consumer)

```c++
Receiver::Consume(producerId, kind, rtpParameters)
{
	auto consumer = recvTransport->Consume(
		this,
		std::to_string(rtc::CreateRandomId()),
		producerId,
		kind,
		rtpParameters
	);
}
```
