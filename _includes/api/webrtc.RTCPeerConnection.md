## webrtc.RTCPeerConnection
{: #webrtc-RTCPeerConnection}

Internally, a `peerconnection` manages a given [Peer](#Peer) instance and all its associated [Transport](#Transport), [RtpReceiver](#RtpReceiver) and [RtpSender](#RtpSender) instances.


### Dictionaries
{: #webrtc-RTCPeerConnection-dictionaries}

<section markdown="1">

#### RTCPeerConnectionOptions
{: #webrtc-RTCPeerConnection-RTCPeerConnectionOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`peer`                   | [Peer](#Peer) | A **mediasoup** Peer instance. | Yes |
`transportOptions`       | [TransportOptions](#Transport-TransportOptions) | Options for the transport. | No |
`usePlanB`               | Boolean | Expect and generate [Plan B](https://tools.ietf.org/html/draft-uberti-rtcweb-plan-00) SDPs for this `peerconnection`. | No | `false`

</div>

<div markdown="1" class="note">

Chrome/Chromium browser does not yet implement [Unified Plan](https://tools.ietf.org/html/draft-roach-mmusic-unified-plan-00) (see open [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=465349)) and, hence, setting `usePlanB` to `true` is required for Chrome/Chromium based endpoints.

In the other side, latest versions of Firefox do implement "Unified Plan", so `usePlanB` must be `false` (or unset) for endpoints running Firefox.

</div>

#### RTCOfferOptions
{: #webrtc-RTCPeerConnection-RTCOfferOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`offerToReceiveAudio`    | Integer | Number of audio tracks the remote peer is allowed to send. | No | 1
`offerToReceiveVideo`    | Integer | Number of video tracks the remote peer is allowed to send. | No | 1

</div>

<div markdown="1" class="note">

These options are just valid for the initial SDP offer sent to the endpoint.

</div>

</section>


### Enums
{: #webrtc-RTCPeerConnection-enums}

<section markdown="1">

#### RTCSignalingState
{: #webrtc-RTCPeerConnection-RTCSignalingState .code}

<div markdown="1" class="table-wrapper L2">

Value                | Description  
-------------------- | ---------------
"stable"             | There is no offer­answer exchange in progress. This is also the initial state in which case the local and remote descriptions are empty.
"have-local-offer"   | A local description, of type "offer", has been successfully applied. 
"have-remote-offer"  | A remote description, of type "offer", has been successfully applied.

</div>

</section>


### Constructor
{: #webrtc-RTCPeerConnection-constructor}

<section markdown="1">

#### new webrtc.RTCPeerConnection(room, peerName, options)
{: #webrtc-RTCPeerConnection-new .code}

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`options`  | [RTCPeerConnectionOptions](#webrtc-RTCPeerConnection-RTCPeerConnectionOptions) | RTCPeerConnection options. | Yes |

</div>

</section>


### Properties
{: #webrtc-RTCPeerConnection-properties}

<section markdown="1">

#### peerconnection.closed
{: #webrtc-peerconnection-closed .code}

* Read only

A Boolean indicating whether the `peerconnection` (so its associated `peer`) has been closed.

#### peerconnection.peer
{: #webrtc-peerconnection-peer .code}

* Read only

Retrieves the [Peer](#Peer) instance associated to this `peerconnection`.

#### peerconnection.localDescription
{: #webrtc-peerconnection-localDescription .code}

* Read only

Gets the local [RTCSessionDescription](#webrtc-RTCSessionDescription).

#### peerconnection.remoteDescription
{: #webrtc-peerconnection-remoteDescription .code}

* Read only

Gets the remote [RTCSessionDescription](#webrtc-RTCSessionDescription) (if any).

#### peerconnection.signalingState
{: #webrtc-peerconnection-signalingState .code}

* Read only

The [RTCSignalingState](#webrtc-RTCPeerConnection-RTCSignalingState) of this `peerconnection`.

</section>


### Methods
{: #webrtc-RTCPeerConnection-methods}

<section markdown="1">

#### peerconnection.close()
{: #webrtc-peerconnection-close .code}

Closes the `peerconnection` and triggers a [`close`](#peerconnection-on-close) event.

#### peerconnection.setCapabilities(sdp)
{: #webrtc-peerconnection-setCapabilities .code}

The endpoint must provide its media capabilities in order to join a room. To do that, the endpoint must create a `RTCPeerConnection`, call `createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 })` on it, obtain the `desc.sdp` and send it to **mediasoup**. 

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`sdp`      | String  | An SDP providing the media capabilities of the peer. | Yes |

</div>

<div markdown="1" class="note warn">

In order to get the capabilities SDP in the WebRTC browser/endpoint, just call `pc.createOffer()` (as stated above) but **DO NOT** call `pc.setLocalDescription()`).

</div>

#### peerconnection.createOffer(options)
{: #webrtc-peerconnection-createOffer .code}

Generates a blob of SDP that contains an RFC 3264 offer with the supported configurations for the session, including descriptions of the internal [Transport](#Transport), [RtpReceiver](#RtpReceiver) and [RtpSender](#RtpSender) instances attached to this `peerconnection`, the RTP parameters supported by both the `room` and the remote endpoint, and local ICE candidates.

Returns a Promise that resolves to a local [RTCSessionDescription](#webrtc-RTCSessionDescription) instance of type "offer".

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`options`  | [RTCOfferOptions](#webrtc-RTCPeerConnection-RTCOfferOptions) | Options for the offer. | No |

</div>

#### peerconnection.createAnswer()
{: #webrtc-peerconnection-createAnswer .code}

Generates a blob of SDP that contains an RFC 3264 answer.

Returns a Promise that resolves to a local [RTCSessionDescription](#webrtc-RTCSessionDescription) instance of type "answer".

#### peerconnection.setLocalDescription(desc)
{: #webrtc-peerconnection-setLocalDescription .code}

Instructs the `peerconnection` to apply the supplied [RTCSessionDescription](#webrtc-RTCSessionDescription) as the local offer or answer.

Returns a Promise.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`desc`  | [RTCSessionDescription](#webrtc-RTCSessionDescription) | Local description. | Yes |

</div>

#### peerconnection.setRemoteDescription(desc)
{: #webrtc-peerconnection-setRemoteDescription .code}

Instructs the `peerconnection` to apply the supplied [RTCSessionDescription](#webrtc-RTCSessionDescription) as the remote offer or answer.

Returns a Promise.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`desc`  | [RTCSessionDescription](#webrtc-RTCSessionDescription) | Remote description. | Yes |

</div>

<div markdown="1" class="note warn">

The **mediasoup** implementation of `RTCPeerConnection` requires that the SDP O/A procedure is always initiated my **mediasoup**. This means that `setRemoteDescription()` can only be called with a remote answer. To be clear: the remote endpoint should not attempt to renegotiate by sending a SDP re-offer.

If the remote endpoint wishes to add/remove a sending audio or video track, it must signal such a desire to the server application (by means of the signaling protocol up to the application) so the server side application can provide him with a re-offer (by calling `createOffer() and setLocalDescription()`). The remote endpoint can then produce an SDP answer containing the desired changes (sending audio/video addition or removal, etc).

</div>

#### peerconnection.reset()
{: #webrtc-peerconnection-reset .code}

Reset the internal machinery of the `RTCPeerConnection`. It basically sets the `signalingState` to "stable".

Useful if the app failed to receive a pending SDP re-answer from the client.

#### peerconnection.consumeIceRestart()
{: #webrtc-peerconnection-consumeIceRestart .code}

ICE restart just can be achieved by means of generating a new SDP offer in the client side using `peerconnection.createOffer({ iceRestart: true })`.

This method is a no-op that allows the remote client restart its ICE machinery and sends a re-offer to **mediasoup**.

Returns a Promise that resolves to the local [RTCSessionDescription](#webrtc-RTCSessionDescription) instance of type "answer" to be delivered to the remote client.

</section>


### Events
{: #webrtc-RTCPeerConnection-events}

The `RTCPeerConnection` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### peerconnection.on("close", fn(error))
{: #webrtc-peerconnection-on-close .code}

Emitted when the `peerconnection` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### peerconnection.on("signalingstatechange", fn())
{: #webrtc-peerconnection-on-signalingstatechange .code}

Emitted when the [signalingState](#webrtc-peerconnection-signalingState) of the `peerconnection` changes.

#### peerconnection.on("negotiationneeded", fn())
{: #webrtc-peerconnection-on-negotiationneeded .code}

Emitted when the `room` changes (a new `peer` joins it, a `peer` leaves it, or an existing `peer` modifies its sending media description).

When "negotiationneeded" is fired on a `peerconnection`, the application should retrieve its updated local [RTCSessionDescription](#webrtc-RTCSessionDescription) (by means of `createOffer()` and `setLocalDescription()`) and send it to the associated endpoint.

</section>
