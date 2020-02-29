## PlainRtpTransport
{: #PlainRtpTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A plain RTP transport represents a network path through which plain RTP and RTCP is transmitted.

</section>


### Dictionaries
{: #PlainRtpTransport-dictionaries}

<section markdown="1">

#### PlainRtpTransportOptions
{: #PlainRtpTransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`listenIp`    | [TransportListenIp](#TransportListenIp)\|String| Listening IP address. | Yes |
`rtcpMux`     | Boolean | Use RTCP-mux (RTP and RTCP in the same port). | No | `true`
`comedia`     | Boolean | Whether remote IP:port should be auto-detected based on first RTP/RTCP packet received. If enabled, `connect()` must only be called if SRTP is enabled by providing the remote `srtpParameters`. This option is ignored if `multiSource` is set. | No | `false`
`multiSource` | Boolean | Whether RTP/RTCP from different remote IPs:ports is allowed. If set, the transport will just be valid for receiving media (`consume()` cannot be called on it) and `connect()` must only be called if SRTP is enabled by providing the remote `srtpParameters`. | No | `false`
`enableSctp`  | Boolean | Create a SCTP association. | No | `false`
`numSctpStreams`     | [NumSctpStreams](/documentation/v3/mediasoup/sctp-parameters/#NumSctpStreams) | SCTP streams number. | No |
`maxSctpMessageSize` | Number | Maximum size of data that can be passed to DataProducer's send() method. | No | 262144
`enableSrtp`  | Boolean | Enable SRTP to encrypt RTP and SRTP. If enabled, the remote must also enable SRTP. | No | `false`
`srtpCryptoSuite` | [SrtpCryptoSuite](/documentation/v3/mediasoup/srtp-parameters/#SrtpCryptoSuite) | Just valid if `enableSrtp` is set. | No | "AES_CM_128_HMAC_SHA1_80"
`appData`     | Object  | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
* Note that `comedia` mode just makes sense when the remote endpoint is gonna produce RTP on this plain RTP transport. Otherwise, if the remote endpoint does not send any RTP packet to mediasoup, there is no way to detect its remote RTP IP and port, so the endpoint won't receive any packet from mediasoup.
  * In other words, do not use `comedia` mode if the remote endpoint is not going to produce RTP but just consume it. In those cases, do not set `comedia` flag and call [connect()](#plainRtpTransport-connect) with the IP and port(s) of the remote endpoint. 

* When `multiSource` is set, the producer endpoint won't receive any RTCP packet from mediasoup. Try to avoid `multiSource` if possible. In case of video, if the producer does not send periodic video key frames, consumers will have problems to render the video (since RTCP PLI or FIR cannot be delivered to the producer if `multiSource` is set).
</div>


</section>


### Properties
{: #PlainRtpTransport-properties}

<section markdown="1">

See also [Transport Properties](#Transport-properties).

#### plainRtpTransport.tuple
{: #plainRtpTransport-tuple .code}

The transport tuple. If RTCP-mux is enabled (`rtcpMux` is set), this tuple refers to both RTP and RTCP.

<div markdown="1" class="note">
* Once the plain RTP transport is created, `transport.tuple` will contain information about its `localIp`, `localPort` and `protocol`.
* Information about `remoteIp` and `remotePort` will be set:
   * after calling `connect()` method, or
   * via dynamic remote address detection when using `comedia` mode.
</div>

> `@type` [TransportTuple](#TransportTuple), read only

#### plainRtpTransport.rtcpTuple
{: #plainRtpTransport-rtcpTuple .code}

The transport tuple for RTCP. If RTCP-mux is enabled (`rtcpMux` is set), its value is `undefined`.

<div markdown="1" class="note">
* Once the plain RTP transport is created (with RTCP-mux disabled), `transport.rtcpTuple` will contain information about its `localIp`, `localPort` and `protocol`.
* Information about `remoteIp` and `remotePort` will be set:
   * after calling `connect()` method, or
   * via dynamic remote address detection when using `comedia` mode.
</div>

> `@type` [TransportTuple](#TransportTuple), read only

#### plainRtpTransport.sctpParameters
{: #plainRtpTransport-sctpParameters .code}

Local SCTP parameters.

> `@type` [SctpParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpParameters), read only


#### plainRtpTransport.sctpState
{: #plainRtpTransport-sctpState .code}

Current SCTP state.

> `@type` [TransportSctpState](#TransportSctpState), read only

#### plainRtpTransport.srtpParameters
{: #plainRtpTransport-srtpParameters .code}

Local SRTP parameters representing the crypto suite and key material used to encrypt sending RTP and SRTP. Note that, if `comedia` mode is set, these local SRTP parameters may change after calling `connect()` with the remote SRTP parameters (to override the local SRTP crypto suite with the one given in `connect()`).

> `@type` [SrtpParameters](/documentation/v3/mediasoup/srtp-parameters/#SrtpParameters), read only

</section>


### Methods
{: #PlainRtpTransport-methods}

<section markdown="1">

See also [Transport Methods](#Transport-methods).

#### plainRtpTransport.getStats()
{: #plainRtpTransport-getStats .code}

Returns current RTC statistics of the WebRTC transport.

> `@async`
> 
> `@override`
> 
> `@returns` Array&lt;PlainRtpTransportStat&gt;

#### plainRtpTransport.connect({ ip, port, rtcpPort })
{: #plainRtpTransport-connect .code}

Provides the plain RTP transport with the endpoint parameters. It must not be called when `comedia` mode is enabled (in this case the remote media address will be detected dynamically) or when `multiSource` is set, **unless SRTP is enabled**.

If SRTP is enabled (`enableSrtp` was set in the `router.createPlainRtpTransport()` options) then `connect()` must be called with the remote `srtpParameters` no matter `comedia` or `multiSource` is set. However, if any of them is set, `ip`, `port` and `rtcpPort` must **not** be given into `connect()` options.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`ip`       | String  | Remote IPv4 or IPv6. Required if neither `comedia` nor `multiSource` are set. | No |
`port`     | Number  | Remote port.  Required if neither `comedia` nor `multiSource` are set. | No |
`rtcpPort` | Number  | Remote RTCP port. Required if neither `comedia` nor `multiSource` are set and RTCP-mux is not enabled. | No |
`srtpParameters` | [SrtpParameters](/documentation/v3/mediasoup/srtp-parameters/#SrtpParameters) | SRTP parameters used by the remote endpoint to encrypt its RTP and RTCP. Local [srtpParameters](#plainRtpTransport-srtpParameters) gets also updated after `connect()` resolves. Required if `enableSrtp` was set. | No |

</div>

> `@async`
> 
> `@overrides`

```javascript
// Calling connect() on a PlainRtpTransport created with comedia and
// multiSource unset and rtcpMux set.
await plainRtpTransport.connect(
  {
    ip   : '1.2.3.4',
    port : 9998
  });
```

```javascript
// Calling connect() on a PlainRtpTransport created with comedia and
// multiSource unset and rtcpMux also unset.
await plainRtpTransport.connect(
  {
    ip       : '1.2.3.4',
    port     : 9998,
    rtcpPort : 9999
  });
```

```javascript
// Calling connect() on a PlainRtpTransport created with comedia or multiSource
// set and enableSrtp also set.
await plainRtpTransport.connect(
  {
    srtpParameters :
    {
      cryptoSuite : 'AES_CM_128_HMAC_SHA1_80',
      keyBase64   : 'ZnQ3eWJraDg0d3ZoYzM5cXN1Y2pnaHU5NWxrZTVv'
    }
  });
```

</section>


### Events
{: #PlainRtpTransport-events}

<section markdown="1">

See also [Transport Events](#Transport-events).

#### plainRtpTransport.on("tuple", fn(tuple))
{: #plainRtpTransport-on-tuple .code}

Emitted after the remote RTP origin has been discovered. Just emitted if `comedia` mode was set.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`tuple`  | [TransportTuple](#TransportTuple) | The updated transport tuple.

</div>

#### plainRtpTransport.on("rtcpTuple", fn(rtcpTuple))
{: #plainRtpTransport-on-rtcpTuple .code}

Emitted after the remote RTCP origin has been discovered. Just emitted if `comedia` mode was set and `rtcpMux` was not.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`tuple`  | [TransportTuple](#TransportTuple) | The updated transport tuple.

</div>

#### plainRtpTransport.on("sctpstatechange", fn(sctpState))
{: #plainRtpTransport-on-sctpstatechange .code}

Emitted when the transport SCTP state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`sctpState`       | [TransportSctpState](#TransportSctpState) | The new SCTP state.

</div>

</section>


### Observer Events
{: #PlainRtpTransport-observer-events}

<section markdown="1">

See also [Transport Observer Events](#Transport-observer-events).

#### plainRtpTransport.observer.on("tuple", fn(tuple))
{: #plainRtpTransport-observer-on-tuple .code}

Same as the [tuple](#plainRtpTransport-on-tuple) event.

</div>

#### plainRtpTransport.observer.on("rtcpTuple", fn(rtcpTuple))
{: #plainRtpTransport-observer-on-rtcpTuple .code}

Same as the [rtcpTuple](#plainRtpTransport-on-rtcpTuple) event.

</div>

#### plainRtpTransport.observer.on("sctpstatechange", fn(sctpState))
{: #plainRtpTransport-observer-on-sctpstatechange .code}

Same as the [sctpstatechange](#plainRtpTransport-on-sctpstatechange) event.

</section>
