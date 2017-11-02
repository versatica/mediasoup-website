## PlainRtpTransport
{: #PlainRtpTransport}

A `plainRtpTransport` represents a network path negotiated on which plain RTP (no ICE, DTLS or DTLS) is carried.


### Properties
{: #PlainRtpTransport-properties}

<section markdown="1">

#### plainRtpTransport.id
{: #plainRtpTransport-id .code}

* Read only

Unique identifier (Integer).

#### plainRtpTransport.closed
{: #plainRtpTransport-closed .code}

* Read only

A Boolean indicating whether the `plainRtpTransport` has been closed.

#### plainRtpTransport.tuple
{: #plainRtpTransport-tuple .code}

* Read only

The [5-Tuple](#Transport-IceSelectedTuple) indicating information about the connection.

</section>


### Methods
{: #PlainRtpTransport-methods}

<section markdown="1">

#### plainRtpTransport.close()
{: #plainRtpTransport-close .code}

Closes the `plainRtpTransport` and triggers a [`close`](#plainRtpTransport-on-close) event.

</section>


### Events
{: #PlainRtpTransport-events}

The `PlainRtpTransport` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### plainRtpTransport.on("close", fn())
{: #plainRtpTransport-on-close .code}

Emitted when the `plainRtpTransport` is closed.

</section>
