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

<div markdown="1" class="note">
If video simulcast is desired, `encodings` array must be filled with more than one encodings. Each encoding represents a simulcast RTP stream:
* The order of the encodings is important. The entry with index 0 represents the simulcast stream with lowest bitrate. The entry with index N-1 (being N the number of entries) represents the simulcast stream with highest bitrate. Take this into account when writting per encoding settings such as `maxBitrate`, `maxFramerate` or `scaleResolutionDownBy`.
* `rid` field must not be set. The library will internally add it if the underlying browser supports RID.
* `active` field must not be set. The library will internally set it to `true`.
</div>

> `@returns` [Producer](#Producer)

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


## SendTransport::Listener
{: #SendTransportListener}

<section markdown="1">

#### listener.OnProduce(transport, kind, rtpParameters, appData)
{: #sendtransport-OnProduce .code}

Emitted when the transport needs to transmit information about a new producer to the associated server side transport. This event occurs before the [produce()](#transport-produce) method completes.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description   
--------------- | ------- | ----------------
`transport`     | [SendTransport\*](#SendTransport) | send transport instance.
`kind`          | const std::string&  | Producer's media kind ("audio" or "video").
`rtpParameters` | nlohmann::json [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters) | Producer's RTP parameters.
`appData`       | const nlohmann::json&  | Custom application data as given in the `transport.produce()` method.

</div>

<div markdown="1" class="note">
In server side, the application should call [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce).
</div>

```c++
std::future<std::string> Sender::OnProduce(
  mediasoupclient::Transport* transport,
  const std::string& kind,
  json rtpParameters,
  const json& appData)
{
	std::promise<std::string> promise;

	json body =
	{
		{ "transportId",   transport->GetId() },
		{ "kind",          kind               },
		{ "rtpParameters", rtpParameters      },
		{ "appData",       appData            }
	};

	json response = mySignaling.send("transport-produce", body);

	auto it = response.find("id");
	if (it == response.end())
		promise.set_exception(std::make_exception_ptr("'id' missing in response"));

	promise.set_value(it->get<std::string>());

	return promise.get_future();
}
```

</section>
