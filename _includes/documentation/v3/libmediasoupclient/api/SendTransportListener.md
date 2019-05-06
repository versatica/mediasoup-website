## SendTransport::Listener
{: #SendTransportListener}


<section markdown="1">

> `@inherits` [Transport::Listener](#TransportListener)
>
> `@abstract`

This is an abstract class which must be implemented and used according to the API.

</section>


### Events
{: #SendTransportListener-events}

<section markdown="1">

#### SendTransportListener::OnProduce(transport, kind, rtpParameters, appData)
{: #SendtransportListener-OnProduce .code}

Emitted when the transport needs to transmit information about a new producer to the associated server side transport. This event occurs before the [produce()](#transport-produce) method completes.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description   
--------------- | ------- | ----------------
`transport`     | [SendTransport\*](#SendTransport) | send transport instance.
`kind`          | const std::string&  | Producer's media kind ("audio" or "video").
`rtpParameters` | nlohmann::json [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters) | Producer's RTP parameters.
`appData`       | const nlohmann::json&  | Custom application data as given in the `transport.produce()` method.

</div>

<div markdown="1" class="note">
In server side, the application should call [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce).
</div>

```c++
std::future<std::string> Sender::OnProduce(
  mediasoupclient::Transport* transport,
  const std::string& kind,
  json rtpParameters,
  const json& appData)
{
	std::promise<std::string> promise;

	json body =
	{
		{ "transportId",   transport->GetId() },
		{ "kind",          kind               },
		{ "rtpParameters", rtpParameters      },
		{ "appData",       appData            }
	};

	json response = mySignaling.send("transport-produce", body);

	auto it = response.find("id");
	if (it == response.end())
		promise.set_exception(std::make_exception_ptr("'id' missing in response"));

	promise.set_value(it->get<std::string>());

	return promise.get_future();
}
```

</section>
