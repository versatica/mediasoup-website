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

#### rtpReceiver.closed
{: #rtpReceiver-closed .code}

* Read only

A Boolean indicating whether the `rtpReceiver` has been closed.

#### rtpReceiver.kind
{: #rtpReceiver-kind .code}

* Read only

A String indicating the media kind ("audio" or "video") handled by the `rtpReceiver`.

#### rtpReceiver.rtpParameters
{: #rtpReceiver-rtpParameters .code}

* Read only

The [RtpParameters](#RtpReceiver-RtpParameters) of the `rtpReceiver`. It is filled once [`rtpReceiver.receive()`](#rtpReceiver-receive) is called and its Promise resolved.

#### rtpReceiver.transport
{: #rtpReceiver-transport .code}

* Read only

The [Transport](#Transport) associated to the `rtpReceiver`.

#### rtpReceiver.listenForRtpMode
{: #rtpReceiver-listenForRtpMode .code}

* Read/Write

Enables or disables the [`rtp`](#rtpReceiver-on-rtp) event for RTP packets received by this `rtpReceiver`. By enabling it, RTP packets will reach JavaScript land.

<div markdown="1" class="table-wrapper L2">

Value      | Description
---------- | --------------
"raw"      | Enables retrieval of RTP packets in raw format ([Buffer](https://nodejs.org/api/buffer.html) object).
"object"   | Enables retrieval of RTP packets in [RtpObject](#RtpReceiver-RtpObject) format.
`null`     | Disabled retrieval of RTP packets.

</div>

Usage example:

```javascript
rtpReceiver.listenForRtpMode = "raw";
rtpReceiver.listenForRtpMode = "object";
rtpReceiver.listenForRtpMode = null;
```

</section>


### Methods
{: #RtpReceiver-methods}

<section markdown="1">

#### rtpReceiver.close()
{: #rtpReceiver-close .code}

Closes the `rtpReceiver` and triggers a [`close`](#rtpReceiver-on-close) event.

#### rtpReceiver.dump()
{: #rtpReceiver-dump .code}

For debugging purposes. Returns a Promise that resolves to an Object containing the current status and details of the `rtpReceiver`.

*TBD:* Document it.

#### rtpReceiver.isRtpReceiver()
{: #rtpReceiver-isRtpReceiver .code}

Returns `true`.

#### rtpReceiver.isRtpSender()
{: #rtpReceiver-isRtpSender .code}

Returns `false`.

#### rtpReceiver.receive(rtpParameters)
{: #rtpReceiver-receive .code}

Set remote RTP parameters. Returns a Promise that resolves to this `rtpReceiver`. If something goes wrong the Promise is rejected with the corresponding `Error` object.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`rtpParameters` | [RtpParameters](#RTP-RtpParameters) | Remote RTP parameters. | Yes |

</div>

</section>


### Events
{: #RtpReceiver-events}

The `RtpReceiver` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### rtpReceiver.on("close", fn(error))
{: #rtpReceiver-on-close .code}

Emitted when the `rtpReceiver` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### rtpReceiver.on("rtp", fn(packet))
{: #rtpReceiver-on-rtp .code}

Emitted for each received RTP packet if [`listenForRtpMode`](#rtpReceiver-listenForRtpMode) is "raw" or "object".

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`packet` | [Buffer](https://nodejs.org/api/buffer.html)\|[RtpObject](#RtpReceiver-RtpObject) | RTP packet in raw or parsed format, depending on the [`listenForRtpMode`](#rtpReceiver-listenForRtpMode) mode.

</div>

</section>
