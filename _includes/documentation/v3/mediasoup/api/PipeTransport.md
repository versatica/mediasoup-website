## PipeTransport
{: #PipeTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A pipe transport represents a network path through which plain RTP and RTCP is transmitted. Pipe transports are intented to intercommunicate two [Router](#Router) instances collocated on the same host or on separate hosts.

<div markdown="1" class="note typescript">
TypeScript definition:

```js
import PipeTransport from 'mediasoup/lib/PipeTransport';
```
</div>

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
`enableSctp` | Boolean | Create a SCTP association. | No | `false`
`numSctpStreams` | [TransportNumSctpStreams](#TransportNumSctpStreams) | SCTP streams number. | No |
`maxSctpMessageSize` | Number | Maximum size of data that can be passed to DataProducer's send() method. | No | 1073741823
`appData`     | Object  | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note typescript">
TypeScript definition:

```js
import { PipeTransportOptions } from 'mediasoup/lib/PipeTransport';
```
</div>

</section>


### Properties
{: #PipeTransport-properties}

<section markdown="1">

See also [Transport Properties](#Transport-properties).

#### pipeTransport.tuple
{: #pipeTransport-tuple .code}

The transport tuple. It refers to both RTP and RTCP since pipe transports use RTCP-mux by design.

<div markdown="1" class="note">
* Once the pipe transport is created, `transport.tuple` will contain information about its `localIp`, `localPort` and `protocol`.
* Information about `remoteIp` and `remotePort` will be set after calling `connect()` method.
</div>

> `@type` [TransportTuple](#TransportTuple), read only

#### pipeTransport.sctpParameters
{: #pipeTransport-sctpParameters .code}

Local SCTP parameters.

> `@type` [TransportSctpParameters](#TransportSctpParameters), read only

#### pipeTransport.sctpState
{: #pipeTransport-sctpState .code}

Current SCTP state.

> `@type` [TransportSctpState](#TransportSctpState), read only

</section>


### Methods
{: #PipeTransport-methods}

<section markdown="1">

See also [Transport Methods](#Transport-methods).

#### pipeTransport.getStats()
{: #pipeTransport-getStats .code}

Returns current RTC statistics of the pipe transport.

> `@async`
> 
> `@override`
> 
> `@returns` Array&lt;PipeTransportStat&gt;

<div markdown="1" class="note typescript">
TypeScript definition:

```js
import { PipeTransportStat } from 'mediasoup/lib/PipeTransport';
```
</div>

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

#### pipeTransport.on("sctpstatechange", fn(sctpState))
{: #pipeTransport-on-sctpstatechange .code}

Emitted when the transport SCTP state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`sctpState`       | [TransportSctpState](#TransportSctpState) | The new SCTP state.

</div>
</section>


### Observer Events
{: #PipeTransport-observer-events}

<section markdown="1">

See also [Transport Observer Events](#Transport-observer-events).

#### pipeTransport.observer.on("sctpstatechange", fn(sctpState))
{: #pipeTransport-observer-on-sctpstatechange .code}

Same as the [sctpstatechange](#pipeTransport-on-sctpstatechange) event.

</section>
