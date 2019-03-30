## WebRtcTransport
{: #WebRtcTransport}

<section markdown="1">

A WebRTC transport represents a network path established by both, a WebRTC endpoint and mediasoup, via ICE and DTLS. A WebRTC transport may be used to receive media, to send media or to both receive and send. There is no limitation in mediasoup. However, due to their design, mediasoup-client and libmediasoupclient require separate WebRTC transports for sending and receiving.

> `@inherits` [Transport](#Transport)

<div markdown="1" class="note">
The WebRTC transport implementation of mediasoup is [ICE Lite](https://tools.ietf.org/html/rfc5245#section-2.7), meaning that it does not initiate ICE connections but expects ICE Binding Requests from endpoints.
</div>

</section>


### Dictionaries
{: #WebRtcTransport-dictionaries}

<section markdown="1">

#### WebRtcTransportOptions
{: #WebRtcTransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field        | Type    | Description   | Required | Default
------------ | ------- | ------------- | -------- | ---------
`listenIps` | Array&lt;[TransportListenIp](#TransportListenIp)&gt;\|[TransportListenIp](#TransportListenIp)\|String| Listening IP address or addresses in order of preference (first one is the preferred one). | Yes |
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

#### DtlsParameters
{: #WebRtcTransport-DtlsParameters .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`role`          | [DtlsRole](#WebRtcTransport-DtlsRole) | DTLS role. | No | "auto"
`fingerprints`  | [DtlsFingerprints](#WebRtcTransport-DtlsFingerprints) | DTLS fingerprints. | Yes |

</div>

#### DtlsFingerprints
{: #WebRtcTransport-DtlsFingerprints .code}

Map of DTLS algorithms (as defined in the "Hash function Textual Names" registry initially specified in [RFC 4572](https://tools.ietf.org/html/rfc4572#section-8) Section 8) and their corresponding certificate fingerprint values (in lowercase hex string as expressed utilizing the syntax of "fingerprint" in [RFC 4572](https://tools.ietf.org/html/rfc4572#section-5) Section 5).

<div markdown="1" class="table-wrapper L3">

Field             | Type    | Description   | Required | Default
----------------- | ------- | ------------- | -------- | ---------
`sha-1`           | String  | SHA-1 certificate fingerprint.   | No |
`sha-224`         | String  | SHA-224 certificate fingerprint. | No |
`sha-256`         | String  | SHA-256 certificate fingerprint. | No |
`sha-384`         | String  | SHA-384 certificate fingerprint. | No |
`sha-512`         | String  | SHA-512 certificate fingerprint. | No |

</div>

#### RemoteDtlsParameters
{: #WebRtcTransport-RemoteDtlsParameters .code}

**TODO: NO**

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
"disconnected" | ICE was "connected" or "completed" but it has suddenly failed (this can just happen if the selected tuple has "tcp" protocol).
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

See [transport.id](#transport-id).

#### webrtcTransport.closed
{: #webrtcTransport-closed .code}

See [transport.closed](#transport-closed).

#### webrtcTransport.appData
{: #webrtcTransport-appData .code}

See [transport.appData](#transport-appData).

#### webrtcTransport.iceRole
{: #webrtcTransport-iceRole .code}

Local ICE role. Due to the mediasoup ICE Lite design, this is always "controlled".

> `@type` String, read only

#### webrtcTransport.iceParameters
{: #webrtcTransport-iceParameters .code}

Local ICE parameters.

> `@type` [IceParameters](#WebRtcTransport-IceParameters), read only


#### webrtcTransport.iceCandidates
{: #webrtcTransport-iceCandidates .code}

Local ICE candidates.

> `@type` Array&lt;[IceCandidate](#WebRtcTransport-IceCandidate)&gt;, read only

#### webrtcTransport.iceState
{: #webrtcTransport-iceState .code}

Current ICE state.

> `@type` [IceState](#WebRtcTransport-IceState), read only

#### webrtcTransport.iceSelectedTuple
{: #webrtcTransport-iceSelectedTuple .code}

The selected transport tuple if ICE is in "connected" or "completed" state. It is `undefined` if ICE is not yet established (no working candidate pair was found).

> `@type` [TransportTuple](#TransportTuple), read only

#### webrtcTransport.dtlsParameters
{: #webrtcTransport-dtlsParameters .code}

Local DTLS parameters.

> `@type` [DtlsParameters](#WebRtcTransport-DtlsParameters), read only

#### webrtcTransport.dtlsState
{: #webrtcTransport-dtlsState .code}

Current DTLS state.

> `@type` [DtlsState](#WebRtcTransport-DtlsState), read only

#### webrtcTransport.dtlsRemoteCert
{: #webrtcTransport-dtlsRemoteCert .code}

The remote certificate in PEM format. It is set once [`dtlsState`](#webrtcTransport-dtlsState) becomes "connected".

> `@type` String, read only

<div markdown="1" class="note">

The application may want to inspect the remote certificate for authorization purposes by using some certificates utility such as the Node [pem](https://www.npmjs.com/package/pem) module.

</div>

#### webrtcTransport.observer
{: #webrtcTransport-observer .code}

See the [Observer Events](#WebRtcTransport-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #WebRtcTransport-methods}

<section markdown="1">

#### webrtcTransport.close()
{: #webrtcTransport-close .code}

See [transport.close()](#transport-close).

#### webrtcTransport.getStats()
{: #webrtcTransport-getStats .code}

Returns current RTC statistics of the WebRTC transport.

> `@async`
> 
> `@overrides`
> 
> `@returns` Array&lt;[RTCStats](https://www.w3.org/TR/webrtc/#dom-rtcstats)&gt;

*TODO:* Write an output example.

#### webrtcTransport.connect({ dtlsParameters })
{: #webrtcTransport-connect .code}

Provides the WebRTC transport with the remote endpoint parameters.

<div markdown="1" class="table-wrapper L3">

Argument         | Type    | Description | Required | Default 
---------------- | ------- | ----------- | -------- | ----------
`dtlsParameters` | [DtlsParameters](#WebRtcTransport-DtlsParameters) | Remote DTLS parameters. | Yes |

</div>

> `@async`
> 
> `@abstract`

```javascript
await transport.connect(
  {
    dtlsParameters :
    {
      role         : "server",
      fingerprints :
      [
        {
          algorithm : "sha-256",
          value     : "E5:F5:CA:A7:2D:93:E6:16:AC:21:09:9F:23:51:62:8C:D0:66:E9:0C:22:54:2B:82:0C:DF:E0:C5:2C:7E:CD:53"
        }
      ]
    }
  });
```

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
peer.on("newtransport", (webrtcTransport) =>
{
  if (webrtcTransport.direction === "send")
    webrtcTransport.setMaxBitrate(250000);
});
```

#### webrtcTransport.getStats()
{: #webrtcTransport-getStats .code}

Returns a Promise resolving to an array of Objects containing RTC stats related to the `webrtcTransport`.

<div markdown="1" class="note">
Check the [RTC stats](/documentation/v2/rtc-stats/) section for more details.
</div>

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
`iceSelectedTuple`| [TransportTuple](#TransportTuple) | The new ICE selected tuple.

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
