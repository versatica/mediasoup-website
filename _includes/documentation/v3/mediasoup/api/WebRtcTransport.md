## WebRtcTransport
{: #WebRtcTransport}

<section markdown="1">

A WebRTC transport represents a network path established by both, a WebRTC endpoint and mediasoup, via ICE and DTLS. A WebRTC transport may be used for receiving media, for sending media or for receiving and sending, there is no limitation in mediasoup. However, due their design, mediasoup-client and libmediasoupclient require separate WebRTC transports for sending and receiving media.

<div markdown="1" class="note">
mediasoup is a [ICE Lite](https://tools.ietf.org/html/rfc5245#section-2.7) implementation, meaning that it does not initiate ICE connections but expect ICE Binding Requests sent by remote peers.
</div>

</section>


### Dictionaries
{: #WebRtcTransport-dictionaries}

<section markdown="1">

#### WebRtcTransportOptions
{: #WebRtcTransport-Options .code}

<div markdown="1" class="table-wrapper L3">

Field        | Type    | Description   | Required | Default
------------ | ------- | ------------- | -------- | ---------
`listenIps` | Array&lt;[TransportListenIp](#Transport-ListenIp)&gt;\|[TransportListenIp](#Transport-ListenIp)\|String| Listening IP or IPs in order of preference. | Yes |
`enableUdp` | Boolean | Listen in UDP. | No | `true`
`enableTcp` | Boolean | Listen in TCP. | No | `false`
`preferUdp` | Boolean | Listen in UDP. | No | `false`
`preferTcp` | Boolean | Listen in TCP. | No | `false`
`appData`   | Object  | Custom application data. | No | `{}`

</div>

#### IceParameters
{: #WebRtcTransport-IceParameters .code}

<div markdown="1" class="table-wrapper L3">

Field               | Type    | Description   | Required | Default
------------------- | ------- | ------------- | -------- | ---------
`usernameFragment`  | String  | ICE username fragment. | No |
`password`          | String  | ICE password. | No |
`iceLite`           | Boolean | ICE Lite.     | No |

</div>

#### IceCandidate
{: #WebRtcTransport-IceCandidate .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`foundation`       | String  | Unique identifier that allows ICE to correlate candidates that appear on multiple `transports`. | Yes |
`priority`         | Number | The assigned priority of the candidate. | Yes |
`ip`               | String  | The IP address of the candidate. | Yes |
`protocol`         | String  | The protocol of the candidate ("udp" / "tcp"). | Yes |
`port`             | Number | The port for the candidate. | Yes |
`type`             | String  | The type of candidate (always "host"). | Yes |
`tcpType`          | String  | The type of TCP candidate (always "passive"). | No |

</div>

#### IceSelectedTuple
{: #WebRtcTransport-IceSelectedTuple .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`localIP`          | String  | Local IP of the tuple. | Yes |
`localPort`        | Number | Local port of the tuple. | Yes |
`remoteIP`         | String  | Remote IP of the tuple. | Yes |
`remotePort`       | Number | Remote port of the tuple. | Yes |
`protocol`         | String  | The protocol of the tuple ("udp" / "tcp"). | Yes |

</div>

#### LocalDtlsParameters
{: #WebRtcTransport-LocalDtlsParameters .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`role`          | [DtlsRole](#WebRtcTransport-DtlsRole) | Local DTLS role. | No | "auto"
`fingerprints`  | [LocalDtlsFingerprints](#WebRtcTransport-LocalDtlsFingerprints) | Local DTLS fingerprints. | Yes |

</div>

#### LocalDtlsFingerprints
{: #WebRtcTransport-LocalDtlsFingerprints .code}

Map of DTLS algorithms (as defined in the "Hash function Textual Names" registry initially specified in [RFC 4572](https://tools.ietf.org/html/rfc4572#section-8) Section 8) and their corresponding certificate fingerprint values (in lowercase hex string as expressed utilizing the syntax of "fingerprint" in [RFC 4572](https://tools.ietf.org/html/rfc4572#section-5) Section 5).

<div markdown="1" class="table-wrapper L3">

Field             | Type    | Description   | Required | Default
----------------- | ------- | ------------- | -------- | ---------
`sha-1`           | String  | SHA-1 certificate fingerprint. | Yes |
`sha-224`         | String  | SHA-224 certificate fingerprint. | Yes |
`sha-256`         | String  | SHA-256 certificate fingerprint. | Yes |
`sha-384`         | String  | SHA-384 certificate fingerprint. | Yes |
`sha-512`         | String  | SHA-512 certificate fingerprint. | Yes |

</div>

#### RemoteDtlsParameters
{: #WebRtcTransport-RemoteDtlsParameters .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`role`          | [DtlsRole](#WebRtcTransport-DtlsRole) | Remote DTLS role. | No | "auto"
`fingerprint`   | [RemoteDtlsFingerprint](#WebRtcTransport-RemoteDtlsFingerprint) | Remote DTLS fingerprint. | Yes |

</div>

#### RemoteDtlsFingerprint
{: #WebRtcTransport-RemoteDtlsFingerprint .code}

**TODO: NO**

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`algorithm`     | String  | Hash function algorithm ("sha-1" / "sha-224" / "sha-256" / "sha-384" / "sha-512"). | Yes |
`value`         | String  | Certificate fingerprint in lowercase hex. | Yes |

</div>

</section>


### Enums
{: #WebRtcTransport-enums}

<section markdown="1">

#### IceState
{: #WebRtcTransport-IceState .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"new"          | No ICE Binding Requests have been received yet.
"connected"    | Valid ICE Binding Request have been received, but none with USE-CANDIDATE attribute. Outgoing media is allowed.
"completed"    | ICE Binding Request with USE_CANDIDATE attribute has been received. Media in both directions is now allowed.
"disconnected" | ICE was "connected" or "completed" but it has suddenly failed (currently this can just happen if the selected tuple has "tcp" protocol).
"closed"       | ICE state when the `transport` has been closed.

</div>

#### DtlsRole
{: #WebRtcTransport-DtlsRole .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"auto"         | The DTLS role is determined based on the resolved ICE role (the "controlled" role acts as DTLS client, the "controlling" role acts as DTLS server"). Since mediasoup is a ICE Lite implementation it always behaves as ICE "controlled".
"client"       | DTLS client role.
"server"       | DTLS server role.

</div>

#### DtlsState
{: #WebRtcTransport-DtlsState .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"new"          | DTLS procedures not yet initiated.
"connecting"   | DTLS connecting.
"connected"    | DTLS successfully connected (SRTP keys already extracted).
"failed"       | DTLS connection failed.
"closed"       | DTLS state when the `transport` has been closed.

</div>

</section>


### Properties
{: #WebRtcTransport-properties}

<section markdown="1">

#### webrtcTransport.id
{: #webrtcTransport-id .code}

* Read only

Unique identifier (Number).

#### webrtcTransport.closed
{: #webrtcTransport-closed .code}

* Read only

A Boolean indicating whether the `webrtcTransport` has been closed.

#### webrtcTransport.appData
{: #webrtcTransport-appData .code}

* Read-write

Custom data set by the application. When the `webrtcTransport` is created via the [mediasoup protocol](/documentation/v2/mediasoup-protocol/), the `appData` is filled with the corresponding field in the `createTransport` request.

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

Local [IceParameters](#WebRtcTransport-IceParameters) of the `webrtcTransport`.

#### webrtcTransport.iceLocalCandidates
{: #webrtcTransport-iceLocalCandidates .code}

* Read only

Sequence of local [IceCandidate](#WebRtcTransport-IceCandidate) Objects associated to this `webrtcTransport`.

#### webrtcTransport.iceState
{: #webrtcTransport-iceState .code}

* Read only

The current [IceState](#WebRtcTransport-IceState) of the `webrtcTransport`.

#### webrtcTransport.iceSelectedTuple
{: #webrtcTransport-iceSelectedTuple .code}

* Read only

The selected [IceSelectedTuple](#WebRtcTransport-IceSelectedTuple) indicating information about the selected ICE candidate pair.

It is `undefined` if ICE is not yet established (no working candidate pair was found).

#### webrtcTransport.dtlsLocalParameters
{: #webrtcTransport-dtlsLocalParameters .code}

* Read only

[LocalDtlsParameters](#WebRtcTransport-LocalDtlsParameters) of the `webrtcTransport`.

#### webrtcTransport.dtlsState
{: #webrtcTransport-dtlsState .code}

* Read only

The current [DtlsState](#WebRtcTransport-DtlsState) of the `webrtcTransport`.

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
`bitrate`  | Number | Maximum sending bitrate in `bps`. | Yes | 0 (no limit)

</div>

<div markdown="1" class="note warn">
This method can just be called on open `webrtcTransports` with `direction: "send"` (it will throw otherwise).
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
Check the [RTC stats](/documentation/v2/rtc-stats/) section for more details.
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

</section>


### Events
{: #WebRtcTransport-events}

The `WebRtcTransport` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### webrtcTransport.on("close", fn(originator, appData))
{: #webrtcTransport-on-close .code}

Emitted when the `webrtcTransport` is closed.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### webrtcTransport.on("iceselectedtuplechange", fn(iceSelectedTuple))
{: #webrtcTransport-on-iceselectedtuplechange .code}

Emitted when the ICE selected tuple changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`iceSelectedTuple`| [IceSelectedTuple](#WebRtcTransport-IceSelectedTuple) | The new ICE selected tuple.

</div>

#### webrtcTransport.on("icestatechange", fn(iceState))
{: #webrtcTransport-on-icestatechange .code}

Emitted when the ICE state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`iceState`        | [IceState](#WebRtcTransport-IceState) | The new ICE state.

</div>

#### webrtcTransport.on("dtlsstatechange", fn(dtlsState))
{: #webrtcTransport-on-dtlsstatechange .code}

Emitted when the DTLS state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`dtlsState`       | [DtlsState](#WebRtcTransport-DtlsState) | The new DTLS state.

</div>

</section>
