## WebRtcTransport
{: #WebRtcTransport}

A `webrtcTransport` represents a network path negotiated by both, **mediasoup-client** and **mediasoup**, via ICE and DTLS.

For more information, check the [Glossary](/documentation/glossary#Glossary-Transport) section.

<div markdown="1" class="note">

**mediasoup** is a [ICE Lite](https://tools.ietf.org/html/rfc5245#section-2.7) implementation, meaning that it will never initiate ICE connections but expect ICE Binding Requests on its open ports.

</div>


### Dictionaries
{: #WebRtcTransport-dictionaries}

<section markdown="1">

#### MirroringOptions
{: #WebRtcTransport-MirroringOptions .code}

<div markdown="1" class="table-wrapper L3">

Field        | Type    | Description   | Required | Default
------------ | ------- | ------------- | -------- | ---------
`remoteIP`   | String  | Destination IP. | Yes |
`remotePort` | Integer | Destination port. | Yes |
`sendRtp`    | Boolean | Whether RTP sent to the client must be mirrored.     | No | `false`
`sendRtcp`   | Boolean | Whether RTCP sent to the client must be mirrored.     | No | `false`
`recvRtp`    | Boolean | Whether RTP received from the client must be mirrored.     | No | `false`
`recvRtcp`   | Boolean | Whether RTCP received from the client must be mirrored.     | No | `false`

</div>

</section>


### Properties
{: #WebRtcTransport-properties}

<section markdown="1">

#### webrtcTransport.id
{: #webrtcTransport-id .code}

* Read only

Unique identifier (Integer).

#### webrtcTransport.closed
{: #webrtcTransport-closed .code}

* Read only

A Boolean indicating whether the `webrtcTransport` has been closed.

#### webrtcTransport.appData
{: #webrtcTransport-appData .code}

* Read-write

Custom data set by the application. When the `webrtcTransport` is created via the [mediasoup protocol](/documentation/mediasoup-protocol/), the `appData` is filled with the corresponding field in the `createTransport` request.

#### webrtcTransport.direction
{: #webrtcTransport-direction .code}

* Read only

A String ("send" or "recv") representing the direction of the media over this `webrtcTransport`.

#### webrtcTransport.iceRole
{: #webrtcTransport-iceRole .code}

* Read only

String indicating the ICE role of the `webrtcTransport`. Due to the ICE Lite design, this is always "controlled".

#### webrtcTransport.iceLocalParameters
{: #webrtcTransport-iceLocalParameters .code}

* Read only

Local [IceParameters](#Transport-IceParameters) of the `webrtcTransport`.

#### webrtcTransport.iceLocalCandidates
{: #webrtcTransport-iceLocalCandidates .code}

* Read only

Sequence of local [IceCandidate](#Transport-IceCandidate) Objects associated to this `webrtcTransport`.

#### webrtcTransport.iceState
{: #webrtcTransport-iceState .code}

* Read only

The current [IceState](#Transport-IceState) of the `webrtcTransport`.

#### webrtcTransport.iceSelectedTuple
{: #webrtcTransport-iceSelectedTuple .code}

* Read only

The selected [IceSelectedTuple](#Transport-IceSelectedTuple) indicating information about the selected ICE candidate pair.

It is `undefined` if ICE is not yet established (no working candidate pair was found).

#### webrtcTransport.dtlsLocalParameters
{: #webrtcTransport-dtlsLocalParameters .code}

* Read only

[LocalDtlsParameters](#Transport-LocalDtlsParameters) of the `webrtcTransport`.

#### webrtcTransport.dtlsState
{: #webrtcTransport-dtlsState .code}

* Read only

The current [DtlsState](#Transport-DtlsState) of the `webrtcTransport`.

#### webrtcTransport.dtlsRemoteCert
{: #webrtcTransport-dtlsRemoteCert .code}

* Read only

The remote certificate in PEM format (String). It is set once [`dtlsState`](#webrtcTransport-dtlsState) becomes "connected".

<div markdown="1" class="note">

The application may want to inspect the remote certificate for authorization purposes by using some certificates utility such as the Node [pem](https://github.com/andris9/pem) module.

</div>

</section>


### Methods
{: #WebRtcTransport-methods}

<section markdown="1">

#### webrtcTransport.close([appData])
{: #webrtcTransport-close .code}

Closes the `webrtcTransport` and triggers a [`close`](#webrtcTransport-on-close) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### webrtcTransport.setMaxBitrate(bitrate)
{: #webrtcTransport-setMaxBitrate .code}

Set maximum bitrate for media streams sent by the remote endpoint over this `webrtcTransport`. Returns a Promise that resolves to this `webrtcTransport`. 

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`bitrate`  | Integer | Maximum sending bitrate in `bps`. | Yes | 0 (no limit)

</div>

<div markdown="1" class="note warn">
This method can just be called on open `webrtcTransports` with  `direction: "send"` (it will throw otherwise).
</div>

Usage example:

```javascript
peer.on('newtransport', (webrtcTransport) =>
{
  if (webrtcTransport.direction === 'send')
    webrtcTransport.setMaxBitrate(250000);
});
```

#### webrtcTransport.getStats()
{: #webrtcTransport-getStats .code}

Returns a Promise resolving to an array of Objects containing RTC stats related to the `webrtcTransport`.

<div markdown="1" class="note">
Check the [RTC stats](/documentation/rtc-stats/) section for more details.
</div>

#### webrtcTransport.startMirroring(options)
{: #webrtcTransport-startMirroring .code}

Enables RTP/RTCP mirroring. The selected RTP/RTCP over this `webrtcTransport` will be sent to the given address (see `options`).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`options`  | [MirroringOptions](#WebRtcTransport-MirroringOptions) | Options. | Yes |

</div>

#### webrtcTransport.stopMirroring()
{: #webrtcTransport-stopMirroring .code}

Stops RTP/RTCP mirroring.

</div>

</section>


### Events
{: #WebRtcTransport-events}

The `WebRtcTransport` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### webrtcTransport.on("close", fn(direction, appData))
{: #webrtcTransport-on-close .code}

Emitted when the `webrtcTransport` is closed.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`direction` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### webrtcTransport.on("iceselectedtuplechange", fn(iceSelectedTuple))
{: #webrtcTransport-on-iceselectedtuplechange .code}

Emitted when the ICE selected tuple changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`iceSelectedTuple`| [IceSelectedTuple](#Transport-IceSelectedTuple) | The new ICE selected tuple.

</div>

#### webrtcTransport.on("icestatechange", fn(iceState))
{: #webrtcTransport-on-icestatechange .code}

Emitted when the ICE state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`iceState`        | [IceState](#Transport-IceState) | The new ICE state.

</div>

#### webrtcTransport.on("dtlsstatechange", fn(dtlsState))
{: #webrtcTransport-on-dtlsstatechange .code}

Emitted when the DTLS state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`dtlsState`       | [DtlsState](#Transport-DtlsState) | The new DTLS state.

</div>

</section>
