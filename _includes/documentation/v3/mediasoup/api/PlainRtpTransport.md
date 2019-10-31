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
`comedia`     | Boolean | Whether remote IP:port should be auto-detected based on first RTP/RTCP packet received. If enabled, `connect()` method must not be called. This option is ignored if `multiSource` is set. | No | `false`
`multiSource` | Boolean | Whether RTP/RTCP from different remote IPs:ports is allowed. If set, the transport will just be valid for receiving media (`consume()` cannot be called on it) and `connect()` must not be called. | No | `false`
`enableSctp`  | Boolean | Create a SCTP association. | No | `false`
`numSctpStreams`     | [TransportNumSctpStreams](#TransportNumSctpStreams) | SCTP streams number. | No |
`maxSctpMessageSize` | Number | Maximum size of data that can be passed to DataProducer's send() method. | No | 262144
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

> `@type` [TransportSctpParameters](#TransportSctpParameters), read only

#### plainRtpTransport.sctpState
{: #plainRtpTransport-sctpState .code}

Current SCTP state.

> `@type` [TransportSctpState](#TransportSctpState), read only

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

Provides the plain RTP transport with the endpoint parameters. It must not be called when `comedia` mode is enabled (in this case the remote media address will be detected dynamically) or when `multiSource` is set.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`ip`       | String  | Remote IPv4 or IPv6.   | Yes |
`port`     | Number  | Remote port.           | Yes |
`rtcpPort` | Number  | Remote RTCP port (required if RTCP-mux is not enabled).           | No |

</div>

> `@async`
> 
> `@overrides`

</section>


### Events
{: #PlainRtpTransport-events}

<section markdown="1">

See also [Transport Events](#Transport-events).

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

#### plainRtpTransport.observer.on("sctpstatechange", fn(sctpState))
{: #plainRtpTransport-observer-on-sctpstatechange .code}

Same as the [sctptatechange](#plainRtpTransport-on-sctpstatechange) event.

</section>
