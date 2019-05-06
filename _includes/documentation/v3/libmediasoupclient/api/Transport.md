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
{: #transport-GetId .code}

Transport identifier. It matches the `id` of the server side transport.

> `@type` const std::string&

#### transport.GetConnectionState()
{: #transport-GetConnectionState .code}

The current connection state of the local peerconnection.

> `@type` const std::string& [RTCPeerConnectionState](https://w3c.github.io/webrtc-pc/#rtcpeerconnectionstate-enum)

#### transport.GetStats()
{: #transport-GetStats .code}

Gets the local transport statistics by calling `getStats()` in the underlying `RTCPeerConnection` instance.

> `@async` blocks current thread.
>
> `@returns` nlohmann::json& [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### transport.GetAppData()
{: #transport-GetAppData .code}

Custom data Object provided by the application in the transport constructor. The app can modify its content at any time.

> `@type` const nlohmann::json&

#### transport.IsClosed()
{: #transport-IsClosed .code}

Whether the transport is closed.

> `@type` bool

#### transport.Close()
{: #transport-Close .code}

Closes the transport, including all its producers and consumers.

<div markdown="1" class="note">
This method should be called when the server side transport has been closed (and vice-versa).
</div>

#### transport.RestartIce(iceParameters)
{: #transport-RestartIce .code}

Instructs the underlying peerconnection to restart ICE by providing it with new remote ICE parameters.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`iceParameters`  | const nlohmann::json& [IceParameters](/documentation/v3/mediasoup/api/#WebRtcTransportIceParameters) | New ICE parameters of the server side transport. | Yes   |

</div>

> `@async` blocks current thread.

<div markdown="1" class="note">
This method must be called after restarting ICE in server side via [webRtctransport.restartIce()](/documentation/v3/mediasoup/api/#webRtcTransport-restartIce).
</div>

```c++
transport.RestartIce(iceParameters);
```

#### transport.UpdateIceServers(iceServers)
{: #transport-UpdateIceServers .code}

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
