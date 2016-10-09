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


### Methods
{: #webrtc-RTCPeerConnection-methods}

*TODO*


### Events
{: #webrtc-RTCPeerConnection-events}

*TODO*
