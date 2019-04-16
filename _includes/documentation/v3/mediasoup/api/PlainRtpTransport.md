## PlainRtpTransport
{: #PlainRtpTransport}

<section markdown="1">

A plain RTP transport represents a network path through which plain RTP and RTCP is transmitted.

> `@inherits` [Transport](#Transport)

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
`appData`     | Object  | Custom application data. | No | `{}`

</div>

</section>


### Properties
{: #PlainRtpTransport-properties}

<section markdown="1">

See also [Transport Properties](#Transport-properties).

#### plainRtpTransport.tuple
{: #plainRtpTransport-tuple .code}

The transport tuple. It's set after calling `connect()` method (it's `undefined` otherwise). If RTCP-mux is enabled, this tuple refers to both RTP and RTCP.

> `@type` [TransportTuple](#TransportTuple), read only

#### plainRtpTransport.rtcpTuple
{: #plainRtpTransport-rtcpTuple .code}

The transport tuple for RTCP. It's set after calling `connect()` method just if RTCP-mux is not enabled.

> `@type` [TransportTuple](#TransportTuple), read only

</section>


### Methods
{: #PlainRtpTransport-methods}

<section markdown="1">

See also [Transport Methods](#Transport-methods).

#### plainRtpTransport.connect({ ip, port, rtcpPort })
{: #plainRtpTransport-connect .code}

Provides the plain RTP transport with the endpoint parameters.

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

</section>


### Observer Events
{: #PlainRtpTransport-observer-events}

<section markdown="1">

See also [Transport Observer Events](#Transport-observer-events).

</section>
