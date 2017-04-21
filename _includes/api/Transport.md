## Transport
{: #Transport}

A `transport` represents a ICE+DTLS virtual connection over which a remote peer sends and receives media streams.

The `Transport` instance is created by means of [`peer.createTransport()`](#peer-createTransport). It binds UDP and TCP ports (depending on the given parameters) and waits for ICE Binding Requests coming from the `peer`. Once ICE procedures are done, DTLS connection must be established.

<div markdown="1" class="note">

**mediasoup** is a [ICE Lite](https://tools.ietf.org/html/rfc5245#section-2.7) implementation, meaning that it will never initiate ICE connections but expect ICE Binding Requests on its open ports.

The remote media peer must be instructed about this. In the context of SDP this is achieved by signaling `a=ice-lite` in the remote SDP.

</div>


### Dictionaries
{: #Transport-dictionaries}

<section markdown="1">

#### TransportOptions
{: #Transport-TransportOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`udp`                    | Boolean | Offer UDP ICE candidates. | No | `true`
`tcp`                    | Boolean | Offer TCP ICE candidates. | No | `true`
`preferIPv4`             | Boolean | Prefer IPv4 over IPv6 ICE candidates. | No | `false`
`preferIPv6`             | Boolean | Prefer IPv6 over IPv4 ICE candidates. | No | `false`
`preferUdp`              | Boolean | Prefer UDP over TCP ICE candidates. | No | `false`
`preferTcp`              | Boolean | Prefer TCP over UDP ICE candidates. | No | `false`

</div>

#### IceParameters
{: #Transport-IceParameters .code}

<div markdown="1" class="table-wrapper L3">

Field               | Type    | Description   | Required | Default
------------------- | ------- | ------------- | -------- | ---------
`usernameFragment`  | String  | ICE username fragment. | No |
`password`          | String  | ICE password. | No |

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


### Properties
{: #Transport-properties}

<section markdown="1">

#### transport.id
{: #transport-id .code}

* Read only

Unique identifier (number).

#### transport.closed
{: #transport-closed .code}

* Read only

A Boolean indicating whether the `transport` has been closed.

#### transport.iceRole
{: #transport-iceRole .code}

* Read only

String indicating the ICE role of the `transport`. Due to the ICE Lite design, this is always "controlled".

#### transport.iceLocalParameters
{: #transport-iceLocalParameters .code}

* Read only

Local [IceParameters](#Transport-IceParameters) of the `transport`.

#### transport.iceLocalCandidates
{: #transport-iceLocalCandidates .code}

* Read only

Sequence of local [IceCandidate](#Transport-IceCandidate) Objects associated to this `transport`.

#### transport.iceState
{: #transport-iceState .code}

* Read only

The current [IceState](#Transport-IceState) of the `transport`.

#### transport.iceSelectedTuple
{: #transport-iceSelectedTuple .code}

* Read only

The selected [IceSelectedTuple](#Transport-IceSelectedTuple) indicating information about the selected ICE candidate pair.

It is `undefined` if ICE is not yet established (no working candidate pair was found).

#### transport.dtlsLocalParameters
{: #transport-dtlsLocalParameters .code}

* Read only

[LocalDtlsParameters](#Transport-LocalDtlsParameters) of the `transport`.

#### transport.dtlsState
{: #transport-dtlsState .code}

* Read only

The current [DtlsState](#Transport-DtlsState) of the `transport`.

#### transport.dtlsRemoteCert
{: #transport-dtlsRemoteCert .code}

* Read only

The remote certificate in PEM format (String). It is set once [`dtlsState`](#transport-dtlsState) becomes "connected".

<div markdown="1" class="note">

The application may want to inspect the remote certificate for authorization purposes by using some certificates utility such as the Node [pem](https://github.com/andris9/pem) module.

</div>

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### transport.close()
{: #transport-close .code}

Closes the `transport` and triggers a [`close`](#transport-on-close) event.

#### transport.dump()
{: #transport-dump .code}

For debugging purposes. Returns a Promise that resolves to an Object containing the `transport` internals.

#### transport.setRemoteDtlsParameters(parameters)
{: #transport-setRemoteDtlsParameters .code}

Set remote DTLS parameters. Returns a Promise that resolves to this `transport`. If something goes wrong the Promise is rejected with the corresponding `Error` object. 

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`options`  | [RemoteDtlsParameters](#Transport-RemoteDtlsParameters) | Remote DTLS parameters. | Yes |

</div>

Usage example:

```javascript
transport.setRemoteDtlsParameters({
    role        : "server",
    fingerprint : {
      algorithm : "sha-1",
      value     : "751b8193b7ed277e42bed6c48ef7043a49ce3faa"
    }
  })
  .then((transport) => {
    console.log("remote DTLS parameters set");
  })
  .catch((error) => {
    console.error("remote DTLS parameters failed: %o", error);
  });
```

#### transport.setMaxBitrate(bitrate)
{: #transport-setMaxBitrate .code}

Set maximum uplink bitrate for media streams sent by the remote endpoint over this `transport`. Returns a Promise that resolves to this `transport`. If something goes wrong the Promise is rejected with the corresponding `Error` object. 

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`bitrate`  | Number  | Maximum uplink bitrate in `bps`. | Yes | 0 (no limit)

</div>

Usage example:

```javascript
transport.setMaxBitrate(250000);
```

#### transport.changeUfragPwd()
{: #transport-changeUfragPwd .code}

Set new local ICE `usernameFragment` and `password`. Useufl to produce a ICE restart. Returns a Promise that resolves to this `transport`. If something goes wrong the Promise is rejected with the corresponding `Error` object. 

</section>


### Events
{: #Transport-events}

The `Transport` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### transport.on("close", fn(error))
{: #transport-on-close .code}

Emitted when the `transport` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### transport.on("iceselectedtuplechange", fn(iceSelectedTuple))
{: #transport-on-iceselectedtuplechange .code}

Emitted when the ICE selected tuple changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`iceSelectedTuple`| [IceSelectedTuple](#Transport-IceSelectedTuple) | The new ICE selected tuple.

</div>

#### transport.on("icestatechange", fn(iceState))
{: #transport-on-icestatechange .code}

Emitted when the ICE state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`iceState`        | [IceState](#Transport-IceState) | The new ICE state.

</div>

#### transport.on("dtlsstatechange", fn(dtlsState))
{: #transport-on-dtlsstatechange .code}

Emitted when the DTLS state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`dtlsState`       | [DtlsState](#Transport-DtlsState) | The new DTLS state.

</div>

</section>
