## Transport
{: #Transport}

<section markdown="1">

A WebRTC transport connects a mediasoup-client [Device](#Device) with a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) at media level and enables the sending of media (by means of [Producer](#Producer) instances) **or** the receiving of media (by means of [Consumer](#Consumer) instances).

Internally, the transport holds a WebRTC [RTCPeerConnection](https://w3c.github.io/webrtc-pc/#dom-rtcpeerconnection) instance.

</section>


### Dictionaries
{: #Transport-dictionaries}

<section markdown="1">

#### TransportOptions
{: #TransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field            | Type    | Description   | Required | Default
---------------- | ------- | ------------- | -------- | ---------
`id`             | String  | The identifier of the server side transport. | Yes    |
`iceParameters`  | [IceParameters](/documentation/v3/mediasoup/api/#WebRtcTransportIceParameters) | ICE parameters of the server side transport. | Yes   |
`iceCandidates`  | Array&lt;[IceCandidate](/documentation/v3/mediasoup/api/#WebRtcTransportIceCandidate)&gt; | ICE candidates of the server side transport. | Yes   |
`dtlsParameters` | [DtlsParameters](/documentation/v3/mediasoup/api/#WebRtcTransportDtlsParameters) | DTLS parameters of the server side transport. | Yes   |
`iceServers`     | Array&lt;[RTCIceServer](https://w3c.github.io/webrtc-pc/#rtciceserver-dictionary)&gt; | List of TURN servers. This setting is given to the local peerconnection. | No   | `[ ]`
`iceTransportPolicy` | [RTCIceTransportPolicy](https://w3c.github.io/webrtc-pc/#rtcicetransportpolicy-enum) | ICE candidate policy for the local peerconnection. | No   | "all"
`proprietaryConstraints` | Object  | Browser vendor's proprietary constraints used as second argument in the peerconnection constructor. | No |
`appData`       | Object  | Custom application data. | No | `{}`

</div>

</section>


### Properties
{: #Transport-properties}

<section markdown="1">

#### transport.id
{: #transport-id .code}

Transport identifier. It matches the `id` of the server side transport.

> `@type` String, read only

#### transport.closed
{: #transport-closed .code}

Whether the transport is closed.

> `@type` Boolean, read only

#### transport.direction
{: #transport-direction .code}

The direction of this transport. "send" means that this is a WebRTC transport for sending media. "recv" means that this is a WebRTC transport for receiving media.

> `@type` String, read only

#### transport.connectionState
{: #transport-connectionState .code}

The current connection state of the local peerconnection.

> `@type` [RTCPeerConnectionState](https://w3c.github.io/webrtc-pc/#rtcpeerconnectionstate-enum), read only

#### transport.appData
{: #transport-appData .code}

Custom data Object provided by the application in the transport constructor. The app can modify its content at any time.

> `@type` Object, read only

```javascript
transport.appData.foo = "bar";
```

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### transport.close()
{: #transport-close .code}

Closes the transport, including all its producers and consumers.

<div markdown="1" class="note">
This method should be called when the server side transport has been closed (and vice-versa).
</div>

#### transport.getStats()
{: #transport-getStats .code}

Gets the local transport statistics by calling `getStats()` in the underlying peerconnection.

> `@async`
> 
> `@returns` [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### transport.restartIce({ iceParameters })
{: #transport-restartIce .code}

Instructs the underlying peerconnection to restart ICE by providing it with new remote ICE parameters.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`iceParameters`  | [IceParameters](/documentation/v3/mediasoup/api/#WebRtcTransportIceParameters) | New ICE parameters of the server side transport. | Yes   |

</div>

> `@async`

<div markdown="1" class="note">
This method must be called after restarting ICE in server side via [webRtcTransport.restartIce()](/documentation/v3/mediasoup/api/#webRtcTransport-restartIce).
</div>

```javascript
await transport.restartIce({ iceParameters: { ... } });
```

#### transport.updateIceServers({ iceServers })
{: #transport-updateIceServers .code}

Provides the underlying peerconnection with a new list of TURN servers.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`iceServers`    | Array&lt;[RTCIceServer](https://w3c.github.io/webrtc-pc/#rtciceserver-dictionary)&gt; | List of TURN servers to provide the local peerconnection with. | No   | `[ ]`

</div>

> `@async`

<div markdown="1" class="note">
This method is specially useful if the TURN server credentials have changed.
</div>

```javascript
await transport.updateIceServers({ iceServers: [ ... ] });
```

#### transport.produce(options)
{: #transport-produce .code}

*TODO*

#### transport.consume(options)
{: #transport-consume .code}

*TODO*

</section>
