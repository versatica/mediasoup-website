## Transport
{: #Transport}

A `transport` represents a ICE+DTLS virtual connection over which a remote peer sends and receives media streams.

The `Transport` instance is created by means of [peer.createTransport()](#peer-createTransport). It binds UDP and TCP ports (depending on the given parameters) and waits for ICE Binding Requests coming from the `peer`. Once ICE procedures are done, DTLS connection must be established.

<div markdown='1' class='note'>

**mediasoup** is a [ICE Lite](https://tools.ietf.org/html/rfc5245#section-2.7) implementation, meaning that it will never initiate ICE connections but expect ICE Binding Requests on its open ports.

The remote media peer must be instructed about this. In the context of SDP this is achieved by signaling `a=ice-lite` in the remote SDP.

</div>


### Dictionaries
{: #Transport-dictionaries}

<section markdown='1'>

#### TransportOptions
{: #Transport-TransportOptions .code}

<div markdown='1' class='table-wrapper'>

Option                   | Type    | Description   | Default
------------------------ | ------- | ------------- | -------------
`udp`                    | Boolean | Offer UDP ICE candidates. | `true`
`tcp`                    | Boolean | Offer TCP ICE candidates. | `true`
`preferIPv4`             | Boolean | Prefer IPv4 over IPv6 ICE candidates. | `false`
`preferIPv6`             | Boolean | Prefer IPv6 over IPv4 ICE candidates. | `false`
`preferUdp`              | Boolean | Prefer UDP over TCP ICE candidates. | `false`
`preferTcp`              | Boolean | Prefer TCP over UDP ICE candidates. | `false`

</div>

#### IceParameters
{: #Transport-IceParameters .code}

<div markdown='1' class='table-wrapper'>

Field              | Type    | Description   
------------------ | ------- | ----------------
`usernameFragment` | String  | ICE username fragment.
`password`         | String  | ICE password.

</div>

#### IceCandidate
{: #Transport-IceCandidate .code}

<div markdown='1' class='table-wrapper'>

Field              | Type    | Description   
------------------ | ------- | ----------------
`foundation`       | String  | Unique identifier that allows ICE to correlate candidates that appear on multiple `transports`.
`priority`         | Number  | The assigned priority of the candidate.
`ip`               | String  | The IP address of the candidate.
`protocol`         | String  | The protocol of the candidate ('udp' / 'tcp').
`port`             | Number  | The port for the candidate.
`type`             | String  | The type of candidate (always 'host').
`tcpType`          | String  | The type of TCP candidate (always 'passive').

</div>

#### IceSelectedTuple
{: #Transport-IceSelectedTuple .code}

<div markdown='1' class='table-wrapper'>

Field              | Type    | Description   
------------------ | ------- | ----------------
`localIP`          | String  | Local IP of the tuple.
`localPort`        | Number  | Local port of the tuple.
`remoteIP`         | String  | Remote IP of the tuple.
`remotePort`       | Number  | Remote port of the tuple.
`protocol`         | String  | The protocol of the tuple ('udp' / 'tcp').

</div>

#### LocalDtlsParameters
{: #Transport-LocalDtlsParameters .code}

<div markdown='1' class='table-wrapper'>

Field           | Type    | Description   
--------------- | ------- | ----------------
`role`          | String  | DTLS role ('auto' / 'client' / 'server').
`fingerprints`  | [LocalDtlsFingerprints](#Transport-LocalDtlsFingerprints) | Local DTLS fingerprints.

</div>

#### LocalDtlsFingerprints
{: #Transport-LocalDtlsFingerprints .code}

Map of DTLS algorithms (as defined in the "Hash function Textual Names" registry initially specified in [RFC4572 Section 8](http://tools.ietf.org/html/rfc4572#section-8)) and their corresponding certificate fingerprint values (in lowercase hex string as expressed utilizing the syntax of 'fingerprint' in [RFC4572 Section 5](http://tools.ietf.org/html/rfc4572#section-5)).

<div markdown='1' class='table-wrapper'>

Field             | Type    | Description   
----------------- | ------- | ----------------
`sha-1`           | String  | SHA-1 certificate fingerprint.
`sha-224`         | String  | SHA-224 certificate fingerprint.
`sha-256`         | String  | SHA-256 certificate fingerprint.
`sha-384`         | String  | SHA-384 certificate fingerprint.
`sha-512`         | String  | SHA-512 certificate fingerprint.

</div>

#### RemoteDtlsParameters
{: #Transport-RemoteDtlsParameters .code}

<div markdown='1' class='table-wrapper'>

Field           | Type    | Description   
--------------- | ------- | ----------------
`role`          | String  | DTLS role ('auto' / 'client' / 'server').
`fingerprint`   | [RemoteDtlsFingerprint](#Transport-RemoteDtlsFingerprint) | Remote DTLS fingerprint.

</div>

#### RemoteDtlsFingerprint
{: #Transport-RemoteDtlsFingerprint .code}

<div markdown='1' class='table-wrapper'>

Field           | Type    | Description   
--------------- | ------- | ----------------
`algorithm`     | String  | Hash function algorithm ('sha-1' / 'sha-224' / 'sha-256' / 'sha-384' / 'sha-512').
`value`         | String  | Certificate fingerprint in lowercase hex.

</div>

</section>


### Properties
{: #Transport-properties}

<section markdown='1'>

#### transport.closed
{: #transport-closed .code}

A boolean indicating whether the `transport` has been closed.

#### transport.iceRole
{: #transport-iceRole .code}

String indicating the ICE role of the `transport`. Due to the ICE Lite design, this is always 'controlled'.

#### transport.iceLocalParameters
{: #transport-iceLocalParameters .code}

Local [IceParameters](#Transport-IceParameters) of the `transport`.

#### transport.iceLocalCandidates
{: #transport-iceLocalCandidates .code}

Sequence of local [IceCandidate](#Transport-IceCandidate) associated to this `transport`.

#### transport.iceSelectedTuple
{: #transport-iceSelectedTuple .code}

Returns the selected [IceSelectedTuple](#Transport-IceSelectedTuple) indicating information about the selected ICE candidate pair.

It returns `undefined` if ICE is not yet established (no working candidate pair was found).

#### transport.iceState
{: #transport-iceState .code}

String indicating the current ICE state of the `transport`.

<div markdown='1' class='table-wrapper'>

iceState       | Description  
-------------- | -------------
'new'          | No ICE Binding Requests have been received yet.
'connected'    | Valid ICE Binding Request have been received, but none with USE-CANDIDATE attribute. Outgoing media is allowed.
'completed'    | ICE Binding Request with USE_CANDIDATE attribute has been received. Media in both directions is now allowed.
'disconnected' | ICE was 'connected' or 'completed' but it has suddenly failed (currently this can just happen if the selected tuple has 'tcp' protocol).
'closed'       | ICE state when the `transport` has been closed.

</div>

#### transport.dtlsLocalParameters
{: #transport-dtlsLocalParameters .code}

[LocalDtlsParameters](#Transport-LocalDtlsParameters) of the `transport`.

#### transport.dtlsState
{: #transport-dtlsState .code}

String indicating the current DTLS state of the `transport`.

<div markdown='1' class='table-wrapper'>

dtlsState      | Description  
-------------- | -------------
'new'          | DTLS procedures not yet initiated.
'connecting'   | DTLS connecting.
'connected'    | DTLS successfully connected (SRTP keys already extracted).
'failed'       | DTLS connection failed.
'closed'       | DTLS state when the `transport` has been closed.

</div>

</section>


### Methods
{: #Transport-methods}

<section markdown='1'>

*TBD*

</section>


### Events
{: #Transport-events}

The `Transport` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown='1'>

*TBD*

</section>
