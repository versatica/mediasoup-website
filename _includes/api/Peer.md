## Peer
{: #Peer}

A `peer` is the local representation of a remote media endpoint that connects to **mediasoup** and sends/receives media streams.

<div markdown='1' class='note'>
In the context of WebRTC 1.0, such a "remote media endpoint" implies a `RTCPeerConnection` running in a remote browser.
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

Closes the `peer`, including all its `transports`, `rtpReceivers` and `rtpSenders`, and triggers a [close](#peer-on-close) event.

Network resources and port bindings associated to the `peer` are released.

#### peer.dump()
{: #peer-dump .code}

Returns a Promise that resolves to an Object containing the current status and details of the `peer`.

*TBD:* Document it.

#### peer.createTransport(options)
{: #peer-createTransport .code}

Returns a Promise that resolves to a new [Transport](#Transport) instance associated to this `peer`. If something goes wrong the Promise is rejected with the corresponding `Error` object. 

<div markdown='1' class='table-wrapper'>

Parameter  | Type    | Required  | Description  
-----------| ------- | --------- | -------------
`options`  | [TransportOptions](#Transport-TransportOptions)  | No | Transport options.

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

<div markdown='1' class='table-wrapper'>

Parameter   | Type    | Required  | Description  
----------- | ------- | --------- | -------------
`transport` | [Transport](#Transport)  | Yes | Associated `transport`.

</div>

Usage example:

```javascript
var rtpReceiver = peer.RtpReceiver(transport);
```

</section>


### Events
{: #Peer-events}

The `Peer` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

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
