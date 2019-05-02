## Transport
{: #Transport}

<section markdown="1">

A WebRTC transport connects a mediasoup-client [Device](#Device) with a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) at media level and enables the sending of media (by means of [Producer](#Producer) instances) **or** the receiving of media (by means of [Consumer](#Consumer) instances).

Internally, the transport holds a WebRTC [RTCPeerConnection](https://w3c.github.io/webrtc-pc/#dom-rtcpeerconnection) instance.

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### transport.GetId()
{: #transport-getId .code}

Transport identifier. It matches the `id` of the server side transport.

> `@type` const std::string&

#### transport.GetConnectionState()
{: #transport-connectionState .code}

The current connection state of the local peerconnection.

> `@type` const std::string& [RTCPeerConnectionState](https://w3c.github.io/webrtc-pc/#rtcpeerconnectionstate-enum)

#### transport.GetAppData()
{: #transport-appData .code}

Custom data Object provided by the application in the transport constructor. The app can modify its content at any time.

> `@type` const nlohmann::json&

#### transport.IsClosed()
{: #transport-closed .code}

Whether the transport is closed.

> `@type` bool

#### transport.Close()
{: #transport-close .code}

Closes the transport, including all its producers and consumers.

<div markdown="1" class="note">
This method should be called when the server side transport has been closed (and vice-versa).
</div>

#### transport.GetStats()
{: #transport-getStats .code}

Gets the local transport statistics by calling `getStats()` in the underlying `RTCPeerConnection` instance.

> `@returns` nlohmann::json& [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### transport.RestartIce(iceParameters)
{: #transport-restartIce .code}

Instructs the underlying peerconnection to restart ICE by providing it with new remote ICE parameters.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`iceParameters`  | const nlohmann::json& [IceParameters](/documentation/v3/mediasoup/api/#WebRtcTransportIceParameters) | New ICE parameters of the server side transport. | Yes   |

</div>

<div markdown="1" class="note">
This method must be called after restarting ICE in server side via [webRtctransport.restartIce()](/documentation/v3/mediasoup/api/#webRtcTransport-restartIce).
</div>

```c++
transport.RestartIce(iceParameters);
```

#### transport.UpdateIceServers(iceServers)
{: #transport-updateIceServers .code}

Provides the underlying peerconnection with a new list of TURN servers.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`iceServers`    | const nlohmann::json& Array&lt;[RTCIceServer](https://w3c.github.io/webrtc-pc/#rtciceserver-dictionary)&gt; | List of TURN servers to provide the local peerconnection with. | No   | `[ ]`

</div>

<div markdown="1" class="note">
This method is specially useful if the TURN server credentials have changed.
</div>

```javascript
transport.updateIceServers(iceServers);
```

## Transport::Listener
{: #TransportListener}

<section markdown="1">

#### listener.OnConnect(transport, dtlsParameters)
{: #transport-onconnect .code}

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
{: #transport-onconnectionstatechange .code}

Emitted when the local transport connection state changes.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`transport`     | [Transport\*](#Transport) | send transport instance.
`connectionState` | const std::string& [RTCPeerConnectionState](https://w3c.github.io/webrtc-pc/#rtcpeerconnectionstate-enum) | Transport connection state.

</div>

</section>
