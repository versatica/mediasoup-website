## DataConsumer::Listener
{: #DataConsumerListener}


<section markdown="1">

> `@abstract`

This is an abstract class which must be implemented and used according to the API.

</section>


### Events
{: #DataConsumerListener-events}

<section markdown="1">

#### DataConsumerListener::OnConnecting(consumer)
{: #DataConsumerListener-OnConnecting .code}

Executed when the underlying DataChannel is connecting.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataConsumer\*](#DataConsumer)  | The producer instance executing this method. | Yes |

</div>

#### DataConsumerListener::OnOpen(producer)
{: #DataConsumerListener-OnOpen .code}

Executed when the underlying DataChannel is open.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataConsumer\*](#DataConsumer)  | The producer instance executing this method. | Yes |

</div>

#### DataConsumerListener::OnClosing(consumer)
{: #DataConsumerListener-OnClosing .code}

Executed when the underlying DataChannel is closing.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataConsumer\*](#DataConsumer)  | The producer instance executing this method. | Yes |

</div>

#### DataConsumerListener::OnClose(producer)
{: #DataConsumerListener-OnClose .code}

Executed when the underlying DataChannel is closed for unknown reasons.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataConsumer\*](#DataConsumer)  | The producer instance executing this method. | Yes |

</div>

#### DataConsumerListener::OnTransportClose(consumer)
{: #DataConsumerListener-OnTransportClose .code}

Executed when the transport this consumer belongs to is closed for whatever reason. The consumer itself is also closed.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`consumer`  | [DataConsumer\*](#DataConsumer)  | The consumer instance executing this method. | Yes |

</div>

```c++
void MyConsumerListener::OnTransportClose(mediasoupclient::DataConsumer* consumer)
{
	std::cout << "transport closed" << std::endl;
}
```

#### DataConsumerListener::OnMessage(dataConsumer, buffer)
{: #DataConsumerListener-OnMessage .code}

Executed when a DataChannel message is received.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`consumer`  | [DataConsumer\*](#DataConsumer)  | The consumer instance executing this method. | Yes |
`buffer`    | webrtc::DataBuffer& | Data message received. | No |

</div>

```c++
void MyConsumerListener::OnMessage(DataConsumer* dataConsumer, const webrtc::DataBuffer& buffer)
{
	if (dataConsumer->GetLabel() == "chat")
	{
		std::string message = std::string(buffer.data.data<char>(), buffer.data.size());
		std::cout << "received chat message: " << message << std::endl;
	}
}
```

</section>
