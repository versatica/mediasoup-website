## DataProducer::Listener
{: #DataProducerListener}


<section markdown="1">

> `@abstract`

This is an abstract class which must be implemented and used according to the API.

</section>


### Events
{: #DataProducerListener-events}

<section markdown="1">

#### DataProducerListener::OnOpen(producer)
{: #DataProducerListener-OnOpen .code}

Executed when the underlying DataChannel is open.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataProducer\*](#DataProducer)  | The producer instance executing this method. | Yes |

</div>

#### DataProducerListener::OnClose(producer)
{: #DataProducerListener-OnClose .code}

Executed when the underlying DataChannel is closed for unknown reasons.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataProducer\*](#DataProducer)  | The producer instance executing this method. | Yes |

</div>

#### DataProducerListener::OnBufferAmountChange(producer, sentDataSize)
{: #DataProducerListener-OnBufferAmountChange .code}

Executed when the DataChannel buffered amount of bytes changes.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataProducer\*](#DataProducer)  | The producer instance executing this method. | Yes |
`sentDataSize`  | uint64_t  | The amount of data sent. | Yes |

</div>

#### DataProducerListener::OnTransportClose(producer)
{: #DataProducerListener-OnTransportClose .code}

Executed when the transport this producer belongs to is closed for whatever reason. The producer itself is also closed.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [DataProducer\*](#DataProducer)  | The producer instance executing this method. | Yes |

</div>

```c++
void MyProducerListener::OnTransportClose(mediasoupclient::Producer* producer)
{
	std::cout << "transport closed" << std::endl;
}
```

</section>
