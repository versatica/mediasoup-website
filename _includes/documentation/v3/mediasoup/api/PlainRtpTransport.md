## PlainRtpTransport
{: #PlainRtpTransport}

A `plainRtpTransport` represents a network path negotiated on which plain RTP and RTCP (no ICE nor DTLS) is carried.


### Dictionaries
{: #PlainRtpTransport-dictionaries}

<section markdown="1">

#### PlainRtpTransportOptions
{: #PlainRtpTransport-Options .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`listenIp`    | [TransportListenIp](#Transport-ListenIp)\|String| Listening IP. | Yes |
`rtcpMux`     | Boolean | Use RTCP-mux (RPT and RTCP in the same port). | No | `true`
`comedia`     | Boolean | Whether remote IP:port should be auto-detected based on first RTP/RTCP packet received. If enabled, `connect()` method must not be called. This option is ignored if `multiSource` is set. | No | `false`
`multiSource` | Boolean | Whether RTP/RTCP from different remote IPs:ports is allowed. If set, the transport will just be valid for receiving media (`consume()` cannot be called on it) and `connect()` must not be called. | No | `false`
`appData`     | Object  | Custom application data. | No | `{}`

</div>

#### RemoteParameters
{: #PlainRtpTransport-RemoteParameters .code}

<div markdown="1" class="table-wrapper L3">

Field        | Type    | Description   | Required | Default
------------ | ------- | ------------- | -------- | ---------
`ip`   | String  | Destination IP. | Yes |
`port` | Number | Destination port. | Yes |

</div>

</section>


### Properties
{: #PlainRtpTransport-properties}

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
{: #PlainRtpTransport-methods}

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
`parameters`  | [PlainRtpRemoteParameters](#PlainRtpTransport-RemoteParameters) | Remote parameters. | Yes |

</div>

</section>
