## DataProducer
{: #DataProducer}

<section markdown="1">

A data producer represents a data source that will be transmitted to the mediasoup router through a WebRTC transport.

</section>


### Methods
{: #DataProducer-methods}

<section markdown="1">

#### dataProducer.GetId()
{: #DataProducer-GetId .code}

Data producer identifier.

> `@returns` const std::string&

#### dataProducer.GetSctpStreamParameters()
{: #DataProducer-GetSctpStreamParameters .code}

The SCTP stream parameters.

> `@returns` [const SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters).

#### dataProducer.GetReadyState()
{: #DataProducer-GetReadyState .code}

The DataChannel ready state.

> `@type` webrtc::DataChannelInterface::DataState

#### dataProducer.GetLabel()
{: #DataProducer-GetLabel .code}

The DataChannel label.

> `@returns` std::string, read only

#### dataProducer.GetProtocol()
{: #DataProducer-GetProtocol .code}

The DataChannel sub-protocol.

> `@returns` std::string, read only

#### dataProducer.GetBufferedAmount()
{: #DataProducer-GetBufferedAmount .code}

The number of bytes of application data (UTF-8 text and binary data) that have been queued using `send()`.

> `@returns` uint64_t, read only

#### dataProducer.GetAppData
{: #DataProducer-GetAppData .code}

Custom data Object provided by the application in the data producer factory method. The app can modify its content at any time.

> `@returns` const nlohmann::json&

#### dataProducer.IsClosed()
{: #DataProducer-IsClosed .code}

Whether the data producer is closed.

> `@returns` bool

#### dataProducer.Close()
{: #DataProducer-Close .code}

Closes the data producer. No more data is transmitted.

<div markdown="1" class="note">
This method should be called when the server side data producer has been closed (and vice-versa).
</div>

#### dataProducer.Send(buffer)
{: #DataProducer-Send .code}

Sends the given data over the corresponding DataChannel. If the data can't be sent at the SCTP level (due to congestion control), it's buffered at the data channel level, up to a maximum of 16MB. If Send is called while this buffer is full, the data channel will be closed abruptly.

So, it's important to use [GetBufferedAmount](#DataProducer-GetBufferedAmount) and [OnBufferedAmountChange](#DataProducerListener-OnBufferAmountChange) to ensure the data channel is used efficiently but without filling this buffer.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`buffer`         | webrtc::DataBuffer& | Data message to be sent. | No |

</div>

</section>
