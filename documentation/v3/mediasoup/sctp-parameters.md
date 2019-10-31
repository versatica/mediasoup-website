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

<div markdown="1" class="note typescript">
TypeScript definition:

```js
import { SctpStreamParameters } from 'mediasoup/lib/SctpParameters';
```
</div>

<div markdown="1" class="note">
* If `ordered` is true then `maxPacketLifeTime` and `maxRetransmits` must be false.

* If `ordered` if false, only one of `maxPacketLifeTime` or `maxRetransmits` can be  true.
</div>

</section>
