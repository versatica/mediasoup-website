## Consumer::Listener
{: #ConsumerListener}


<section markdown="1">

> `@abstract`

This is an abstract class which must be implemented and used according to the API.

</section>


### Events
{: #ConsumerListener-events}

<section markdown="1">

#### ConsumerListener::OnTransportClose(consumer)
{: #ConsumerListener-OnTransportClose .code}

Executed when the transport this consumer belongs to is closed for whatever reason. The consumer itself is also closed.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`consumer`  | [Consumer\*](#Consumer)  | The consumer instance executing this method. | Yes |

</div>

```c++
void MyConsumerListener::OnTransportClose(mediasoupclient::Consumer* consumer)
{
	std::cout << "transport closed" << std::endl;
}
```

</section>
