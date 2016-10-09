## webrtc.RTCPeerConnection
{: #webrtc-RTCPeerConnection}

Internally, a `peerconnection` manages a [Peer](#Peer) instance and all its associated [Transport](#Transport), [RtpReceiver](#RtpReceiver) and [RtpSender](#RtpSender) instances.


### Dictionaries
{: #webrtc-RTCPeerConnection-dictionaries}

<section markdown="1">

#### RTCPeerConnectionOptions
{: #webrtc-RTCPeerConnection-RTCPeerConnectionOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`transportOptions`       | [TransportOptions](#Transport-TransportOptions) | Options for the transport. | No |
`usePlanB`               | Boolean | Expect and generate [Plan B](https://tools.ietf.org/html/draft-uberti-rtcweb-plan-00) SDPs for this `peerconnection`. | No | `false`
`bandwidth`              | [BandwidthOptions](#webrtc-RTCPeerConnection-BandwidthOptions) | Bandwidth limit. | No |

</div>

<div markdown="1" class="note">

Chrome/Chromium browser does not yet implement [Unified Plan](https://tools.ietf.org/html/draft-roach-mmusic-unified-plan-00) (see open [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=465349)) and, hence, setting `usePlanB` to `true` is required for Chrome/Chromium based endpoints.

In the other side, latest versions of Firefox do implement "Unified Plan", so `usePlanB` must be `false` (or unset) for endpoints running Firefox.

</div>

#### BandwidthOptions
{: #webrtc-RTCPeerConnection-BandwidthOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`audio`                  | Integer | Audio bandwhich limit in kilobits per second. | No | Unset
`video`                  | Integer | Video bandwhich limit in kilobits per second. | No | Unset

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
`room`     | [Room](#Room) | Room instance | Yes |
`name`     | String  | Peer name. | Yes |
`options`  | [RTCPeerConnectionOptions](#webrtc-RTCPeerConnection-RTCPeerConnectionOptions) | RTCPeerConnection options. | No |

</div>

</section>


### Properties
{: #webrtc-RTCPeerConnection-properties}

<section markdown="1">

#### peerconnection.closed
{: #webrtc-peerconnection-closed .code}

* Read only

A Boolean indicating whether the `peerconnection` has been closed.

#### peerconnection.peer
{: #webrtc-peerconnection-peer .code}

* Read only

Retrieves the internal [Peer](#Peer) instance associated to this `peerconnection`.

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

#### peerconnection.createOffer()
{: #webrtc-peerconnection-createOffer .code}

Generates a blob of SDP that contains an RFC 3264 offer with the supported configurations for the session, including descriptions of the internal [Transport](#Transport), [RtpReceiver](#RtpReceiver) and [RtpSender](#RtpSender) instances attached to this `peerconnection`, the RTP parameters supported by both the `room` and the remote endpoint, and local ICE candidates.

Returns a Promise that resolves to a local [RTCSessionDescription](#webrtc-RTCSessionDescription) instance of type "offer".

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

Currently, the **mediasoup** implementation of `RTCPeerConnection` requires that the initial offer comes from the remote endpoint, which means that `setRemoteDescription()` MUST be called before `createOffer()`.

There is another limitation: the current implementation does not support re-negotiation if initiated by the remote endpoint. This is, `setRemoteDescription()` can just be called once if the provided [RTCSessionDescription](#webrtc-RTCSessionDescription) has type "offer".

Due to these limitations, the first SDP offer received from the endpoint should include all the media (audio and/or video) tracks, given that they can not be added later.

</div>

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
