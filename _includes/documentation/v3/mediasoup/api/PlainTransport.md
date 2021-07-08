## PlainRtpTransport (DEPRECATED)
{: #PlainRtpTransport}

<section markdown="1">

<div markdown="1" class="note warn">
`PlainRtpTransport` has been renamed to [PlainTransport](#PlainTransport) since mediasoup version 3.5.0.
</div>

</section>


## PlainTransport
{: #PlainTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A plain transport represents a network path through which RTP, RTCP (optionally secured with SRTP) and SCTP (DataChannel) is transmitted.

</section>


### Dictionaries
{: #PlainTransport-dictionaries}

<section markdown="1">

#### PlainTransportOptions
{: #PlainTransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`listenIp`    | [TransportListenIp](#TransportListenIp)\|String| Listening IP address. | Yes |
`port`        | Number  | Fixed port to listen on instead of selecting automatically from Worker's port range. | No |
`rtcpMux`     | Boolean | Use RTCP-mux (RTP and RTCP in the same port). | No | `true`
`comedia`     | Boolean | Whether remote IP:port should be auto-detected based on first RTP/RTCP packet received. If enabled, `connect()` must only be called if SRTP is enabled by providing the remote `srtpParameters` and nothing else. | No | `false`
`enableSctp`  | Boolean | Create a SCTP association. | No | `false`
`numSctpStreams`     | [NumSctpStreams](/documentation/v3/mediasoup/sctp-parameters/#NumSctpStreams) | SCTP streams number. | No |
`maxSctpMessageSize` | Number | Maximum allowed size for SCTP messages sent by `DataProducers`. | No | 262144
`sctpSendBufferSize` | Number | SCTP send buffer size used by usrsctp. | NO | 262144 |
`enableSrtp`  | Boolean | Enable SRTP to encrypt RTP and SRTP. If enabled, the remote must also enable SRTP. | No | `false`
`srtpCryptoSuite` | [SrtpCryptoSuite](/documentation/v3/mediasoup/srtp-parameters/#SrtpCryptoSuite) | Just valid if `enableSrtp` is set. | No | "AES_CM_128_HMAC_SHA1_80"
`appData`     | Object  | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
* Note that `comedia` mode just makes sense when the remote endpoint is gonna produce RTP on this plain transport. Otherwise, if the remote endpoint does not send any RTP (or SCTP) packet to mediasoup, there is no way to detect its remote RTP IP and port, so the endpoint won't receive any packet from mediasoup.
* In other words, do not use `comedia` mode if the remote endpoint is not going to produce RTP but just consume it. In those cases, do not set `comedia` flag and call [connect()](#plainTransport-connect) with the IP and port(s) of the remote endpoint. 
</div>

</section>


### Properties
{: #PlainTransport-properties}

<section markdown="1">

See also [Transport Properties](#Transport-properties).

#### plainTransport.tuple
{: #plainTransport-tuple .code}

The transport tuple. If RTCP-mux is enabled (`rtcpMux` is set), this tuple refers to both RTP and RTCP.

<div markdown="1" class="note">
* Once the plain transport is created, `transport.tuple` will contain information about its `localIp`, `localPort` and `protocol`.
* Information about `remoteIp` and `remotePort` will be set:
   * after calling `connect()` method, or
   * via dynamic remote address detection when using `comedia` mode.
</div>

> `@type` [TransportTuple](#TransportTuple), read only

#### plainTransport.rtcpTuple
{: #plainTransport-rtcpTuple .code}

The transport tuple for RTCP. If RTCP-mux is enabled (`rtcpMux` is set), its value is `undefined`.

<div markdown="1" class="note">
* Once the plain transport is created (with RTCP-mux disabled), `transport.rtcpTuple` will contain information about its `localIp`, `localPort` and `protocol`.
* Information about `remoteIp` and `remotePort` will be set:
   * after calling `connect()` method, or
   * via dynamic remote address detection when using `comedia` mode.
</div>

> `@type` [TransportTuple](#TransportTuple), read only

#### plainTransport.sctpParameters
{: #plainTransport-sctpParameters .code}

Local SCTP parameters. Or `undefined` if SCTP is not enabled.

> `@type` [SctpParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpParameters), read only


#### plainTransport.sctpState
{: #plainTransport-sctpState .code}

Current SCTP state. Or `undefined` if SCTP is not enabled.

> `@type` [TransportSctpState](#TransportSctpState), read only

#### plainTransport.srtpParameters
{: #plainTransport-srtpParameters .code}

Local SRTP parameters representing the crypto suite and key material used to encrypt sending RTP and SRTP. Note that, if `comedia` mode is set, these local SRTP parameters may change after calling `connect()` with the remote SRTP parameters (to override the local SRTP crypto suite with the one given in `connect()`).

> `@type` [SrtpParameters](/documentation/v3/mediasoup/srtp-parameters/#SrtpParameters), read only

</section>


### Methods
{: #PlainTransport-methods}

<section markdown="1">

See also [Transport Methods](#Transport-methods).

#### plainTransport.getStats()
{: #plainTransport-getStats .code}

Returns current RTC statistics of the WebRTC transport.

> `@async`
> 
> `@override`
> 
> `@returns` Array&lt;PlainTransportStat&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### plainTransport.connect({ ip, port, rtcpPort, srtpParameters })
{: #plainTransport-connect .code}

Provides the plain transport with the endpoint parameters.

* If `comedia` is enabled in this plain transport and SRTP is not, `connect()` must not be called.
* If `comedia` is enabled and SRTP is also enabled (`enableSrtp` was set in the `router.createPlainTransport()` options) then `connect()` must be called with just the remote `srtpParameters`.
* If `comediap` is disabled, `connect()` must be eventually called with remote `ip`, `port`, optional `rtcpPort` (if RTCP-mux is not enabled) and optional `srtpParameters` (if SRTP is enabled).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`ip`       | String  | Remote IPv4 or IPv6. Required if `comedia` is not set. | No |
`port`     | Number  | Remote port.  Required if `comedia` is not set. | No |
`rtcpPort` | Number  | Remote RTCP port. Required if `comedia` is not set and RTCP-mux is not enabled. | No |
`srtpParameters` | [SrtpParameters](/documentation/v3/mediasoup/srtp-parameters/#SrtpParameters) | SRTP parameters used by the remote endpoint to encrypt its RTP and RTCP. The SRTP crypto suite of the local [srtpParameters](#plainTransport-srtpParameters) gets also updated after `connect()` resolves. Required if `enableSrtp` was set. | No |

</div>

> `@async`
> 
> `@overrides`

```javascript
// Calling connect() on a PlainTransport created with comedia and rtcpMux set.
await plainTransport.connect(
  {
    ip   : '1.2.3.4',
    port : 9998
  });
```

```javascript
// Calling connect() on a PlainTransport created with comedia unset and rtcpMux
// also unset.
await plainTransport.connect(
  {
    ip       : '1.2.3.4',
    port     : 9998,
    rtcpPort : 9999
  });
```

```javascript
// Calling connect() on a PlainTransport created with comedia set and
// enableSrtp enabled.
await plainTransport.connect(
  {
    srtpParameters :
    {
      cryptoSuite : 'AES_CM_128_HMAC_SHA1_80',
      keyBase64   : 'ZnQ3eWJraDg0d3ZoYzM5cXN1Y2pnaHU5NWxrZTVv'
    }
  });
```

```javascript
// Calling connect() on a PlainTransport created with comedia unset, rtcpMux
// set and enableSrtp enabled.
await plainTransport.connect(
  {
    ip             : '1.2.3.4',
    port           : 9998,
    srtpParameters :
    {
      cryptoSuite : 'AES_CM_128_HMAC_SHA1_80',
      keyBase64   : 'ZnQ3eWJraDg0d3ZoYzM5cXN1Y2pnaHU5NWxrZTVv'
    }
  });
```

</section>


### Events
{: #PlainTransport-events}

<section markdown="1">

See also [Transport Events](#Transport-events).

#### plainTransport.on("tuple", fn(tuple))
{: #plainTransport-on-tuple .code}

Emitted after the remote RTP origin has been discovered. Just emitted if `comedia` mode was set.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`tuple`  | [TransportTuple](#TransportTuple) | The updated transport tuple.

</div>

#### plainTransport.on("rtcptuple", fn(rtcpTuple))
{: #plainTransport-on-rtcptuple .code}

Emitted after the remote RTCP origin has been discovered. Just emitted if `comedia` mode was set and `rtcpMux` was not.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`rtcpTuple` | [TransportTuple](#TransportTuple) | The updated RTCP transport tuple.

</div>

#### plainTransport.on("sctpstatechange", fn(sctpState))
{: #plainTransport-on-sctpstatechange .code}

Emitted when the transport SCTP state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`sctpState`       | [TransportSctpState](#TransportSctpState) | The new SCTP state.

</div>

</section>


### Observer Events
{: #PlainTransport-observer-events}

<section markdown="1">

See also [Transport Observer Events](#Transport-observer-events).

#### plainTransport.observer.on("tuple", fn(tuple))
{: #plainTransport-observer-on-tuple .code}

Same as the [tuple](#plainTransport-on-tuple) event.

#### plainTransport.observer.on("rtcptuple", fn(rtcpTuple))
{: #plainTransport-observer-on-rtcptuple .code}

Same as the [rtcpTuple](#plainTransport-on-rtcpTuple) event.

#### plainTransport.observer.on("sctpstatechange", fn(sctpState))
{: #plainTransport-observer-on-sctpstatechange .code}

Same as the [sctpstatechange](#plainTransport-on-sctpstatechange) event.

</section>
