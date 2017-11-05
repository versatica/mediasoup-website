## Transport
{: #Transport}

A `transport` represents a path for sending or receiving audio/video RTP.

For more information, check the [Glossary](/documentation/glossary#Glossary-Transport) section.

Currently **mediasoup** implements two transport types:

* [WebRtcTransport](#WebRtcTransport)
* [PlainRtpTransport](#PlainRtpTransport)


### Dictionaries
{: #Transport-dictionaries}

<section markdown="1">

#### IceParameters
{: #Transport-IceParameters .code}

<div markdown="1" class="table-wrapper L3">

Field               | Type    | Description   | Required | Default
------------------- | ------- | ------------- | -------- | ---------
`usernameFragment`  | String  | ICE username fragment. | No |
`password`          | String  | ICE password. | No |
`iceLite`           | Boolean | ICE Lite.     | No |

</div>

#### IceCandidate
{: #Transport-IceCandidate .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`foundation`       | String  | Unique identifier that allows ICE to correlate candidates that appear on multiple `transports`. | Yes |
`priority`         | Integer | The assigned priority of the candidate. | Yes |
`ip`               | String  | The IP address of the candidate. | Yes |
`protocol`         | String  | The protocol of the candidate ("udp" / "tcp"). | Yes |
`port`             | Integer | The port for the candidate. | Yes |
`type`             | String  | The type of candidate (always "host"). | Yes |
`tcpType`          | String  | The type of TCP candidate (always "passive"). | No |

</div>

#### IceSelectedTuple
{: #Transport-IceSelectedTuple .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`localIP`          | String  | Local IP of the tuple. | Yes |
`localPort`        | Integer | Local port of the tuple. | Yes |
`remoteIP`         | String  | Remote IP of the tuple. | Yes |
`remotePort`       | Integer | Remote port of the tuple. | Yes |
`protocol`         | String  | The protocol of the tuple ("udp" / "tcp"). | Yes |

</div>

#### LocalDtlsParameters
{: #Transport-LocalDtlsParameters .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`role`          | [DtlsRole](#Transport-DtlsRole) | Local DTLS role. | No | "auto"
`fingerprints`  | [LocalDtlsFingerprints](#Transport-LocalDtlsFingerprints) | Local DTLS fingerprints. | Yes |

</div>

#### LocalDtlsFingerprints
{: #Transport-LocalDtlsFingerprints .code}

Map of DTLS algorithms (as defined in the "Hash function Textual Names" registry initially specified in [RFC 4572](http://tools.ietf.org/html/rfc4572#section-8) Section 8) and their corresponding certificate fingerprint values (in lowercase hex string as expressed utilizing the syntax of "fingerprint" in [RFC 4572](http://tools.ietf.org/html/rfc4572#section-5) Section 5).

<div markdown="1" class="table-wrapper L3">

Field             | Type    | Description   | Required | Default
----------------- | ------- | ------------- | -------- | ---------
`sha-1`           | String  | SHA-1 certificate fingerprint. | Yes |
`sha-224`         | String  | SHA-224 certificate fingerprint. | Yes |
`sha-256`         | String  | SHA-256 certificate fingerprint. | Yes |
`sha-384`         | String  | SHA-384 certificate fingerprint. | Yes |
`sha-512`         | String  | SHA-512 certificate fingerprint. | Yes |

</div>

#### RemoteDtlsParameters
{: #Transport-RemoteDtlsParameters .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`role`          | [DtlsRole](#Transport-DtlsRole) | Remote DTLS role. | No | "auto"
`fingerprint`   | [RemoteDtlsFingerprint](#Transport-RemoteDtlsFingerprint) | Remote DTLS fingerprint. | Yes |

</div>

#### RemoteDtlsFingerprint
{: #Transport-RemoteDtlsFingerprint .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`algorithm`     | String  | Hash function algorithm ("sha-1" / "sha-224" / "sha-256" / "sha-384" / "sha-512"). | Yes |
`value`         | String  | Certificate fingerprint in lowercase hex. | Yes |

</div>

</section>


### Enums
{: #Transport-enums}

<section markdown="1">

#### IceState
{: #Transport-IceState .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"new"          | No ICE Binding Requests have been received yet.
"connected"    | Valid ICE Binding Request have been received, but none with USE-CANDIDATE attribute. Outgoing media is allowed.
"completed"    | ICE Binding Request with USE_CANDIDATE attribute has been received. Media in both directions is now allowed.
"disconnected" | ICE was "connected" or "completed" but it has suddenly failed (currently this can just happen if the selected tuple has "tcp" protocol).
"closed"       | ICE state when the `transport` has been closed.

</div>

#### DtlsRole
{: #Transport-DtlsRole .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"auto"         | The DTLS role is determined based on the resolved ICE role (the "controlled" role acts as DTLS client, the "controlling" role acts as DTLS server"). Since **mediasoup** is a ICE Lite implementation it always behaves as ICE "controlled".
"client"       | DTLS client role. **mediasoup** transitions to DTLS client when [`transport.setRemoteDtlsParameters()`](#transport-setRemoteDtlsParameters) is called with `role` "server" or "auto".
"server"       | DTLS server role. **mediasoup** transitions to DTLS server when [`transport.setRemoteDtlsParameters()`](#transport-setRemoteDtlsParameters) is called with "client" `role`.

</div>

#### DtlsState
{: #Transport-DtlsState .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"new"          | DTLS procedures not yet initiated.
"connecting"   | DTLS connecting.
"connected"    | DTLS successfully connected (SRTP keys already extracted).
"failed"       | DTLS connection failed.
"closed"       | DTLS state when the `transport` has been closed.

</div>

</section>
