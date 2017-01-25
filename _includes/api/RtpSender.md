## RtpSender
{: #RtpSender}

A `rtpSender` describes a media stream (track) of audio or video to be sent to a remote media endpoint by the corresponding [Peer](#Peer) instance in **mediasoup**.

A `RtpSender` instance is created within the [`newrtpsender`](#peer-on-newrtpsender) event.



### Properties
{: #RtpSender-properties}

<section markdown="1">

#### rtpSender.closed
{: #rtpSender-closed .code}

* Read only

A Boolean indicating whether the `rtpSender` has been closed. This happens when the associated  `rtpReceiver` has been closed.

#### rtpSender.kind
{: #rtpSender-kind .code}

* Read only

The [MediaKind](#RtpDictionaries-MediaKind) handled by the `rtpSender`.

#### rtpSender.associatedPeer
{: #rtpSender-associatedPeer .code}

* Read only

The associated [Peer](#Peer) instance owner of the associated  `rtpReceiver`.

#### rtpSender.transport
{: #rtpSender-transport .code}

* Read only

The [Transport](#Transport) associated to the `rtpSender`.

#### rtpSender.rtpParameters
{: #rtpSender-rtpParameters .code}

* Read only

The [RtpParameters](#RtpDictionaries-RtpParameters) of the `rtpSender`. These parameters are a subset of the parameters in the corresponding `rtpReceiver` (limited by the capabilities of this `peer`).

#### rtpSender.available
{: #rtpSender-available .code}

* Read only

Boolean indicating whether the `peer` owning this `rtpSender` is capable of receiving the associated audio/video stream.

<div markdown="1" class="note">
If the capabilities of this `peer` do not support the codecs required by this `rtpSender` the `available` property becomes `false`.
</div>

</section>


### Methods
{: #RtpSender-methods}

<section markdown="1">

#### rtpSender.dump()
{: #rtpSender-dump .code}

For debugging purposes. Returns a Promise that resolves to an Object containing the `rtpSender` internals.

```json
{
  "rtpSenderId"   : 67138704,
  "kind"          : "audio",
  "rtpParameters" : {}
}
```

</section>


### Events
{: #RtpSender-events}

The `RtpSender` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### rtpSender.on("close", fn(error))
{: #rtpSender-on-close .code}

Emitted when the `rtpSender` is closed. In case of error, the callback is called with the corresponding `Error` object.

</section>
