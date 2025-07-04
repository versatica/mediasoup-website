## DataProducer
{: #DataProducer}

<section markdown="1">

A data producer represents an endpoint capable of injecting data messages into a mediasoup `Router`. A data producer can use [SCTP](https://tools.ietf.org/html/rfc4960) (AKA DataChannel) to deliver those messages, or can directly send them from the Node.js application if the data producer was created on top of a `DirectTransport`.

</section>


### Dictionaries
{: #DataProducer-dictionaries}

<section markdown="1">

#### DataProducerOptions
{: #DataProducerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                  | Type    | Description   | Required | Default
---------------        | ------- | ------------- | -------- | ---------
`sctpStreamParameters` | [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters) | SCTP parameters defining how the endpoint is sending the data. Required if SCTP/DataChannel is used. Must not be given if the data producer is created on a `DirectTransport`. | No |
`label`                | String | A label which can be used to distinguish this DataChannel from others. | No |
`protocol`             | String | Name of the sub-protocol used by this DataChannel. | No |
`paused`               | Boolean | Whether the data producer must start in paused mode. | No | `false`
`appData`              | [AppData](#AppData) | Custom application data. | No | `{ }`

</div>

</section>


### Enums
{: #DataProducer-enums}

<section markdown="1">

#### DataProducerType
{: #DataProducerType .code}

<div markdown="1" class="table-wrapper L2">

Value    | Description
-------- | -------------
"sctp"   | The endpoint sends messages using the SCTP protocol.
"direct" | Messages are sent directly from the Node.js process over a direct transport.

</div>

</section>


### Properties
{: #DataProducer-properties}

<section markdown="1">

#### dataProducer.id
{: #dataProducer-id .code}

Data producer identifier.

> `@type` String, read only

#### dataProducer.closed
{: #dataProducer-closed .code}

Whether the data producer is closed.

> `@type` Boolean, read only

#### dataProducer.type
{: #dataProducer-type .code}

The type of the data producer.

> `@type` [DataProducerType](#DataProducerType), read only

#### dataProducer.sctpStreamParameters
{: #dataProducer-sctpStreamParameters .code}

The SCTP stream parameters (just if the data producer `type` is 'sctp').

> `@type` [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters)\|Undefined, read only

#### dataProducer.label
{: #dataProducer-label .code}

The data producer label.

> `@type` String , read only

#### dataProducer.protocol
{: #dataProducer-protocol .code}

The data producer sub-protocol.

> `@type` String , read only

#### dataProducer.paused
{: #dataProducer-paused .code}

Whether the data producer is paused.

> `@type` Boolean, read only

#### dataProducer.appData
{: #dataProducer-appData .code}

Custom data provided by the application in the worker factory method. The app can modify it at any time.

> `@type` [AppData](#AppData)

#### dataProducer.observer
{: #dataProducer-observer .code}

See the [Observer Events](#DataProducer-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #DataProducer-methods}

<section markdown="1">

#### dataProducer.close()
{: #dataProducer-close .code}

Closes the producer. Triggers a ["dataproducerclose"](#dataConsumer-on-dataproducerclose) event in all its associated consumers.

#### dataProducer.getStats()
{: #dataProducer-getStats .code}

Returns current statistics of the data producer.

> `@async`
> 
> `@returns` Array&lt;DataProducerStat&gt;

<div markdown="1" class="note">
Check the [RTC Statistics](/documentation/v3/mediasoup/rtc-statistics/) section for more details.
</div>

#### dataProducer.send(message, ppid, subchannels, requiredSubchannel)
{: #dataProducer-send .code}

Sends direct messages from the Node.js process.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description | Required | Default 
--------- | ------- | ----------- | -------- | ----------
`message` | String\|Buffer | Message to be sent (can be binary by using a Node.js Buffer). | Yes |
`ppid`    | Number | Mimics the [SCTP Payload Protocol Identifier](https://www.iana.org/assignments/sctp-parameters/sctp-parameters.xhtml#sctp-parameters-25). In most cases it must not be set. | No | 51 (`WebRTC String`) if `message` is a String and 53 (`WebRTC Binary`) if it's a Buffer.
`subchannels` | Array&lt;Number&gt; | Only data consumers subscribed to at least one of these subchannels (unsigned 16 bit integers) will receive the message. | No |
`requiredSubchannel` | Number | Only data consumers subscribed to this subchannel (unsigned 16 bit integer) will receive the message. | No |

</div>

<div markdown="1" class="note">
Just available in direct transports, this is, those created via `router.createDirectTransport()`.
</div>

```javascript
const stringMessage = "hello";
const binaryMessage = Buffer.from([ 1, 2, 3, 4 ]);

dataProducer.send(stringMessage);
dataProducer.send(binaryMessage);
```

```javascript
dataProducer.send("bye", /*ppid*/ undefined, /*subchannels*/ [ 24 ]);
```

#### dataProducer.pause()
{: #dataProducer-pause .code}

Pauses the data producer (no messages are sent to its associated data consumers). Triggers a ["dataproducerpause"](#dataConsumer-on-dataproducerpause) event in all its associated data consumers.

> `@async`

#### dataProducer.resume()
{: #dataProducer-resume .code}

Resumes the data producer (messages are sent again to its associated data consumers). Triggers a ["dataproducerresume"](#dataConsumer-on-dataproducerresume) event in all its associated data consumers.

> `@async`

</section>


### Events
{: #DataProducer-events}

<section markdown="1">

#### dataProducer.on("transportclose", fn())
{: #dataProducer-on-transportclose .code}

Emitted when the transport this data producer belongs to is closed for whatever reason. The producer itself is also closed. A ["dataproducerclose"](#dataConsumer-on-dataproducerclose) event is triggered in all its associated consumers.

```javascript
dataProducer.on("transportclose", () =>
{
  console.log("transport closed so dataProducer closed");
});
```

#### dataProducer.on("listenererror", fn(eventName, error))
{: #dataProducer-on-listenererror .code}

Emitted when an event listener given by the application throws. The exception is silently ignored internally to not break the internal state. By listening to this event, the application can be aware of exceptions happening in its given event listeners.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`eventName` | String  | The name of the event.
`error`     | Error   | The error happening in the application given event listener.

</div>

</section>


### Observer Events
{: #DataProducer-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### dataProducer.observer.on("close", fn())
{: #dataProducer-observer-on-close .code}

Emitted when the producer is closed for whatever reason.

#### dataProducer.observer.on("pause", fn())
{: #dataProducer-observer-on-pause .code}

Emitted when the data producer is paused.

#### dataProducer.observer.on("resume", fn())
{: #dataProducer-observer-on-resume .code}

Emitted when the data producer is resumed.

</section>
