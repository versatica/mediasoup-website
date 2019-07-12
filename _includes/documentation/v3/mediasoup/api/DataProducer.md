## DataProducer
{: #DataProducer}

<section markdown="1">

A data producer represents a [SCTP](https://tools.ietf.org/html/rfc4960) data source being injected into a mediasoup router. It's created on top of a transport that defines how the data messages are carried.

</section>


### Dictionaries
{: #DataProducer-dictionaries}

<section markdown="1">

#### DataProducerOptions
{: #DataProducerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                  | Type    | Description   | Required | Default
---------------        | ------- | ------------- | -------- | ---------
`sctpStreamParameters` | [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters) | SCTP parameters defining how the endpoint is sending the data. | Yes |
`label`                | String | A label which can be used to distinguish this DataChannel from others. | No |
`protocol`             | String | Name of the sub-protocol used by this DataChannel. | No |
`appData`              | Object  | Custom application data. | No | `{ }`

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

#### dataProducer.sctpStreamParameters
{: #dataProducer-sctpStreamParameters .code}

The SCTP stream parameters.

> `@type` [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters), read only

#### dataProducer.label
{: #dataProducer-label .code}

The data producer label.

> `@type` String , read only

#### dataProducer.protocol
{: #dataProducer-protocol .code}

The data producer sub-protocol.

> `@type` String , read only

#### dataProducer.appData
{: #dataProducer-appData .code}

Custom data Object provided by the application in the producer factory method. The app can modify its content at any time.

> `@type` Object, read only

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

Returns current SCTP statistics of the producer.

> `@async`
> 
> `@returns` Object

<div markdown="1" class="note">
Check the [SCTP Statistics](/documentation/v3/mediasoup/rtc-statistics/#DataProducer-Statistics) section for more details.
</div>

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

</section>
