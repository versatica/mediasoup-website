## RtpReceiver
{: #RtpReceiver}

A `rtpReceiver` describes a media stream (track) of audio or video sent by a remote media endpoint and received by the corresponding [Peer](#Peer) instance in **mediasoup**.

The `RtpReceiver` instance is created by means of [`peer.RtpReceiver()`](#peer-RtpReceiver).

<div markdown="1" class="note">
In the context of WebRTC 1.0, a `RTCPeerConnection` calling `addStream()` with an audio+video `MediaStream` will require two `rtpReceivers` in its associated [Peer](#Peer) instance in **mediasoup**.
</div>


### Dictionaries
{: #RtpReceiver-dictionaries}

<section markdown="1">

#### RtpObject
{: #RtpReceiver-RtpObject .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`payloadType`            | Integer | RTP payload type. | Yes  |
`marker`                 | Boolean | RTP marker field. | Yes  |
`sequenceNumber`         | Integer | RTP sequence number. | Yes  |
`timestamp`              | Integer | RTP timestamp. | Yes  |
`ssrc`                   | Integer | RTP SSRC. | Yes  |
`payload`                | [Buffer](https://nodejs.org/api/buffer.html) | RTP binary payload. | Yes  |

</div>

</section>


### Properties
{: #RtpReceiver-properties}

<section markdown="1">

#### rtpReceiver.id
{: #rtpReceiver-id .code}

* Read only

Unique identifier (number).

#### rtpReceiver.closed
{: #rtpReceiver-closed .code}

* Read only

A Boolean indicating whether the `rtpReceiver` has been closed.

#### rtpReceiver.kind
{: #rtpReceiver-kind .code}

* Read only

The [MediaKind](#RtpDictionaries-MediaKind) handled by the `rtpReceiver`.

#### rtpReceiver.peer
{: #rtpReceiver-peer .code}

* Read only

The [Peer](#Peer) instance owner of this `rtpReceiver`.

#### rtpReceiver.transport
{: #rtpReceiver-transport .code}

* Read only

The [Transport](#Transport) assigned to this `rtpReceiver`.

#### rtpReceiver.rtpParameters
{: #rtpReceiver-rtpParameters .code}

* Read only

The effective [RtpParameters](#RtpDictionaries-RtpParameters) of the `rtpReceiver`. It is filled once [`rtpReceiver.receive()`](#rtpReceiver-receive) is called and its Promise resolved.

</section>


### Methods
{: #RtpReceiver-methods}

<section markdown="1">

#### rtpReceiver.close()
{: #rtpReceiver-close .code}

Closes the `rtpReceiver` and triggers a [`close`](#rtpReceiver-on-close) event.

#### rtpReceiver.dump()
{: #rtpReceiver-dump .code}

#### rtpReceiver.receive(rtpParameters)
{: #rtpReceiver-receive .code}

Set remote RTP parameters. Returns a Promise that resolves to this `rtpReceiver`. If something goes wrong the Promise is rejected with the corresponding `Error` object.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`rtpParameters` | [RtpParameters](#RtpDictionaries-RtpParameters) | Remote RTP parameters. | Yes |

</div>

#### rtpReceiver.setTransport(transport)
{: #rtpReceiver-setTransport .code}

Set a new [Transport](#Transport). Returns a Promise that resolves to this `rtpReceiver`. If something goes wrong the Promise is rejected with the corresponding `Error` object.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`transport` | [Transport](#Transport) | New `transport`. | Yes |

</div>

</section>


### Events
{: #RtpReceiver-events}

The `RtpReceiver` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### rtpReceiver.on("close", fn(error))
{: #rtpReceiver-on-close .code}

Emitted when the `rtpReceiver` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### rtpReceiver.on("parameters", fn(rtpParameters))
{: #rtpReceiver-on-parameters .code}

Fired after calling [`receive()`](#rtpReceiver-receive) for the first time.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`rtpParameters` | [RtpParameters](#RtpDictionaries-RtpParameters) | New effective RTP parameters.

</div>

#### rtpReceiver.on("parameterschange", fn(rtpParameters))
{: #rtpReceiver-on-parameterschange .code}

Fired after calling [`receive()`](#rtpReceiver-receive) with new RTP parameters.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`rtpParameters` | [RtpParameters](#RtpDictionaries-RtpParameters) | New effective RTP parameters.

</div>

#### rtpReceiver.on("transport", fn(transport))
{: #rtpReceiver-on-transport .code}

Emitted when a `transport` is assigned via [`setTransport()`](#rtpReceiver-setTransport).

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`transport` | [Transport](#Transport) | New assigned `transport`.

</div>

#### rtpReceiver.on("rtpraw", fn(packet))
{: #rtpReceiver-on-rtpraw .code}

Emitted for each valid RTP packet received by this `rtpReceiver`.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`packet` | [Buffer](https://nodejs.org/api/buffer.html) | Full RTP packet in binary/raw format.

</div>

#### rtpReceiver.on("rtpobject", fn(packet))
{: #rtpReceiver-on-rtpobject .code}

Emitted for each valid RTP packet received by this `rtpReceiver`.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`packet` | [RtpObject](#RtpReceiver-RtpObject) | Parsed RTP packet.

</div>

</section>
