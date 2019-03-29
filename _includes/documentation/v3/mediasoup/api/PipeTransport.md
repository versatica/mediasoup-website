## PipeTransport
{: #PipeTransport}

<section markdown="1">

A `plainRtpTransport` represents a network path negotiated on which plain RTP and RTCP (no ICE nor DTLS) is carried.

> `@inherits` [Transport](#Transport)
> 
</section>


### Dictionaries
{: #PipeTransport-dictionaries}

<section markdown="1">

#### PipeTransportOptions
{: #PipeTransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`listenIp`    | [TransportListenIp](#TransportListenIp)\|String| Listening IP address. | Yes |
`appData`     | Object  | Custom application data. | No | `{}`

</div>

#### RemoteParameters
{: #PipeTransport-RemoteParameters .code}

<div markdown="1" class="table-wrapper L3">

Field        | Type    | Description   | Required | Default
------------ | ------- | ------------- | -------- | ---------
`ip`   | String  | Destination IP. | Yes |
`port` | Number | Destination port. | Yes |

</div>

</section>


### Properties
{: #PipeTransport-properties}

<section markdown="1">

#### plainRtpTransport.id
{: #plainRtpTransport-id .code}

* Read only

Unique identifier (Number).

#### plainRtpTransport.closed
{: #plainRtpTransport-closed .code}

* Read only

A Boolean indicating whether the `plainRtpTransport` has been closed.

#### plainRtpTransport.tuple
{: #plainRtpTransport-tuple .code}

* Read only

The [5-Tuple](#Transport-IceSelectedTuple) indicating information about the connection.

#### plainRtpTransport.localIP
{: #plainRtpTransport-localIP .code}

* Read only

The `local IP address` (String) of the `transport`.

#### plainRtpTransport.localPort
{: #plainRtpTransport-localPort .code}

* Read only

The `local port` (Number) of the `transport`.

</section>


### Methods
{: #PipeTransport-methods}

<section markdown="1">

#### plainRtpTransport.close()
{: #plainRtpTransport-close .code}

Closes the `plainRtpTransport`.

#### plainRtpTransport.setRemoteParameters(parameters)
{: #plainRtpTransport-setRemoteParameters .code}

Set the `remote IP address` and `port` for the `plainRtpTransport`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`parameters`  | [PlainRtpRemoteParameters](#PipeTransport-RemoteParameters) | Remote parameters. | Yes |

</div>

</section>
