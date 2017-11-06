## RtpStreamer
{: #RtpStreamer}

An `rtpStreaer` represents both a specialized [Consumer](#Consumer) and a [PlainRtpTransport](#PlainRtpTransport). It's created by calling the [`room.createRtpStreamer()`](#room-createRtpStreamer) by passing a [Producer](#Producer) and [RtpStreamOptions](#RtpStreamer-RtpStreamerOptions).

The RTP and RTCP received by the `producer` will be relayed/mirrored to the given IP and port using plain RTP/RTCP.


### Dictionaries
{: #RtpStreamer-dictionaries}

<section markdown="1">

#### RtpStreamerOptions
{: #RtpStreamer-RtpStreamerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field        | Type    | Description   | Required | Default
------------ | ------- | ------------- | -------- | ---------
`remoteIP`   | String  | Destination IP. | Yes |
`remotePort` | Integer | Destination port. | Yes |

</div>

</section>


### Properties
{: #RtpStreamer-properties}

<section markdown="1">

#### rtpStreamer.consumer
{: #rtpStreamer-consumer .code}

* Read only

The generated [Consumer](#Consumer) instance.

#### rtpStreamer.transport
{: #rtpStreamer-transport .code}

* Read only

The generated [PlainRtpTransport](#PlainRtpTransport) instance.

</section>


### Methods
{: #RtpStreamer-methods}

<section markdown="1">

#### rtpStreamer.close()
{: #rtpStreamer-close .code}

Closes the `rtpStreamer`, including its `consumer` and `transport`, and triggers a [`close`](#rtpStreamer-on-close) event.

</section>


### Events
{: #RtpStreamer-events}

The `RtpStreamer` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### rtpStreamer.on("close", fn())
{: #rtpStreamer-on-close .code}

Emitted when the `rtpStreamer` is closed.

</section>
