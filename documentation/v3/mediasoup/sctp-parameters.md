---
title   : SCTP Parameters
anchors : true
---


# SCTP Parameters

* Will be replaced with the ToC
{: toc}


## Dictionaries
{: #Dictionaries}

<section markdown="1">

#### SctpParameters
{: #SctpParameters .code}

Parameters of the SCTP association.

<div markdown="1" class="table-wrapper L3">

Field            | Type   | Description   | Required  | Default
---------------- | ------ | ------------- | --------- |
`port`           | Number | Must always equal 5000. | Yes |
`OS`             | Number | Initially requested number of outgoing SCTP streams. | Yes |
`MIS`            | Number | Maximum number of incoming SCTP streams. | Yes |
`maxMessageSize` | Number | Maximum allowed size for SCTP messages. | Yes |

</div>

#### NumSctpStreams
{: #NumSctpStreams .code}

<div markdown="1" class="table-wrapper L3">

Field  | Type   | Description   | Required  | Default
------ | ------ | ------------- | --------- |
`OS`   | Number | Initially requested number of outgoing SCTP streams (from 1 to 65535). | No | 1024
`MIS`  | Number | Maximum number of incoming SCTP streams (from 1 to 65535). | No | 1024

</div>

<div markdown="1" class="note">
Both `OS` and `MIS` are part of the SCTP INIT+ACK handshake. `OS` refers to the initial number of outgoing SCTP streams that the server side transport creates (to be used by [DataConsumers](#DataConsumer)), while `MIS` refers to the maximum number of incoming SCTP streams that the server side transport can receive (to be used by [DataProducers](#DataProducer)). So, if the server side transport will just be used to create data producers (but no data consumers), `OS` can be low (~1). However, if data consumers are desired on the server side transport, `OS` must have a proper value and such a proper value depends on whether the remote endpoint supports `SCTP_ADD_STREAMS` extension or not.

* libwebrtc (Chrome, Safari, etc) does not enable `SCTP_ADD_STREAMS` so, if data consumers are required, `OS` should be 1024 (the maximum number of DataChannels that libwebrtc enables).
* Firefox does enable `SCTP_ADD_STREAMS` so, if data consumers are required, `OS` can be lower (16 for instance). The mediasoup transport will allocate and announce more outgoing SCTM streams when needed.
* mediasoup-client provides specific per browser/version `OS` and `MIS` values via the [device.sctpCapabilities](/documentation/v3/mediasoup-client/api/#device-sctpCapabilities) getter.
</div>

#### SctpStreamParameters
{: #SctpStreamParameters .code}

SCTP stream parameters describe the reliability of a certain SCTP stream.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`streamId`         | Number  | SCTP stream id | true    |
`ordered`          | Boolean | Whether data messages must be received in order. if true the messages will be sent reliably. | No | true
`maxPacketLifeTime`| Number | When `ordered` is false indicates the time (in milliseconds) after which a SCTP packet will stop being retransmitted. | No |
`maxRetransmits`| Number | When `ordered` is false indicates the maximum number of times a packet will be retransmitted. | No |

</div>

<div markdown="1" class="note">
* If `ordered` is true then `maxPacketLifeTime` and `maxRetransmits` must be false.

* If `ordered` if false, only one of `maxPacketLifeTime` or `maxRetransmits` can be  true.
</div>

</section>
