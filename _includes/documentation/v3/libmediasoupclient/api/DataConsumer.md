## DataConsumer
{: #DataConsumer}

<section markdown="1">

A data consumer represents a data source being transmitted from the mediasoup router to the client application through a WebRTC transport.

</section>


### Methods
{: #DataConsumer-methods}

<section markdown="1">

#### dataConsumer.GetId()
{: #DataConsumer-GetId .code}

Consumer identifier.

> `@returns` const std::string&

#### dataConsumer.GetDataProducerId()
{: #DataConsumer-GetDataProducerId .code}

The associated data producer identifier.

> `@returns` const std::string&

#### dataConsumer.GetSctpStreamParameters()
{: #DataConsumer-GetSctpStreamParameters .code}

The SCTP stream parameters.

> `@returns` [const SctpStreamParameters](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters).

#### dataConsumer.GetReadyState()
{: #DataConsumer-GetReadyState .code}

The DataChannel ready state.

> `@type` webrtc::DataChannelInterface::DataState

#### dataConsumer.GetLabel()
{: #DataConsumer-GetLabel .code}

The DataChannel label.

> `@returns` std::string, read only

#### dataConsumer.GetProtocol()
{: #DataConsumer-GetProtocol .code}

The DataChannel sub-protocol.

> `@returns` std::string, read only

#### dataConsumer.GetAppData()
{: #DataConsumer-GetAppData .code}

Custom data Object provided by the application in the consumer factory method. The app can modify its content at any time.

> `@returns` const nlohmann::json&

#### dataConsumer.IsClosed()
{: #DataConsumer-IsClosed .code}

Whether the consumer is closed.

> `@returns` bool

#### dataConsumer.Close()
{: #DataConsumer-Close .code}

Closes the dataConsumer.

<div markdown="1" class="note">
This method should be called when the server side consumer has been closed (and vice-versa).
</div>

</section>
