## Transport
{: #Transport}

A `transport` represents a ICE+DTLS virtual connection over which a remote peer sends and receives media streams.

The `Transport` instance is created by means of [`peer.createTransport()`](#peer-createTransport). It binds UDP and TCP ports (depending on the given parameters) and waits for ICE Binding Requests coming from the `peer`. Once ICE procedures are done, DTLS connection must be established.

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
`role`          | [DtlsRole](#Transport-DtlsRole) | DTLS role ('auto' by default).
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


### Enums
{: #Transport-enums}

<section markdown='1'>

#### IceState
{: #Transport-IceState .code}

<div markdown='1' class='table-wrapper'>

Value          | Description  
-------------- | -------------
'new'          | No ICE Binding Requests have been received yet.
'connected'    | Valid ICE Binding Request have been received, but none with USE-CANDIDATE attribute. Outgoing media is allowed.
'completed'    | ICE Binding Request with USE_CANDIDATE attribute has been received. Media in both directions is now allowed.
'disconnected' | ICE was 'connected' or 'completed' but it has suddenly failed (currently this can just happen if the selected tuple has 'tcp' protocol).
'closed'       | ICE state when the `transport` has been closed.

</div>

#### DtlsRole
{: #Transport-DtlsRole .code}

<div markdown='1' class='table-wrapper'>

Value          | Description  
-------------- | -------------
'auto'         | The DTLS role is determined based on the resolved ICE role (the 'controlled' role acts as DTLS client, the 'controlling' role acts as DTLS server'). Since **mediasoup** is a ICE Lite implementation it always behaves as ICE 'controlled'.
'client'       | DTLS client role. **mediasoup** transitions to DTLS client when [`transport.setRemoteDtlsParameters()`](#transport-setRemoteDtlsParameters) is called with `role` 'server' or 'auto'.
'server'       | DTLS server role. **mediasoup** transitions to DTLS server when [`transport.setRemoteDtlsParameters()`](#transport-setRemoteDtlsParameters) is called with 'client' `role`.

</div>

#### DtlsState
{: #Transport-DtlsState .code}

<div markdown='1' class='table-wrapper'>

Value          | Description  
-------------- | -------------
'new'          | DTLS procedures not yet initiated.
'connecting'   | DTLS connecting.
'connected'    | DTLS successfully connected (SRTP keys already extracted).
'failed'       | DTLS connection failed.
'closed'       | DTLS state when the `transport` has been closed.

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

Sequence of local [IceCandidate](#Transport-IceCandidate) Objects associated to this `transport`.

#### transport.iceSelectedTuple
{: #transport-iceSelectedTuple .code}

The selected [IceSelectedTuple](#Transport-IceSelectedTuple) indicating information about the selected ICE candidate pair.

It is `undefined` if ICE is not yet established (no working candidate pair was found).

#### transport.iceState
{: #transport-iceState .code}

The current [IceState](#Transport-IceState) of the `transport`.

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

The current [DtlsState](#Transport-DtlsState) of the `transport`.

</section>


### Methods
{: #Transport-methods}

<section markdown='1'>

#### transport.close()
{: #transport-close .code}

Closes the `transport` and triggers a [`close](#transport-on-close) event.

#### transport.dump()
{: #transport-dump .code}

Returns a Promise that resolves to an Object containing the current status and details of the `transport`.

*TBD:* Document it.

#### transport.setRemoteDtlsParameters(parameters)
{: #transport-setRemoteDtlsParameters .code}

Set remote DTLS parameters. Returns a Promise that resolves to this `transport`. If something goes wrong the Promise is rejected with the corresponding `Error` object. 

<div markdown='1' class='table-wrapper'>

Argument   | Type    | Required  | Description  
---------- | ------- | --------- | -------------
`options`  | [RemoteDtlsParameters](#Transport-RemoteDtlsParameters)  | Yes | Remote DTLS parameters.

</div>

Usage example:

```javascript
transport.setRemoteDtlsParameters({
  role        : 'server',
  fingerprint : {
    algorithm : 'sha-1',
    value     : '751b8193b7ed277e42bed6c48ef7043a49ce3faa'
  }
})
  .then((transport) => {
    console.log('remote DTLS parameters set');
  })
  .catch((error) => {
    console.error('remote DTLS parameters failed: %o', error);
  });
```

</section>


### Events
{: #Transport-events}

The `Transport` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown='1'>

#### transport.on('close', fn(error))
{: #transport-on-close .code}

Emitted when the `transport` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### transport.on('iceselectedtuplechange', fn(iceSelectedTuple))
{: #transport-on-iceselectedtuplechange .code}

Emitted when the ICE selected tuple changes.

<div markdown='1' class='table-wrapper'>

Callback argument | Type    | Description   
----------------- | ------- | ----------------
`iceSelectedTuple`| [IceSelectedTuple](#Transport-IceSelectedTuple) | The new ICE selected tuple.

</div>

#### transport.on('icestatechange', fn(iceState))
{: #transport-on-icestatechange .code}

Emitted when the ICE state changes.

<div markdown='1' class='table-wrapper'>

Callback argument | Type    | Description   
----------------- | ------- | ----------------
`iceState`        | [IceState](#Transport-IceState) | The new ICE state.

</div>

#### transport.on('dtlsstatechange', fn(dtlsState))
{: #transport-on-dtlsstatechange .code}

Emitted when the DTLS state changes.

<div markdown='1' class='table-wrapper'>

Callback argument | Type    | Description   
----------------- | ------- | ----------------
`dtlsState`       | [DtlsState](#Transport-DtlsState) | The new DTLS state.

</div>

</section>
