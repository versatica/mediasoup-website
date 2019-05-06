## Producer::Listener
{: #ProducerListener}


<section markdown="1">

> `@abstract`

This is an abstract class which must be implemented and used according to the API.

</section>


### Events
{: #ProducerListener-events}

<section markdown="1">

#### ProducerListener::OnTransportClose(producer)
{: #ProducerListener-OnTransportClose .code}

Executed when the transport this producer belongs to is closed for whatever reason. The producer itself is also closed.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`producer`  | [Producer\*](#Producer)  | The producer instance executing this method. | Yes |

</div>

```c++
void Sender::OnTransportClose(mediasoupclient::Producer* /*producer*/)
{
	std::cout << "OnTransportClose" << std::endl;
}
```

</section>
