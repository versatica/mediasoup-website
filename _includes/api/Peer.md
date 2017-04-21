## Peer
{: #Peer}

A `peer` is the local representation of a remote media endpoint that connects to **mediasoup** and sends/receives media streams. It should be understood in "reverse" order: 

* If a browser wants to send video, its corresponding **mediasoup** `peer` will "receive" video.
* If a browser wants to receive video, its corresponding **mediasoup** `peer` will "send" video.

<div markdown="1" class="note">
In the context of WebRTC 1.0, such a "remote media endpoint" implies a `RTCPeerConnection` running in a remote browser.
</div>


### Properties
{: #Peer-properties}

<section markdown="1">

#### peer.id
{: #peer-id .code}

* Read only

Unique identifier (number).

#### peer.closed
{: #peer-closed .code}

* Read only

A Boolean indicating whether the `peer` has been closed.

#### peer.name
{: #peer-name .code}

* Read only

The `name` (String) of the `peer`.

#### peer.transports
{: #peer-transports .code}

* Read only

An Array with the list of [Transport](#Transport) instances associated to the `peer` in the order in which they were created.

#### peer.rtpReceivers
{: #peer-rtpReceivers .code}

* Read only

An Array with the list of [RtpReceivers](#RtpReceivers) instances associated to the `peer` in the order in which they were created.

#### peer.rtpSenders
{: #peer-rtpSenders .code}

* Read only

An Array with the list of [RtpSenders](#RtpSenders) instances associated to the `peer` in the order in which they were created.

</section>


### Methods
{: #Peer-methods}

<section markdown="1">

#### peer.close()
{: #peer-close .code}

Closes the `peer`, including all its `transports`, `rtpReceivers` and `rtpSenders`, and triggers a [`close`](#peer-on-close) event.

#### peer.dump()
{: #peer-dump .code}

For debugging purposes. Returns a Promise that resolves to an Object containing the `peer` internals.

#### peer.setCapabilities(capabilities)
{: #peer-setCapabilities .code}

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`capabilities` | [RtpCapabilities](#RtpDictionaries-RtpCapabilities) | Peer's RTP capabilities. | Yes |

</div>

Sets the RTP capabilities of the `peer`.

<div markdown="1" class="note warn">
This method must be called before creating any  `RtpReceiver` for this `peer`.
</div>


#### peer.createTransport(options)
{: #peer-createTransport .code}

Returns a Promise that resolves to a new [Transport](#Transport) instance associated to this `peer`. If something goes wrong the Promise is rejected with the corresponding `Error` object. 

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`options`  | [TransportOptions](#Transport-TransportOptions) | Transport options. | No |

</div>

Usage example:

```javascript
peer.createTransport({ tcp: false })
  .then((transport) => {
    console.log("transport created: %o", transport);
  })
  .catch((error) => {
    console.error("transport creation failed: %o", error);
  });
```

#### peer.RtpReceiver(kind, transport)
{: #peer-RtpReceiver .code}

Returns a new [RtpReceiver](#RtpReceiver) instance.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`kind`      | [MediaKind](#RtpDictionaries-MediaKind) | Media kind. | Yes |
`transport` | [Transport](#Transport) | Associated `transport`. | Yes |

</div>

Usage example:

```javascript
var rtpReceiver = peer.RtpReceiver("audio", transport);
```

</section>


### Events
{: #Peer-events}

The `Peer` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### peer.on("close", fn(error))
{: #peer-on-close .code}

Emitted when the `peer` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### peer.on("capabilities", fn(capabilities))
{: #peer-on-capabilities .code}

Emitted after a succesful call to [`setCapabilities`](#peer-setCapabilities). It provides the effective RTP capabilities of the `peer` (after filtering capabilities non supported by the `room`).

<div markdown="1" class="table-wrapper L3">

Argument     | Type    | Description   
------------ | ------- | ----------------
`capabilities` | [RtpCapabilities](#RtpDictionaries-RtpCapabilities) | Peer's effective RTP capabilities. | Yes |

</div>

#### peer.on("newtransport", fn(transport))
{: #peer-on-newtransport .code}

Emitted when a new `transport` is created.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`transport` | [Transport](#Transport) | New `transport`.

</div>

#### peer.on("newrtpreceiver", fn(rtpReceiver))
{: #peer-on-newrtpreceiver .code}

Emitted when a new `rtpReceiver` is created.

<div markdown="1" class="table-wrapper L3">

Argument     | Type    | Description   
------------ | ------- | ----------------
`rtpReceiver` | [RtpReceiver](#RtpReceiver) | New `rtpReceiver`.

</div>

#### peer.on("newrtpsender", fn(rtpSender))
{: #peer-on-newrtpsender .code}

Emitted when another `peer` in the same `room` creates a new [RtpReceiver](#RtpReceiver) and calls [`receive()`](#rtpReceiver-receive) on it for first time. Also emitted for each already existing [RtpReceiver](#RtpReceiver) in the `room` once the `peer` joins it.

<div markdown="1" class="table-wrapper L3">

Argument     | Type    | Description   
------------ | ------- | ----------------
`rtpSender` | [RtpSender](#RtpSender) | New `rtpSender`.

</div>

```javascript
peer.on("newrtpsender", (rtpSender) => {
  console.log("new rtpSender: %o", rtpSender);
});
```

</section>
