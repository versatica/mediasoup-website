## DirectTransport
{: #DirectTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A direct transport represents a direct connection between the mediasoup Node.js process and a `Router` instance in a mediasoup-worker subprocess.

A direct transport can be used to directly send and receive data messages from/to Node.js by means of `DataProducers` and `DataConsumers` of type 'direct' created on a direct transport. Direct messages sent by a `DataProducer` in a direct transport can be consumed by endpoints connected through a SCTP capable transport (`WebRtcTransport`, `PlainTransport`, `PipeTransport`) and also by the Node.js application by means of a `DataConsumer` created on a `DirectTransport` (and vice-versa: messages sent over SCTP/DataChannel can be consumed by the Node.js application by means of a `DataConsumer` created on a `DirectTransport`).

A direct transport can also be used to inject and directly consume RTP and RTCP packets in Node.js by using the `producer.send(rtpPacket)` and `consumer.on('rtp')` API (plus `directTransport.sendRtcp(rtcpPacket)` and `directTransport.on('rtcp')` API).

</section>


### Dictionaries
{: #DirectTransport-dictionaries}

<section markdown="1">

#### DirectTransportOptions
{: #DirectTransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`maxMessageSize` | Number | Maximum allowed size for direct messages sent by `DataProducers`. | No | 262144
`appData`     | [AppData](#AppData) | Custom application data. | No | `{ }`

</div>

</section>


### Properties
{: #DirectTransport-properties}

<section markdown="1">

See also [Transport Properties](#Transport-properties).

</section>


### Methods
{: #DirectTransport-methods}

<section markdown="1">

See also [Transport Methods](#Transport-methods).

#### directTransport.getStats()
{: #directTransport-getStats .code}

Returns current RTC statistics of the direct transport.

> `@async`
> 
> `@override`
> 
> `@returns` Array&lt;DirectTransportStat&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### directTransport.connect()
{: #directTransport-connect .code}

It's a no-op. There is no need to call this method on direct transports (they are always connected).

> `@async`
> 
> `@overrides`

#### directTransport.setMaxIncomingBitrate(options)
{: #directTransport-setMaxIncomingBitrate .code}

<div markdown="1" class="note warn">
Not implemented in direct transports. If called, it will reject with `UnsupportedError`.
</div>

> `@async`
> 
> `@overrides`

#### directTransport.setMaxOutgoingBitrate(options)
{: #directTransport-setMaxOutgoingBitrate .code}

<div markdown="1" class="note warn">
Not implemented in direct transports. If called, it will reject with `UnsupportedError`.
</div>

> `@async`
> 
> `@overrides`

#### directTransport.setMinOutgoingBitrate(options)
{: #directTransport-setMinOutgoingBitrate .code}

<div markdown="1" class="note warn">
Not implemented in direct transports. If called, it will reject with `UnsupportedError`.
</div>

> `@async`
> 
> `@overrides`

</section>

#### directTransport.sendRtcp(rtcpPacket)
{: #directTransport-sendRtcp .code}

Sends a RTCP packet from the Node.js process.

<div markdown="1" class="note">
Just available in direct transports, this is, those created via `router.createDirectTransport()`.
</div>

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description | Required | Default 
--------- | ------- | ----------- | -------- | ----------
`rtcpPacket` | Buffer | A Node.js Buffer containing a valid RTCP packet (can be a compound packet). | Yes |

</div>

```javascript
// Send a RTCP packet.
directTransport.sendRtcp(rtcpPacket);
```

</section>


### Events
{: #DirectTransport-events}

<section markdown="1">

See also [Transport Events](#Transport-events).

#### directTransport.on("rtcp", fn(rtcpPacket))
{: #directTransport-on-rtcp .code}

Emitted when the direct transport receives a RTCP packet from its router.

<div markdown="1" class="note">
Just available in direct transports, this is, those created via `router.createDirectTransport()`.
</div>

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`rtcpPacket` | Buffer  | Received RTP packet. It's always a Node.js Buffer. It may be a compound RTCP packet or a standalone RTCP packet.

</div>

```javascript
directTransport.on("rtcp", (rtcpPacket) =>
{
  // Do stuff with the binary RTCP packet.
});
```

</section>


### Observer Events
{: #DirectTransport-observer-events}

<section markdown="1">

See also [Transport Observer Events](#Transport-observer-events).

</section>
