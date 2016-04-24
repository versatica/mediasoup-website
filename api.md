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

Updates the `server` settings in runtime.

`options` is a subset of the [options](#mediasoup-Server-options) Object given to `mediasoup.Server()` which just includes the following entries: `logLevel`.

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

Emitted when the `server` is closed. In case of error, the callback is called with the corresponding `Error` object.

```javascript
server.on('close', (error) => {
  if (error)
    console.error('server closed with error: %o', error);
});
```

</section>


## Room
{: #Room}

A `room` holds a multiparty RTC (Real-Time Communication) conference.


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

Creates a [Peer](#Peer) instance within this `room`.

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

Emitted when the `room` is closed. In case of error, the callback is called with the corresponding `Error` object.

```javascript
room.on('close', (error) => {
  if (error)
    console.error('room closed with error: %o', error);
});
```

</section>


## Peer
{: #Peer}

A `peer` represents a remote media endpoint that will connect to **mediasoup** (by means of ICE+DTLS) and will send/receive media streams.

<div markdown='1' class='note'>
In WebRTC 1.0 a `peer` references a remote `RTCPeerConnection` running in a browser.
</div>


### Properties
{: #Peer-properties}

<section markdown='1'>

#### peer.closed
{: #peer-closed .code}

A boolean indicating whether the `peer` has been closed.

#### peer.name
{: #peer-name .code}

The `name` (String) of the `peer`.

#### peer.transports
{: #peer-transports .code}

An Array with the list of [Transport](#Transport) instances associated to the `peer`.

#### peer.rtpReceivers
{: #peer-rtpReceivers .code}

An Array with the list of [RtpReceivers](#RtpReceivers) instances associated to the `peer`.

#### peer.rtpSenders
{: #peer-rtpSenders .code}

An Array with the list of [RtpSenders](#RtpSenders) instances associated to the `peer`.

</section>


### Methods
{: #Peer-methods}

<section markdown='1'>

#### peer.close()
{: #peer-close .code}

Closes the `peer`.

#### peer.dump()
{: #peer-dump .code}

Returns a Promise that resolves to an Object containing the current status and details of the `peer`.

*TBD:* Document it.

#### peer.createTransport(options)
{: #peer-createTransport .code}

Returns a Promise that resolves to a new [Transport](#Transport) instance associated to this `peer`. If something goes wrong the Promise is rejected with the corresponding `Error` object. 

`options` is an Object with the following fields:

<div markdown='1' id='peer-createTransport-options' class='table-wrapper'>

Option                   | Type    | Description   | Default
------------------------ | ------- | ------------- | -------------
`udp`                    | Boolean | Offer UDP ICE candidates. | `true`
`tcp`                    | Boolean | Offer TCP ICE candidates. | `true`
`preferIPv4`             | Boolean | Prefer IPv4 over IPv6 ICE candidates. | `false`
`preferIPv6`             | Boolean | Prefer IPv6 over IPv4 ICE candidates. | `false`
`preferUdp`              | Boolean | Prefer UDP over TCP ICE candidates. | `false`
`preferTcp`              | Boolean | Prefer TCP over UDP ICE candidates. | `false`

</div>

Usage example:

```javascript
peer.createTransport({ tcp: false })
  .then((transport) => {
    console.log('transport created: %o', transport);
  })
  .catch((error) => {
    console.error('transport creation failed: %o', error);
  });
```

#### peer.RtpReceiver(transport)
{: #peer-RtpReceiver .code}

Creates a [RtpReceiver](#RtpReceiver) instance.

* `transport` ([Transport](#Transport)): Associated `transport`.


```javascript
var rtpReceiver = peer.RtpReceiver(transport);
```

</section>


### Events
{: #Peer-events}

<section markdown='1'>

#### peer.on('close', fn(error))
{: #peer-on-close .code}

Emitted when the `peer` is closed. In case of error, the callback is called with the corresponding `Error` object.

```javascript
peer.on('close', (error) => {
  if (error)
    console.error('peer closed with error: %o', error);
});
```

#### peer.on('newrtpsender', fn(rtpSender))
{: #peer-on-newrtpsender .code}

Emitted when another `peer` in the `room` creates a new [RtpReceiver](#RtpReceiver) and calls [receive()](#rtpReceiver-receive) on it. The given callback is called with a new [RtpSender](#RtpSender) instance associated to such a `rtpReceiver`.

```javascript
peer.on('newrtpsender', (rtpSender) => {
  console.log('new rtpSender: %o', rtpSender);
});
```

</section>


## Transport
{: #Transport}

*TBD*


### Properties
{: #Transport-properties}

<section markdown='1'>

*TBD*

</section>


### Methods
{: #Transport-methods}

<section markdown='1'>

*TBD*

</section>


### Events
{: #Transport-events}

<section markdown='1'>

*TBD*

</section>


## RtpReceiver
{: #RtpReceiver}

*TBD*


### Properties
{: #RtpReceiver-properties}

<section markdown='1'>

*TBD*

</section>


### Methods
{: #RtpReceiver-methods}

<section markdown='1'>

*TBD*

</section>


### Events
{: #RtpReceiver-events}

<section markdown='1'>

*TBD*

</section>


## RtpSender
{: #RtpSender}

*TBD*


### Properties
{: #RtpSender-properties}

<section markdown='1'>

*TBD*

</section>


### Methods
{: #RtpSender-methods}

<section markdown='1'>

*TBD*

</section>


### Events
{: #RtpSender-events}

<section markdown='1'>

*TBD*

</section>
