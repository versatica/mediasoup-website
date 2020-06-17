## SendTransport
{: #SendTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A WebRTC send transport connects a mediasoupclient [Device](#Device) with a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) at media level and enables the sending of media (by means of [Producer](#Producer) instances).

Internally, the transport holds a WebRTC [RTCPeerConnection](https://w3c.github.io/webrtc-pc/#dom-rtcpeerconnection) instance.

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### sendTransport.Produce(listener, track, encodings, codecOptions, appData)
{: #SendTransport-Produce .code}

Instructs the transport to send an audio or video track to the mediasoup router.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`listener`      | [Producer::Listener](#ProducerListener) | Producer listener. | Yes |
`track`         | webrtc::MediaStreamTrackInterface* | An audio or video track. | Yes |
`encodings`     | const std::vector\<webrtc::RtpEncodingParameters\>* | Encoding settings. | No |
`codecOptions`  | [ProducerCodecOptions\*](#ProducerCodecOptions) | Per codec specific options. | No | `[ ]`
`appData`       | nlohmann::json  | Custom application data. | No | `{ }`

</div>

> `@async` blocks current thread
>
> `@returns` [Producer](#Producer)

<div markdown="1" class="note">
If video simulcast is desired, `encodings` array must be filled with more than one encodings. Each encoding represents a simulcast RTP stream:
* The order of the encodings is important. The entry with index 0 represents the simulcast stream with lowest bitrate. The entry with index N-1 (being N the number of entries) represents the simulcast stream with highest bitrate. Take this into account when writting per encoding settings such as `maxBitrate`, `maxFramerate` or `scaleResolutionDownBy`.
* `rid` field must not be set. The library will internally add it if the underlying browser supports RID.
* `active` field must not be set. The library will internally set it to `true`.
</div>

```c++
// Send opus audio track with specific codec options.
if (device.CanProduce("audio"))
{
	auto* audioTrack = myUtils::createAudioTrack();

	json codecOptions =
	{
		{ "opusStereo", true },
		{ "opusDtx",    true }
	};

	auto* audioProducerListener = new MyProducerListener();
	auto* audioProducer = sendTransport->Produce(
		audioProducerListener, 
		audioTrack, 
		nullptr, 
		&codecOptions);
}

// Send video track with 3 simulcast streams.
if (device.CanProduce("video"))
{
	auto* videoTrack = myUtils::createVideoTrack();

	std::vector<webrtc::RtpEncodingParameters> encodings;
	
	encodings.emplace_back(webrtc::RtpEncodingParameters());
	encodings.emplace_back(webrtc::RtpEncodingParameters());
	encodings.emplace_back(webrtc::RtpEncodingParameters());

	auto* videoProducerListener = new MyProducerListener();

	// This will block the current thread until completion.
	auto* videoProducer = sendTransport->Produce(
		videoProducerListener,
		videoTrack,
		&encodings,
		nullptr);
}
```

<div markdown="1" class="note">
Before this method completes, the local transport will call ["OnProduce"](#SendTransportListener-OnProduce) method in the listener. The application must define this method, signal those parameters to the server, and invoke [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) on the corresponding WebRTC transport.

Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### sendTransport.ProduceData(listener, label, protocol, order, maxRetransmits, maxPacketLifeTime, appData)
{: #SendTransport-ProduceData .code}

Instructs the transport to send data via [DataChannel](https://www.w3.org/TR/webrtc/#rtcdatachannel) to the mediasoup router. 

<div markdown="1" class="table-wrapper L3">

Argument           | Type    | Description | Required | Default 
-----------        | ------- | ----------- | -------- | ----------
`listener`         | [DataProducer::Listener\*](#DataProducerListener) | DataProducer listener. | Yes |
`label`            | const std::string& | A label which can be used to distinguish this DataChannel from others. | No |
`protocol`         | const std::string& | Name of the sub-protocol used by this DataChannel. | No |
`ordered`          | bool | Whether data messages must be received in order. if true the messages will be sent reliably. | No | true
`maxPacketLifeTime`| int | When `ordered` is false indicates the time (in milliseconds) after which a SCTP packet will stop being retransmitted. | No |
`maxRetransmits`   | int | When `ordered` is false indicates the maximum number of times a packet will be retransmitted. | No |
`appData`          | const nlohmann::json&  | Custom application data. | No | `{ }`

</div>

> `@async` blocks current thread
>
> `@returns` [DataProducer](#DataProducer)

<div markdown="1" class="note">
Before this method completes, the local transport will call ["OnProduceData"](#SendTransportListener-OnProduceData) method in the listener. The application must define this method, signal those parameters to the server, and invoke [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) on the corresponding WebRTC transport.

Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>
</section>
