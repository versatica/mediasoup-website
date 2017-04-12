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

The [Peer](#Peer) instance owner of this `rtpSender`.

#### rtpSender.transport
{: #rtpSender-transport .code}

* Read only

The [Transport](#Transport) associated to the `rtpSender`.

#### rtpSender.rtpParameters
{: #rtpSender-rtpParameters .code}

* Read only

The [RtpParameters](#RtpDictionaries-RtpParameters) of the `rtpSender`. These parameters are a subset of the parameters in the corresponding `rtpReceiver` (limited by the capabilities of this `peer`).

#### rtpSender.associatedRtpReceiver
{: #rtpSender-associatedRtpReceiver .code}

* Read only

The associated [RtpReceiver](#RtpReceiver) instance.

#### rtpSender.active
{: #rtpSender-active .code}

* Read only

Boolean indicating whether the remote endpoint associated to this `rtpSender` is capable of receiving the associated audio/video stream.

<div markdown="1" class="note">
If the capabilities of the `peer` do not support the codecs required by this `rtpSender`, or the app called `disable()` or did not set a `transport`for this `rtpSender`, the `active` property becomes `false`.
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

#### rtpSender.disable()
{: #rtpSender-disable .code}

The `rtpSender` stops sending RTP to the remote endpoint. It may trigger an [`activechange`](#rtpSender-on-activechange) event.

#### rtpSender.enable()
{: #rtpSender-enable .code}

The `rtpSender` resumes sending RTP to the remote endpoint. It may trigger an [`activechange`](#rtpSender-on-activechange) event.

It has no effect if [`disable()`](##rtpSender-disable) was not called before.

</section>


### Events
{: #RtpSender-events}

The `RtpSender` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### rtpSender.on("close", fn(error))
{: #rtpSender-on-close .code}

Emitted when the `rtpSender` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### rtpSender.on("parameterschange", fn(rtpParameters, active))
{: #rtpSender-on-parameterschange .code}

Fired once the RTP parameters of this `rtpSender` change.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`rtpParameters` | [RtpParameters](#RtpDictionaries-RtpParameters) | New effective RTP parameters.
`active` | Boolean | Updated [`active`](#rtpSender-active) value.

</div>

#### rtpSender.on("activechange", fn(active))
{: #rtpSender-on-activechange .code}

Fired when the [`active`](#rtpSender-active) value changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`active` | Boolean | Updated [`active`](#rtpSender-active) value.

</div>

</section>
