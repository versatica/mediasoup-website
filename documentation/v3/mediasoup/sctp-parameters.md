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

Parameters of the mediasoup SCTP association.

<div markdown="1" class="table-wrapper L2">

Field                     | Type   | Description   | Required
------------------------- | ------ | ------------- | ---------
`port`                    | Number | SCTP port. | Yes
`maxSendMessageSize`      | Number | Maximum allowed size for SCTP messages sent by data consumers (in bytes). | Yes
`maxReceiveMessageSize`   | Number | Maximum allowed size for SCTP messages received by data producers (in bytes). | Yes
`sendBufferSize`          | Number | Maximum SCTP send buffer used by data consumers (in bytes). | Yes
`perStreamSendQueueLimit` | Number | Per stream send queue size limit. Similar to `sctpSendBufferSize`, but limiting the size of individual streams. | Yes
`maxReceiverWindowBufferSize` | Number | Maximum received window buffer size (in bytes). This should be a bit larger than the largest sized message you want to be able to receive. | Yes
`isDataChannel` | Boolean | Whether this is a WebRTC based transport (only WebRTC transport is). | Yes

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
