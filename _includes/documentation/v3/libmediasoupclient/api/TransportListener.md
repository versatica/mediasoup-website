## Transport::Listener
{: #TransportListener}


<section markdown="1">

> `@abstract`

This is an abstract class which must be implemented and used according to the API.

</section>


### Events
{: #TransportListener-events}

<section markdown="1">

#### listener.OnConnect(transport, dtlsParameters)
{: #transport-OnConnect .code}

Called when the transport is about to establish the ICE+DTLS connection and needs to exchange information with the associated server side transport.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`transport`      | [Transport\*](#Transport) | send transport instance.
`dtlsParameters` | const nlohmann::json& [DtlsParameters](/documentation/v3/mediasoup/api/#WebRtcTransportDtlsParameters) | Local DTLS parameters.

</div>

<div markdown="1" class="note">
In server side, the application should call [webRtcTransport.connect()](/documentation/v3/mediasoup/api/#webRtcTransport-connect).
</div>

```c++
std::future<void> TransportListener::OnConnect(
  mediasoupclient::Transport transport, const json& dtlsParameters)
{
	std::promise<void> promise;

	json body =
	{
		{ "transportId",    transport->GetId() },
		{ "dtlsParameters", dtlsParameters     }
	};

	// Signal local DTLS parameters to the server side transport.
	mySignaling.send("transport-connect", body);

	promise.set_value();

	return promise.get_future();
}
```

#### listener.OnConnectionStateChange(transport, connectionState)
{: #transport-OnConnectionStateChange .code}

Emitted when the local transport connection state changes.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`transport`     | [Transport\*](#Transport) | send transport instance.
`connectionState` | const std::string& [RTCPeerConnectionState](https://w3c.github.io/webrtc-pc/#rtcpeerconnectionstate-enum) | Transport connection state.

</div>

</section>
