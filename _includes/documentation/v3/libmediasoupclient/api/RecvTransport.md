## RecvTransport
{: #RecvTransport}

<section markdown="1">

> `@inherits` [Transport](#Transport)

A WebRTC receive transport connects a mediasoupclient [Device](#Device) with a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) at media level and enables the reception of media (by means of [Consumer](#Consumer) instances).

Internally, the transport holds a WebRTC [RTCPeerConnection](https://w3c.github.io/webrtc-pc/#dom-rtcpeerconnection) instance.

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### recvTransport.Consume(listener, id, producerId, kind, rtpParameters, appData)
{: #transport-Consume .code}

Instructs the transport to receive an audio or video track to the mediasoup router.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`listener`      | [Consumer::Listener](#ConsumerListener) | Consumer listener. | Yes |
`id`            | const std::string&  | The identifier of the server side consumer. | Yes |
`producerId`    | const std::string&  | The identifier of the server side producer being consumed. | Yes |
`kind`          | const std::string&  | Media kind ("audio" or "video"). | Yes |
`rtpParameters` | const nlohmann::json\* [RtpReceiveParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters) | Receive RTP parameters. | Yes |
`appData`       | nlohmann::json  | Custom application data. | No | `{ }`

</div>

> `@async` blocks current thread
>
> `@returns` [Consumer](#Consumer)

```c++
auto* consumerListener = new MyConsumerListener();

// This will block the current thread until completion.
auto* consumer = recvTransport->Consume(
  consumerListener,
  id, 
  producerId, 
  kind,	
  rtpParameters);
```

#### recvTransport.ConsumeData(listener, id, producerId, label, protocol, appData)
{: #transport-ConsumeData .code}

Instructs the transport to receive data via [DataChannel](https://www.w3.org/TR/webrtc/#rtcdatachannel) from the mediasoup router.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`listener`      | [DataConsumer::Listener](#DataConsumerListener) | Consumer listener. | Yes |
`id`            | const std::string&  | The identifier of the server side consumer. | Yes |
`producerId`    | const std::string&  | The identifier of the server side producer being consumed. | Yes |
`label`         | const std::string& | A label which can be used to distinguish this DataChannel from others. | Yes |
`protocol`      | const std::string& | Name of the sub-protocol used by this DataChannel. | No |
`appData`       | nlohmann::json  | Custom application data. | No | `{ }`

</div>

> `@async` blocks current thread
>
> `@returns` [DataConsumer](#DataConsumer)

```c++
auto* consumerListener = new MyConsumerListener();

// This will block the current thread until completion.
auto* consumer = recvTransport->Consume(
  consumerListener,
  id, 
  "dataChannelLabel", 
  "dataChannelProtocol");
```

</section>
