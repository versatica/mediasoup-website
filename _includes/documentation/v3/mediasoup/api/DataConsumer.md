## DataConsumer
{: #DataConsumer}

<section markdown="1">

A data copnsumer represents an endpoint capable of receiving data messages from a mediasoup `Router`. A data consumer can use [SCTP](https://tools.ietf.org/html/rfc4960) (AKA DataChannel) to receive those messages, or can directly receive them in the Node.js application if the data consumer was created on top of a `DirectTransport`.

</section>


### Dictionaries
{: #DataConsumer-dictionaries}

<section markdown="1">

#### DataConsumerOptions
{: #DataConsumerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field            | Type    | Description   | Required | Default
---------------- | ------- | ------------- | -------- | ---------
`dataProducerId` | String  | The id of the data producer to consume. | Yes |
`ordered`        | Boolean | Just if consuming over SCTP. Whether data messages must be received in order. If `true` the messages will be sent reliably. | No | The value in the data producer (if it's of type 'sctp') or `true` (if it's of type 'direct').
`maxPacketLifeTime` | Number | Just if consuming over SCTP. When `ordered` is `false`, it indicates the time (in milliseconds) after which a SCTP packet will stop being retransmitted. | No | The value in the data producer (if it's of type 'sctp') or unset (if it's of type 'direct').
`maxRetransmits` | Number | Just if consuming over SCTP. When `ordered` is `false`, it indicates the maximum number of times a packet will be retransmitted. | No | The value in the data producer (if it's of type 'sctp') or unset (if it's of type 'direct').
`appData`        | Object  | Custom application data. | No | `{ }`

</div>

</section>


### Enums
{: #DataConsumer-enums}

<section markdown="1">

#### DataConsumerType
{: #DataConsumerType .code}

<div markdown="1" class="table-wrapper L2">

Value    | Description
-------- | -------------
"sctp"   | The endpoint receives messages using the SCTP protocol.
"direct" | Messages are received directly by the Node.js process over a direct transport.

</div>

</section>


### Properties
{: #DataConsumer-properties}

<section markdown="1">

#### dataConsumer.id
{: #dataConsumer-id .code}

Data consumer identifier.

> `@type` String, read only

#### dataConsumer.dataProducerId
{: #dataConsumer-dataProducerId .code}

The associated data producer identifier.

> `@type` String, read only

#### dataConsumer.bufferedAmountLowThreshold
{: #dataConsumer-bufferedAmountLowThreshold .code}

Number of bytes of buffered outgoing data that is considered low. Whenever the underlaying SCTP association buffered bytes drop to this value, [bufferedamountlow](#dataConsumer-on-bufferedamountlow) event is fired.

> `@type` Number (by deafult 0)

#### dataConsumer.closed
{: #dataConsumer-closed .code}

Whether the data consumer is closed.

> `@type` Boolean, read only

#### dataConsumer.type
{: #dataConsumer-type .code}

The type of the data consumer.

> `@type` [DataProducerType](#DataProducerType), read only

#### dataConsumer.sctpStreamParameters
{: #dataConsumer-sctpStreamParameters .code}

The SCTP stream parameters (just if the data consumer `type` is 'sctp').

> `@type` [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters)\|Undefined, read only

#### dataConsumer.label
{: #dataConsumer-label .code}

The data consumer label.

> `@type` String , read only

#### dataConsumer.protocol
{: #dataConsumer-protocol .code}

The data consumer sub-protocol.

> `@type` String , read only

#### dataConsumer.appData
{: #dataConsumer-appData .code}

Custom data Object provided by the application in the data consumer factory method. The app can modify its content at any time.

> `@type` Object, read only

#### dataConsumer.observer
{: #dataConsumer-observer .code}

See the [Observer Events](#DataConsumer-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #DataConsumer-methods}

<section markdown="1">

#### dataConsumer.close()
{: #dataConsumer-close .code}

Closes the data consumer.

#### dataConsumer.getStats()
{: #dataConsumer-getStats .code}

Returns current statistics of the data consumer.

> `@async`
> 
> `@returns` Array&lt;DataConsumerStat&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### dataConsumer.getBufferedAmount()
{: #dataConsumer-getBufferedAmount .code}

Returns the number of bytes of data currently buffered to be sent over the underlaying SCTP association.

<div markdown="1" class="note">
The underlaying SCTP association uses a common send buffer for all data consumers, hence the value given by this method indicates the data buffered for all data consumers in the transport.
</div>

> `@async`
> 
> `@returns` Number;

#### dataConsumer.setBufferedAmountLowThreshold()
{: #dataConsumer-setBufferedAmountLowThreshold .code}

<div markdown="1" class="table-wrapper L3">

Field            | Type    | Description   | Required | Default
---------------- | ------- | ------------- | -------- | ---------
`bufferedAmountLowThreshold`   | Number  | Bytes of buffered outgoing data that is considered low.| No | 0

</div>

<div markdown="1" class="note">
Whenever the underlaying SCTP association buffered bytes drop to this value, [bufferedamountlow](#dataConsumer-on-bufferedamountlow) event is fired.
</div>

> `@async`

#### dataConsumer.send(message, ppid)
{: #dataConsumer-send .code}

Sends direct messages from the Node.js process.

<div markdown="1" class="note">
Just available in data consumers of type "SCTP".
</div>

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description | Required | Default 
--------- | ------- | ----------- | -------- | ----------
`message` | String\|Buffer | Message to be sent (can be binary by using a Node.js Buffer). | Yes |
`ppid`    | Number | Mimics the [SCTP Payload Protocol Identifier](https://www.iana.org/assignments/sctp-parameters/sctp-parameters.xhtml#sctp-parameters-25). In most cases it must not be set. | No | 51 (`WebRTC String`) if `message` is a String and 53 (`WebRTC Binary`) if it's a Buffer.

</div>

```javascript
const stringMessage = "hello";
const binaryMessage = Buffer.from([ 1, 2, 3, 4 ]);

dataConsumer.send(stringMessage);
dataConsumer.send(binaryMessage);
```

> `@async`

</section>


### Events
{: #DataConsumer-events}

<section markdown="1">

#### dataConsumer.on("transportclose", fn())
{: #dataConsumer-on-transportclose .code}

Emitted when the transport this data consumer belongs to is closed for whatever reason. The data consumer itself is also closed.

```javascript
dataConsumer.on("transportclose", () =>
{
  console.log("transport closed so dataConsumer closed");
});
```

#### dataConsumer.on("dataproducerclose", fn())
{: #dataConsumer-on-dataproducerclose .code}

Emitted when the associated data producer is closed for whatever reason. The data consumer itself is also closed.

```javascript
dataConsumer.on("dataproducerclose", () =>
{
  console.log("associated data producer closed so dataConsumer closed");
});
```

#### dataConsumer.on("message", fn(message, ppid))
{: #dataConsumer-on-message .code}

Emitted when a message has been received from the corresponding data producer,

<div markdown="1" class="note">
Just available in direct transports, this is, those created via `router.createDirectTransport()`.
</div>

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`message`   | Buffer  | Received message. It's always a Node.js Buffer.
`ppid`      | Number  | Mimics the [SCTP Payload Protocol Identifier](https://www.iana.org/assignments/sctp-parameters/sctp-parameters.xhtml#sctp-parameters-25). Typically it's 51 (`WebRTC String`) if `message` is a String and 53 (`WebRTC Binary`) if it's a Buffer.

</div>

```javascript
dataConsumer.on("message", (message, ppid) =>
{
  if (ppid === 51)
    console.log("text message received:", message.toString("utf-8"));
  else if (ppid === 53)
    console.log("binary message received");
});
```

#### dataConsumer.on("sctpsendbufferfull")
{: #dataConsumer-on-sctpsendbufferfull .code}

Emitted when a message could not be sent because the SCTP send buffer was full.

#### dataConsumer.on("bufferedamountlow", fn(bufferedAmount))
{: #dataConsumer-on-bufferedamountlow .code}

Emitted when the underlaying SCTP association buffered bytes drop down to [bufferedAmountLowThreshold](#dataConsumer-bufferedAmountLowThreshold).

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`bufferedAmount`   | Number  | Number of bytes buffered in the underlaying SCTP association.

</div>

<div markdown="1" class="note">
Only applicable for consumers of type 'sctp'.
</div>

</section>


### Observer Events
{: #DataConsumer-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### dataConsumer.observer.on("close", fn())
{: #dataConsumer-observer-on-close .code}

Emitted when the data consumer is closed for whatever reason.

</section>
