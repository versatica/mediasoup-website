## DataConsumer
{: #DataConsumer}

<section markdown="1">

A data consumer represents a data source being transmitted from the mediasoup router to the client application through a WebRTC transport.

</section>


### Dictionaries
{: #DataConsumer-dictionaries}

<section markdown="1">

#### DataConsumerOptions
{: #DataConsumerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`id`               | String  | The identifier of the server side data consumer. | Yes |
`dataProducerId`   | String  | The identifier of the server side data producer being consumed. | Yes |
`sctpStreamParameters` | [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters) | Receive SCTP parameters. | Yes |
`label`            | String | A label which can be used to distinguish this DataChannel from others. | No | `''`
`protocol`         | String | Name of the sub-protocol used by this DataChannel. | No | `''`
`appData`          | Object  | Custom application data. | No | `{ }`

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

#### dataConsumer.closed
{: #dataConsumer-closed .code}

Whether the data consumer is closed.

> `@type` Boolean, read only

#### dataConsumer.sctpStreamParameters
{: #dataConsumer-sctpStreamParameters .code}

The SCTP stream parameters.

<div markdown="1" class="note">
This data is taken from the associated dataProducer.
</div>

> `@type` [SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters), read only

#### dataConsumer.readyState
{: #dataConsumer-readyState .code}

The DataChannel ready state.

> `@type` [RtcDataChannelState](https://www.w3.org/TR/webrtc/#dom-rtcdatachannelstate), read only

#### dataConsumer.label
{: #dataConsumer-label .code}

The DataChannel label.

<div markdown="1" class="note">
This data is taken from the associated dataProducer.
</div>

> `@type` String , read only

#### dataConsumer.protocol
{: #dataConsumer-protocol .code}

The DataChannel sub-protocol.

<div markdown="1" class="note">
This data is taken from the associated dataProducer.
</div>

> `@type` String , read only

#### dataConsumer.binaryType
{: #dataConsumer-binaryType .code}

The DataChannel binary type: 'blob' or 'arrayBuffer'.

> `@type` String

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

<div markdown="1" class="note">
This method should be called when the server side data consumer has been closed (and vice-versa).
</div>

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

#### dataConsumer.on("open")
{: #dataConsumer-on-open .code}

Emitted when the underlying DataChannel is open.

#### dataConsumer.on("error", fn(error))
{: #dataConsumer-on-error .code}

Emitted when the underlying DataChannel fails to connect.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description
---------| ------- | -----------
`error`  | Error   | Originating error

</div>

#### dataConsumer.on("close")
{: #dataConsumer-on-close .code}

Emitted when the underlying DataChannel is closed for unknown reasons.

#### dataConsumer.on("message", fn(data))
{: #dataConsumer-on-message .code}

Emitted when a DataChannel message is received.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description
---------| ------- | -----------
`data`   | String\|Blob\|ArrayBuffer | Data message received.

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
