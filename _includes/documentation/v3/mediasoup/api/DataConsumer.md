## DataConsumer
{: #DataConsumer}

<section markdown="1">

A consumer represents a [SCTP](https://tools.ietf.org/html/rfc4960) data source being forwarded from a mediasoup router to an endpoint. It's created on top of a transport that defines how the data messages are carried.

</section>


### Dictionaries
{: #DataConsumer-dictionaries}

<section markdown="1">

#### DataConsumerOptions
{: #DataConsumerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`producerId`    | String  | The id of the data producer to consume. | Yes |
`appData`       | Object  | Custom application data. | No | `{ }`

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

The associated producer identifier.

> `@type` String, read only

#### dataConsumer.closed
{: #dataConsumer-closed .code}

Whether the consumer is closed.

> `@type` Boolean, read only

#### dataConsumer.sctpStreamParameters
{: #dataConsumer-sctpStreamParameters .code}

The SCTP stream parameters.

> `@type` [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters), read only

#### dataConsumer.label
{: #dataConsumer-label .code}

The producer label.

> `@type` String , read only

#### dataConsumer.protocol
{: #dataConsumer-protocol .code}

The producer sub-protocol.

> `@type` String , read only

#### dataConsumer.appData
{: #dataConsumer-appData .code}

Custom data Object provided by the application in the consumer factory method. The app can modify its content at any time.

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

Closes the consumer.

#### dataConsumer.getStats()
{: #dataConsumer-getStats .code}

Returns current SCTP statistics of the consumer.

> `@async`
> 
> `@returns` Object

<div markdown="1" class="note">
Check the [SCTP Statistics](/documentation/v3/mediasoup/sctp-statistics/) section for more details.
</div>

### Events
{: #DataConsumer-events}

<section markdown="1">

#### dataConsumer.on("transportclose", fn())
{: #dataConsumer-on-transportclose .code}

Emitted when the transport this consumer belongs to is closed for whatever reason. The consumer itself is also closed.

```javascript
dataConsumer.on("transportclose", () =>
{
  console.log("transport closed so dataConsumer closed");
});
```

#### dataConsumer.on("dataproducerclose", fn())
{: #dataConsumer-on-dataproducerclose .code}

Emitted when the associated producer is closed for whatever reason. The consumer itself is also closed.

```javascript
dataConsumer.on("dataproducerclose", () =>
{
  console.log("associated producer closed so dataConsumer closed");
});
```

</section>


### Observer Events
{: #DataConsumer-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### dataConsumer.observer.on("close", fn())
{: #dataConsumer-observer-on-close .code}

Emitted when the consumer is closed for whatever reason.

</section>
