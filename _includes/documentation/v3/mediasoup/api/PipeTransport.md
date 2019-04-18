## PipeTransport
{: #PipeTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A pipe transport represents a network path through which plain RTP and RTCP is transmitted. Pipe transports are intented to intercommunicate two [Router](#Router) instances collocated on the same host or on separate hosts.

<div markdown="1" class="note">

When calling [consume()](#transport-consume) on a pipe transport, all RTP streams of the [Producer](#Producer) are transmitted verbatim (in contrast to what happens in [WebRtcTransport](#WebRtcTransport) and [PlainRtpTransport](#PlainRtpTransport) in which a single and continuos RTP stream is sent to the consuming endpoint).

</div>

</section>


### Dictionaries
{: #PipeTransport-dictionaries}

<section markdown="1">

#### PipeTransportOptions
{: #PipeTransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`listenIp`    | [TransportListenIp](#TransportListenIp)\|String| Listening IP address. | Yes |
`appData`     | Object  | Custom application data. | No | `{}`

</div>

</section>


### Properties
{: #PipeTransport-properties}

<section markdown="1">

See also [Transport Properties](#Transport-properties).

#### pipeTransport.tuple
{: #pipeTransport-tuple .code}

The transport tuple. It's set after calling `connect()` method (it's `undefined` otherwise). This tuple refers to both RTP and RTCP.

> `@type` [TransportTuple](#TransportTuple), read only

</section>


### Methods
{: #PipeTransport-methods}

<section markdown="1">

See also [Transport Methods](#Transport-methods).

#### pipeTransport.connect({ ip, port })
{: #pipeTransport-connect .code}

Provides the pipe RTP transport with the remote parameters.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`ip`       | String  | Remote IPv4 or IPv6.   | Yes |
`port`     | Number  | Remote port.           | Yes |

</div>

> `@async`
> 
> `@overrides`

</section>


### Events
{: #PipeTransport-events}

<section markdown="1">

See also [Transport Events](#Transport-events).

</section>


### Observer Events
{: #PipeTransport-observer-events}

<section markdown="1">

See also [Transport Observer Events](#Transport-observer-events).

</section>
