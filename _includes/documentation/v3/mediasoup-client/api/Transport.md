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
`appData`       | Object  | Custom application data. | No | `{ }`

</div>

#### TransportProduceParameters
{: #TransportProduceParameters .code}

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description   
--------------- | ------- | ----------------
`kind`          | String  | Producer's media kind ("audio" or "video").
`rtpParameters` | [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters) | Producer's RTP parameters.
`appData`       | Object  | Custom application data as given in the `transport.produce()` method.

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

Gets the local transport statistics by calling `getStats()` in the underlying `RTCPeerConnection` instance.

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

Instructs the transport to send an audio or video track to the mediasoup router.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [ProducerOptions](#ProducerOptions) | Producer options. | Yes |

</div>

> `@async`
> 
> `@returns` [Producer](#Producer)

```javascript
// Send webcam video with 3 simulcast streams.
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const videoTrack = stream.getVideoTracks()[0];
const producer = await transport.produce(
  {
    track       : videoTrack,
    encodings   :
    [
      { maxBitrate: 100000 },
      { maxBitrate: 300000 },
      { maxBitrate: 900000 }
    ],
    codecOptions :
    {
      videoGoogleStartBitrate : 1000
    }
  });
```

<div markdown="1" class="note">
Before this method completes, the local transport will emit the ["produce"](#transport-on-produce) event. The application must be subscribed to this event, signal those parameters to the server, and invoke [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) on the corresponding WebRTC transport.

Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### transport.consume(options)
{: #transport-consume .code}

Instructs the transport to receive an audio or video track from the mediasoup router.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [ConsumerOptions](#ConsumerOptions) | Consumer options. | Yes |

</div>

> `@async`
> 
> `@returns` [Consumer](#Consumer)

```javascript
// Let's assume we have created a video consumer in server side and signal its
// parameters to the client app.
mySignaling.on('newConsumer', (data) =>
{
  const consumer = await transport.consume(
    {
      id            : data.id,
      producerId    : data.producerId,
      kind          : data.kind,
      rtpParameters : data.rtpParameters
    });

  // Render the remote video track into a HTML video element.
  const { track } = consumer;

  videoElem.srcObject = new MediaStream([ track ]);
});
```

<div markdown="1" class="note">
The consumer is created in server side first via [transport.consume()](/documentation/v3/mediasoup/api/#transport-consume). Then its parameters are signaled to the client application which creates a local replica of the consumer and manages it.

Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

</section>


### Events
{: #Transport-events}

<section markdown="1">

#### transport.on("connect", fn({ dtlsParameters }, callback(), errback(error))
{: #transport-on-connect .code}

Emitted when the transport is about to establish the ICE+DTLS connection and needs to exchange information with the associated server side transport.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`dtlsParameters` | [DtlsParameters](/documentation/v3/mediasoup/api/#WebRtcTransportDtlsParameters) | Local DTLS parameters.
`callback`  | Function | A function that must be called by the application once the parameters have been transmitted to the associated server side transport.
`errback`   | Function | A function that must be called by the application (with the corresponding error) if the tranmission of parameters to the associated server side transport failed for any reason.

</div>

<div markdown="1" class="note">
In server side, the application should call [webRtcTransport.connect()](/documentation/v3/mediasoup/api/#webRtcTransport-connect).
</div>

```javascript
transport.on("connect", ({ dtlsParameters }, callback, errback) =>
{
  // Signal local DTLS parameters to the server side transport.
  try
  {
    await mySignaling.send(
      "transport-connect",
      {
        transportId    : transport.id, 
        dtlsParameters : dtlsParameters
      });

    // Tell the transport that parameters were transmitted.
    callback();
  }
  catch (error)
  {
    // Tell the transport that something was wrong.
    errback(error);
  }
});
```

#### transport.on("produce", fn(parameters, callback({ id }), errback(error))
{: #transport-on-produce .code}

Emitted when the transport needs to transmit information about a new producer to the associated server side transport. This event occurs before the [produce()](#transport-produce) method completes.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description   
--------------- | ------- | ----------------
`parameters`    | [TransportProduceParameters](#TransportProduceParameters) | Parameters to create a server side producer.

</div>

<div markdown="1" class="note">
In server side, the application should call [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce).
</div>

```javascript
transport.on("produce", (parameters, callback, errback) =>
{
  // Signal parameters to the server side transport and retrieve the id of 
  // the server side new producer.
  try
  {
    const data = await mySignaling.send(
      "transport-produce",
      {
        transportId   : transport.id, 
        kind          : parameters.kind,
        rtpParameters : parameters.rtpParameters,
        appData       : parameters.appData
      });

    // Let's assume the server included the created producer id in the response
    // data object.
    const { id } = data;

    // Tell the transport that parameters were transmitted and provide it with the
    // server side producer's id.
    callback({ id });
  }
  catch (error)
  {
    // Tell the transport that something was wrong.
    errback(error);
  }
});
```

#### transport.on("connectionstatechange", fn(connectionState)
{: #transport-on-connectionstatechange .code}

Emitted when the local transport connection state changes.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`connectionState` | [RTCPeerConnectionState](https://w3c.github.io/webrtc-pc/#rtcpeerconnectionstate-enum) | Transport connection state.

</div>

</section>
