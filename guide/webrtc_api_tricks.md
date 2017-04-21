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

By using the API provided by the [webrtc](/api#webrtc) module, **mediasoup** stores each receiving [msid](https://tools.ietf.org/html/draft-ietf-mmusic-msid) value into the [`userParameters`](/api#RtpDictionaries-RtpParameters) of the corresponding [RtpReceiver](/api#RtpReceiver). Such an object is copied verbatim into the corresponding [RtpParameters](/api#RtpDictionaries-RtpParameters) of all the associated [RtpSender](/api#RtpSender) instances.

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


