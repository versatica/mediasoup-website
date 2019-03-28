## Transport
{: #Transport}

<section markdown="1">

A transport represents a path for sending and/or receiving audio/video RTP.

mediasoup implements the following transport types:

* [WebRtcTransport](#WebRtcTransport)
* [PlainRtpTransport](#PlainRtpTransport)
* [PipeTransport](#PipeTransport)

</section>


### Dictionaries
{: #Transport-dictionaries}

<section markdown="1">

#### TransportListenIp
{: #Transport-ListenIp .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`ip`          | String  | Listening IPv4 or IPv6. | Yes      |
`announcedIp` | String  | Announced IPv4 or IPv6 (useful when running mediasoup behind NAT with private IP). | No      |

</div>

</section>

