## PlainRtpTransport
{: #PlainRtpTransport}

A `plainRtpTransport` represents a network path negotiated on which plain RTP and RTCP (no ICE, DTLS or DTLS) is carried.


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
