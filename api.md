---
title    : API
code     : true
anchors  : true
toc      : true
arrow    : true
---

<div markdown='1' class='toc-wrapper api'>
  * Will be replaced with the ToC
  {: toc .toc}
</div>

<div markdown='1' class='toc-button'>
</div>


# API


## mediasoup
{: #mediasoup}

The top-level module.

```javascript
var mediasoup = require('mediasoup');
```


### Properties
{: #mediasoup-properties}

<section markdown='1'>

#### mediasoup.errors
{: #mediasoup-errors .code}

Provides access to the [errors](#errors) module.

#### mediasoup.extra
{: #mediasoup-extra .code}

Provides access to the [extra](#extra) module.

</section>


### Methods
{: #mediasoup-methods}

<section markdown='1'>

#### mediasoup.Server([options])
{: #mediasoup-Server .code}

Creates a [Server](#Server) instance.

`options` is an Object with the following fields:

<div markdown='1' id='mediasoup-Server-options' class='table-wrapper'>

Option                   | Type    | Description   | Default
------------------------ | ------- | ------------- | -------------
`numWorkers`             | Number  | Number of child worker processes. | The number of CPU cores in the host
`logLevel`               | String  | Logging level. Valid values are 'debug', 'warn', 'error'. | 'debug'
`rtcListenIPv4`          | String\|boolean | IPv4 for RTC. Valid values are a IPv4, `true` (auto-detect) and `false` (disabled). | `true`
`rtcListenIPv6`          | String\|boolean | IPv6 for RTC. Valid values are a IPv6, `true` (auto-detect) and `false` (disabled). | `true`
`rtcMinPort`             | Number  | Minimun RTC port. | 10000
`rtcMaxPort`             | Number  | Maximum RTC port. | 59999
`dtlsCertificateFile`    | String  | Path to the DTLS certificate. If unset, a random certificate is generated. | Unset
`dtlsPrivateKeyFile`     | String  | Path to the DTLS private key. If unset, a random certificate is generated. | Unset

</div>

Usage example:

```javascript
var server = mediasoup.Server({
    logLevel            : 'warn',
    rtcListenIPv4       : '1.2.3.4',
    rtcListenIPv6       : false,
    dtlsCertificateFile : '/home/foo/dtls-cert.pem',
    dtlsPrivateKeyFile  : '/home/foo/dtls-key.pem'
  });
```

</section>


## Server
{: #Server}

A `server` runs and manages a set of **mediasoup** worker child processes that handle media realtime-communications (ICE, DTLS, RTP, RTCP, DataChannel, etc).


### Properties
{: #Server-properties}

<section markdown='1'>

#### server.closed
{: #server-closed .code}

A boolean indicating whether the `server` has been closed.

</section>


### Methods
{: #Server-methods}

<section markdown='1'>

#### server.close()
{: #server-close .code}

Closes the `server`.

#### server.dump()
{: #server-dump .code}

Returns a Promise that resolves to an Object containing the current status and details of the `server`.

*TBD:* Document it.

#### server.updateSettings([options])
{: #server-updateSettings .code}

Updates the `server` settings.

`options` is a subset of the [options](#mediasoup-Server-options) given to `mediasoup.Server()` which just includes the following settings:

* `logLevel`

#### server.Room([options])
{: #server-Room .code}

Creates a [Room](#Room) instance.

`options` is an Object with the following fields:

<div markdown='1' id='server-Room-options' class='table-wrapper'>

Option                   | Type    | Description   | Default
------------------------ | ------- | ------------- | -------------
`forceUniquePayloadTypes`| Boolean | TBD. | `false`

</div>

Usage example:

```javascript
var room = server.Room();
```

</section>


### Events
{: #Server-events}

<section markdown='1'>

#### server.on('close', fn(error))
{: #server-on-close .code}

Emitted when the `server` is closed. In case of error, the callback is called with the corresponding `Error` parameter.

```javascript
server.on('close', function(error) {
  if (error)
    console.error('server closed with error: %o', error);
});
```

</section>


## Room
{: #Room}

A `room` holds a multi-participants RTC conference.


### Properties
{: #Room-properties}

<section markdown='1'>

#### room.closed
{: #room-closed .code}

A boolean indicating whether the `room` has been closed.

#### room.peers
{: #room-peers .code}

An Array with the list of [Peer](#Peer) instances in the `room`.

</section>


### Methods
{: #Room-methods}

<section markdown='1'>

#### room.close()
{: #room-close .code}

Closes the `room`.

#### room.dump()
{: #room-dump .code}

Returns a Promise that resolves to an Object containing the current status and details of the `room`.

*TBD:* Document it.

#### room.Peer(name)
{: #room-Peer .code}

Creates a [Peer](#Peer) instance.

* `name` (String): Peer name (it must be unique within the `room`).

```javascript
var peer = room.Peer('alice');
```

#### room.getPeer(name)
{: #room-getPeer .code}

Returns a [Peer](#Peer) with the given `name`, or `undefined` if such a peer does not exist in the `room`.

* `name` (String): Peer name.

</section>


### Events
{: #Room-events}

<section markdown='1'>

#### room.on('close', fn(error))
{: #room-on-close .code}

Emitted when the `room` is closed. In case of error, the callback is called with the corresponding `Error` parameter.

```javascript
room.on('close', function(error) {
  if (error)
    console.error('room closed with error: %o', error);
});
```

</section>
