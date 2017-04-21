---
title   : WebRTC API tricks
anchors : true
---


# WebRTC API tricks

* Will be replaced with the ToC
{: toc}


## Streams and peers association
{: #streams-and-peers-association}

When multiple participants join a room and publish their audio and video, a way to determine which peer each each stream belongs to is needed.

By using the API provided by the [webrtc](/api/#webrtc) module, **mediasoup** stores each receiving [msid](https://tools.ietf.org/html/draft-ietf-mmusic-msid) value into the [`userParameters`](/api/#RtpDictionaries-RtpParameters) of the corresponding [RtpReceiver](/api/#RtpReceiver). Such an object is copied verbatim into the corresponding [RtpParameters](/api/#RtpDictionaries-RtpParameters) of all the associated [RtpSender](/api/#RtpSender) instances.

The `msid` value has the following syntax:

```
xxxxxxxx yyyyyyyy
```

Where `xxxxxxxx` matches the `id` of the `MediaStream` source, and `yyyyyyyy` matches the `id` of the specific `MediaStreamTrack`.

For each [RTCPeerConnection](/api#webrtc-RTCPeerConnection) in a room, the Node.js application can retrieve all its `RtpSender` instances and the `msid` associated to them:

```javascript
// Get the underlying Peer instance.
let peer = peerconnection.peer;

// Map of Peer names indexed by MediaStream.id.
let mediaStreamIdToPeerName = {};

for (let rtpSender of peer.rtpSenders) {
  // Get the name of the associated Peer instance.
  let associatedRtpReceiver = rtpSender.associatedRtpReceiver;
  let senderPeerName = associatedRtpReceiver.peer.name;

  // Get the MediaStream.id.
  let msid = rtpSender.rtpParameters.userParameters.msid;
  let mediaStreamId = msid.split(/\s/)[0];

  // Store in the map.
  mediaStreamIdToPeerName[mediaStreamId] = senderPeerName;
}
```

The Node.js app can signal such a `mediaStreamIdToPeerName` map to the browser. The JavaScript in the browser application can then inspect the remote `MediaStream` objects in its local `RTCPeerConnection` and look for their `id` in the map, obtaining the associated `peer` name.


## Limiting the sending bitrate
{: #limiting-the-sending-bitrate}

**mediasoup** implements [REMB](https://tools.ietf.org/html/draft-alvestrand-rmcat-remb) based congestion control. This feature lets the client adapt its sending bitrate to the available network bandwidth.

However, in many scenarios it may be useful for the Node.js app to artificially limit the sending bitrate of a specific participant (for example, when his video stream is being rendered into a very small `<video>` into the browser application).

The [`setMaxBitrate()`](/api/#transport-setMaxBitrate) method of the [Transport](/api/#Transport) class allows the Node.js application to dynamically change the maximum sending bitrate of a peer. Within the exposed [RTCPeerConnection](/api/#RTCPeerConnection) object, it can be used as follows:

```javascript
// Get the transport of the RTCPeerConnection.
// NOTE: Just a single transport is created.
let transport = peerconnection.transports[0];

// Ensure it exists.
if (!transport)
  return;

// Set 64kbps as maximum sending bitrate.
transport.setMaxBitrate(64000);
```

The maximum sending bitrate can also be set within the `RTCPeerConnection` constructor by setting the [`maxBitrate`](/api/#webrtc-RTCPeerConnection-RTCPeerConnectionOptions) option.
