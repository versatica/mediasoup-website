## DataProducer
{: #DataProducer}

<section markdown="1">

A data producer represents a data source that will be transmitted to the mediasoup router through a WebRTC transport.

</section>


### Dictionaries
{: #DataProducer-dictionaries}

<section markdown="1">

#### DataProducerOptions
{: #DataProducerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`ordered`          | Boolean | Whether data messages must be sent in order. if `true` the messages will be sent reliably. | No | true
`maxPacketLifeTime`| Number | When `ordered` is `false` indicates the time (in milliseconds) after which a SCTP packet will stop being retransmitted. | No |
`maxRetransmits`| Number | When `ordered` is `false` indicates the maximum number of times a packet will be retransmitted. | No |
`priority`         | [RtcPriorityType](https://www.w3.org/TR/webrtc/#dom-rtcprioritytype) | Datachannel priority. | No | 'low'
`label`            | String | A label which can be used to distinguish this DataChannel from others. | No | `''`
`protocol`         | String | Name of the sub-protocol used by this DataChannel. | No | `''`
`appData`          | Object  | Custom application data. | No | `{ }`

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

#### dataProducer.readyState
{: #dataProducer-readyState .code}

The DataChannel ready state.

> `@type` [RtcDataChannelState](https://www.w3.org/TR/webrtc/#dom-rtcdatachannelstate), read only

#### dataProducer.label
{: #dataProducer-label .code}

The DataChannel label.

> `@type` String , read only

#### dataProducer.protocol
{: #dataProducer-protocol .code}

The DataChannel sub-protocol.

> `@type` String , read only

#### dataProducer.bufferedAmount
{: #dataProducer-bufferedAmount .code}

The number of bytes of application data (UTF-8 text and binary data) that have been queued using `send()`.

> `@type` Number , read only

#### dataProducer.bufferedAmountLowThreshold
{: #dataProducer-bufferedAmountLowThreshold .code}

Threshold at which the bufferedAmount is considered to be low.

> `@type` Number

#### dataProducer.appData
{: #dataProducer-appData .code}

Custom data Object provided by the application in the data producer factory method. The app can modify its content at any time.

> `@type` Object, read only

</section>


### Methods
{: #DataProducer-methods}

<section markdown="1">

#### dataProducer.close()
{: #dataProducer-close .code}

Closes the data producer. No more media is transmitted.

<div markdown="1" class="note">
This method should be called when the server side data producer has been closed (and vice-versa).
</div>

#### dataProducer.send(data)
{: #dataProducer-send .code}

Sends the given data over the corresponding DataChannel.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`data`         | String\|Blob\|ArrayBuffer\|ArrayBufferView | Data message to be sent. | No |

</div>

</section>


### Events
{: #DataProducer-events}

<section markdown="1">

#### dataProducer.on("transportclose", fn())
{: #dataProducer-on-transportclose .code}

Emitted when the transport this data producer belongs to is closed for whatever reason. The data producer itself is also closed.

```javascript
dataProducer.on("transportclose", () =>
{
  console.log("transport closed so dataProducer closed");
});
```

</section>
