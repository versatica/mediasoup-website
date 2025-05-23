## WebRtcTransport
{: #WebRtcTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A WebRTC transport represents a network path negotiated by both, a WebRTC endpoint and mediasoup, via ICE and DTLS procedures. A WebRTC transport may be used to receive media, to send media or to both receive and send. There is no limitation in mediasoup. However, due to their design, mediasoup-client and libmediasoupclient require separate WebRTC transports for sending and receiving.

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
`webRtcServer` | [WebRtcServer](#WebRtcServer) | Instead of opening its own listening port(s) let a WebRTC server handle the network traffic of this transport. | No |
`listenInfos` | Array&lt;[TransportListenInfo](#TransportListenInfo)&gt; | Listening information in order of preference (first one is the preferred one). | No |
`listenIps`  | Array&lt;[TransportListenIp](#TransportListenIp)\|String&gt; | Listening IP address or addresses in order of preference (first one is the preferred one). | No |
`port`       | Number  | Fixed port to listen on instead of selecting automatically from Worker's port range. | No |
`enableUdp`  | Boolean | Listen in UDP. | No | `true`
`enableTcp`  | Boolean | Listen in TCP. | No | `false`
`preferUdp`  | Boolean | Listen in UDP. | No | `false`
`preferTcp`  | Boolean | Listen in TCP. | No | `false`
`iceConsentTimeout` | Number | ICE consent timeout (in seconds). If 0 it is disabled. | No | 30
`initialAvailableOutgoingBitrate` | Number | Initial available outgoing bitrate (in bps). | No | 600000
`enableSctp` | Boolean | Create a SCTP association. | No | `false`
`numSctpStreams` | [NumSctpStreams](/documentation/v3/mediasoup/sctp-parameters/#NumSctpStreams) | SCTP streams number. | No |
`maxSctpMessageSize` | Number | Maximum allowed size for SCTP messages sent by `DataProducers`. | No | 262144
`sctpSendBufferSize` | Number | SCTP send buffer size used by usrsctp. | NO | 262144
`appData`    | [AppData](#AppData) | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
* `listenIps` is **DEPRECATED**. Use `listenInfos` instead.
* One of `webRtcServer` or `listenInfos` or `listenIps` must be given when creating a WebRTC transport.
* The IP in each entry in `listenInfos` or `listenIps` must be a bindable IP in the host.
* If you use "0.0.0.0" or "::" in an entry in `listenInfos` or `listenIps`, then you need to also provide `announcedAddress` or `announcedIp` in the corresponding entry.
* `initialAvailableOutgoingBitrate` is just applied when the consumer endpoint supports REMB or Transport-CC.
* `enableUdp`, `enableTcp`, `preferUdp` and `preferTcp` are only processed if `webRtcServer` is given, and they filter and define the priority of the ICE candidates available in the `webRtcServer`.
</div>


#### IceParameters
{: #WebRtcTransportIceParameters .code}

<div markdown="1" class="table-wrapper L3">

Field               | Type    | Description   | Required | Default
------------------- | ------- | ------------- | -------- | ---------
`usernameFragment`  | String  | ICE username fragment. | No |
`password`          | String  | ICE password. | No |
`iceLite`           | Boolean | ICE Lite.     | No |

</div>

#### IceCandidate
{: #WebRtcTransportIceCandidate .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`foundation`       | String  | Unique identifier that allows ICE to correlate candidates that appear on multiple `transports`. | Yes |
`priority`         | Number | The assigned priority of the candidate. | Yes |
`address`          | String  | The IP address or hostname of the candidate. | Yes |
`protocol`         | String  | The protocol of the candidate ("udp" / "tcp"). | Yes |
`port`             | Number | The port for the candidate. | Yes |
`type`             | String  | The type of candidate (always "host"). | Yes |
`tcpType`          | String  | The type of TCP candidate (always "passive"). | No |

</div>

#### DtlsParameters
{: #WebRtcTransportDtlsParameters .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`role`          | [DtlsRole](#WebRtcTransportDtlsRole) | DTLS role. | No | "auto"
`fingerprints`  | Array&lt;[DtlsFingerprint](#WebRtcTransportDtlsFingerprint)&gt; | DTLS fingerprints. | Yes |

</div>

#### DtlsFingerprint
{: #WebRtcTransportDtlsFingerprint .code}

The hash function algorithm (as defined in the "Hash function Textual Names" registry initially specified in [RFC 4572](https://tools.ietf.org/html/rfc4572#section-8) Section 8) and its corresponding certificate fingerprint value (in lowercase hex string as expressed utilizing the syntax of "fingerprint" in [RFC 4572](https://tools.ietf.org/html/rfc4572#section-5) Section 5).

<div markdown="1" class="table-wrapper L3">

Field       | Type    | Description   | Required | Default
----------- | ------- | ------------- | -------- | ---------
`algorithm` | String  | Hash function algorithm.   | Yes |
`value `    | String  | Certificate fingerprint value. | Yes |

</div>

</section>


### Enums
{: #WebRtcTransport-enums}

<section markdown="1">

#### IceState
{: #WebRtcTransportIceState .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"new"          | No ICE Binding Requests have been received yet.
"connected"    | Valid ICE Binding Request have been received, but none with USE-CANDIDATE attribute. Outgoing media is allowed.
"completed"    | ICE Binding Request with USE_CANDIDATE attribute has been received. Media in both directions is now allowed.
"disconnected" | ICE was "connected" or "completed" but it has suddenly failed. It happens if ICE Consent mechanism is enabled and it failed (client didn't send a consent for 30 seconds or the configured interval) or if the selected tuple has "tcp" protocol and it was disconnected.
"closed"       | ICE state when the `transport` has been closed.

</div>

#### DtlsRole
{: #WebRtcTransportDtlsRole .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"auto"         | The DTLS role is determined based on the resolved ICE role (the "controlled" role acts as DTLS client, the "controlling" role acts as DTLS server"). Since mediasoup is a ICE Lite implementation it always behaves as ICE "controlled".
"client"       | DTLS client role.
"server"       | DTLS server role.

</div>

#### DtlsState
{: #WebRtcTransportDtlsState .code}

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

See also [Transport Properties](#Transport-properties).

#### webRtcTransport.iceRole
{: #webRtcTransport-iceRole .code}

Local ICE role. Due to the mediasoup ICE Lite design, this is always "controlled".

> `@type` String, read only

#### webRtcTransport.iceParameters
{: #webRtcTransport-iceParameters .code}

Local ICE parameters.

> `@type` [IceParameters](#WebRtcTransportIceParameters), read only


#### webRtcTransport.iceCandidates
{: #webRtcTransport-iceCandidates .code}

Local ICE candidates.

> `@type` Array&lt;[IceCandidate](#WebRtcTransportIceCandidate)&gt;, read only

#### webRtcTransport.iceState
{: #webRtcTransport-iceState .code}

Current ICE state.

> `@type` [IceState](#WebRtcTransportIceState), read only

#### webRtcTransport.iceSelectedTuple
{: #webRtcTransport-iceSelectedTuple .code}

The selected transport tuple if ICE is in "connected" or "completed" state. It is `undefined` if ICE is not established (no working candidate pair was found).

> `@type` [TransportTuple](#TransportTuple), read only

#### webRtcTransport.dtlsParameters
{: #webRtcTransport-dtlsParameters .code}

Local DTLS parameters.

> `@type` [DtlsParameters](#WebRtcTransportDtlsParameters), read only

#### webRtcTransport.dtlsState
{: #webRtcTransport-dtlsState .code}

Current DTLS state.

> `@type` [DtlsState](#WebRtcTransportDtlsState), read only

#### webRtcTransport.dtlsRemoteCert
{: #webRtcTransport-dtlsRemoteCert .code}

The remote certificate in PEM format. It is set once the DTLS state becomes "connected".

> `@type` String, read only

<div markdown="1" class="note">
The application may want to inspect the remote certificate for authorization purposes by using some certificates utility such as the Node [pem](https://www.npmjs.com/package/pem) module.
</div>

#### webRtcTransport.sctpParameters
{: #webRtcTransport-sctpParameters .code}

Local SCTP parameters. Or `undefined` if SCTP is not enabled.

> `@type` [SctpParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpParameters), read only

#### webRtcTransport.sctpState
{: #webRtcTransport-sctpState .code}

Current SCTP state. Or `undefined` if SCTP is not enabled.

> `@type` [SctpState](#SctpState), read only

</section>


### Methods
{: #WebRtcTransport-methods}

<section markdown="1">

See also [Transport Methods](#Transport-methods).

#### webRtcTransport.getStats()
{: #webRtcTransport-getStats .code}

Returns current RTC statistics of the WebRTC transport.

> `@async`
> 
> `@override`
> 
> `@returns` Array&lt;ProducerStat&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### webRtcTransport.connect({ dtlsParameters })
{: #webRtcTransport-connect .code}

Provides the WebRTC transport with the endpoint parameters.

<div markdown="1" class="table-wrapper L3">

Argument         | Type    | Description | Required | Default 
---------------- | ------- | ----------- | -------- | ----------
`dtlsParameters` | [DtlsParameters](#WebRtcTransportDtlsParameters) | Remote DTLS parameters. | Yes |

</div>

> `@async`
> 
> `@overrides`

```javascript
await webRtcTransport.connect(
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

#### webRtcTransport.restartIce()
{: #webRtcTransport-restartIce .code}

Restarts the ICE layer by generating new local ICE parameters that must be signaled to the remote endpoint.

> `@async`
> 
> `@returns` [IceParameters](#WebRtcTransportIceParameters)

```javascript
const iceParameters = await webRtcTransport.restartIce();

// Send the new ICE parameters to the endpoint.
```

</section>


### Events
{: #WebRtcTransport-events}

<section markdown="1">

See also [Transport Events](#Transport-events).

#### webRtcTransport.on("icestatechange", fn(iceState))
{: #webRtcTransport-on-icestatechange .code}

Emitted when the transport ICE state changes.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`iceState` | [IceState](#WebRtcTransportIceState) | New ICE state.

</div>

<div markdown="1" class="note">
* This event will be emitted with `iceState: 'disconnected'` when ICE consent check fails (meaning that during the last 30 seconds the remote endpoind didn't send any ICE consent request, so probably network is down or the endpoint disconnected abruptly), and also when the remote endpoint was connected using TCP protocol and the TCP connection was closed. The application should close the transport when this happens since it's not recoverable.
</div>

```javascript
webRtcTransport.on("icestatechange", (iceState) =>
{
  console.log("ICE state changed to %s", iceState);
});
```

#### webRtcTransport.on("iceselectedtuplechange", fn(iceSelectedTuple))
{: #webRtcTransport-on-iceselectedtuplechange .code}

Emitted after ICE state becomes "completed" and when the ICE selected tuple changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`iceSelectedTuple`| [TransportTuple](#TransportTuple) | The new ICE selected tuple.

</div>

#### webRtcTransport.on("dtlsstatechange", fn(dtlsState))
{: #webRtcTransport-on-dtlsstatechange .code}

Emitted when the transport DTLS state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`dtlsState`       | [DtlsState](#WebRtcTransportDtlsState) | The new DTLS state.

</div>

<div markdown="1" class="note">
* This event will be emitted with `dtlsState: 'closed'` when the remote endpoint sends DTLS Close Alert message. If so, this event will be emitted before the [icestatechange](#webRtcTransport-on-icestatechange) event with `iceState: 'disconnected'`. The application should close the transport when this happens since it's not recoverable.
</div>

#### webRtcTransport.on("sctpstatechange", fn(sctpState))
{: #webRtcTransport-on-sctpstatechange .code}

Emitted when the transport SCTP state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`sctpState`       | [SctpState](#SctpState) | The new SCTP state.

</div>

</section>


### Observer Events
{: #WebRtcTransport-observer-events}

<section markdown="1">

See also [Transport Observer Events](#Transport-observer-events).

#### webRtcTransport.observer.on("icestatechange", fn(iceState))
{: #webRtcTransport-observer-on-icestatechange .code}

Same as the [icestatechange](#webRtcTransport-on-icestatechange) event.

#### webRtcTransport.observer.on("iceselectedtuplechange", fn(iceSelectedTuple))
{: #webRtcTransport-observer-on-iceselectedtuplechange .code}

Same as the [iceselectedtuplechange](#webRtcTransport-on-iceselectedtuplechange) event.

#### webRtcTransport.observer.on("dtlsstatechange", fn(dtlsState))
{: #webRtcTransport-observer-on-dtlsstatechange .code}

Same as the [dtlsstatechange](#webRtcTransport-on-dtlsstatechange) event.

#### webRtcTransport.observer.on("sctpstatechange", fn(sctpState))
{: #webRtcTransport-observer-on-sctpstatechange .code}

Same as the [sctpstatechange](#webRtcTransport-on-sctpstatechange) event.

</section>
