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
{: #SendTransportListener-OnProduce .code}

Emitted when the transport needs to transmit information about a new producer to the associated server side transport. This event occurs before the [produce()](#transport-produce) method completes.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description   
--------------- | ------- | ----------------
`transport`     | [SendTransport\*](#SendTransport) | SendTransport instance.
`kind`          | const std::string&  | Producer's media kind ("audio" or "video").
`rtpParameters` | nlohmann::json [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters) | Producer's RTP parameters.
`appData`       | const nlohmann::json&  | Custom application data as given in the `transport.produce()` method.

</div>

> `@returns` std::future\<std::string\> ID of the producer created in server side mediasoup

<div markdown="1" class="note">
In server side, the application should call [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce).
</div>

```c++
std::future<std::string> MySendTransportListener::OnProduce(
  mediasoupclient::Transport* transport,
  const std::string& kind,
  json rtpParameters,
  const json& appData
)
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

  // [...] Let's assume code execution continues once we get a success response
  // from the server.

  // Read the id in the response.
	auto idIt = response.find("id");
	if (idIt == response.end() || !idIt->is_string())
  {
		promise.set_exception(
      std::make_exception_ptr("'id' missing/invalid in response"));
  }

  // Fullfill the promise with the id in the response and return its future.
	promise.set_value(idIt->get<std::string>());

	return promise.get_future();
}
```

#### SendTransportListener::OnProduceData(transport, sctpStreamParameters, label, protocol, appData)
{: #SendTransportListener-OnProduceData .code}

Emitted when the transport needs to transmit information about a new data producer to the associated server side transport. This event occurs before the [produceData()](#SendTransport-ProduceData) method completes.


<div markdown="1" class="table-wrapper L3">

Argument               | Type    | Description   
---------------        | ------- | ----------------
`transport`            | [SendTransport\*](#SendTransport) | SendTransport instance.
`sctpStreamParameters` | const [SctpStreamParameters&](/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters)
`label`                | const std::string& | A label which can be used to distinguish this DataChannel from others. | No |
`protocol`             | const std::string& | Name of the sub-protocol used by this DataChannel. | No |
`appData`              | const nlohmann::json&  | Custom application data as given in the `transport.produceData()` method.

</div>

> `@returns` std::future\<std::string\> ID of the data producer created in server side mediasoup

<div markdown="1" class="note">
In server side, the application should call [transport.produceData()](/documentation/v3/mediasoup/api/#transport-producedata).
</div>

```c++
std::future<std::string> MySendTransportListener::OnProduceData(
		SendTransport* transport,
		const nlohmann::json& sctpStreamParameters,
		const std::string& label,
		const std::string& protocol,
		const nlohmann::json& appData);
)
{
	std::promise<std::string> promise;

	json body =
	{
		{ "transportId",          transport->GetId()   },
		{ "sctpStreamParameters", sctpStreamParameters },
		{ "label",                label                },
		{ "protocol",             protocol             },
		{ "appData",              appData              }
	};

	json response = mySignaling.send("transport-produce-data", body);

  // [...] Let's assume code execution continues once we get a success response
  // from the server.

  // Read the id in the response.
	auto idIt = response.find("id");
	if (idIt == response.end() || !idIt->is_string())
  {
		promise.set_exception(
      std::make_exception_ptr("'id' missing/invalid in response"));
  }

  // Fullfill the promise with the id in the response and return its future.
	promise.set_value(idIt->get<std::string>());

	return promise.get_future();
}
```
</section>
