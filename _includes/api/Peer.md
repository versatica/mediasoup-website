## Peer
{: #Peer}

A `peer` represents a remote media endpoint that connects to **mediasoup** (by means of ICE+DTLS) and sends/receives media streams.

<div markdown='1' class='note'>
In the context of WebRTC 1.0 a `peer` implies a `RTCPeerConnection` running in a remote browser.
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

Closes the `peer`, frees its network resources and removes it from the `room`. It will also trigger a [close](#peer-on-close) event.

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
