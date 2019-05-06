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
{: #transport-Produce .code}

Instructs the transport to send an audio or video track to the mediasoup router.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`listener`      | [Producer::Listener](#ProducerListener) | Producer listener. | Yes |
`track`         | webrtc::MediaStreamTrackInterface* | An audio or video track. | Yes |
`encodings`     | const std::vector\<webrtc::RtpEncodingParameters\>* | Encoding settings. | No |
`codecOptions`  | [ProducerCodecOptions](#ProducerCodecOptions) | Per codec specific options. | No | `[ ]`
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
Sender::Produce()
{
	// Send opus audio track with specific codec options.
	if (this->device.CanProduce("audio"))
	{
		auto audioTrack = createAudioTrack();

		json codecOptions = {
			{ "opusStereo", true },
			{ "opusDtx",    true }
		};

		audioProducer = sendTransport->Produce(this, audioTrack, nullptr, &codecOptions);
	}

	// Send video track with 3 simulcast streams.
	if (this->device.CanProduce("video"))
	{
		auto videoTrack = createVideoTrack();

		std::vector<webrtc::RtpEncodingParameters> encodings;
		encodings.emplace_back(webrtc::RtpEncodingParameters());
		encodings.emplace_back(webrtc::RtpEncodingParameters());
		encodings.emplace_back(webrtc::RtpEncodingParameters());

		videoProducer = sendTransport->Produce(this, videoTrack, &encodings, nullptr);
	}
}
```

<div markdown="1" class="note">
Before this method completes, the local transport will call ["OnProduce"](#sendtransport-OnProduce) method in the listener. The application must define this method, signal those parameters to the server, and invoke [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) on the corresponding WebRTC transport.

Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>
