## webrtc
{: #webrtc}

The `webrtc` module (exported via [`mediasoup.webrtc`](#mediasoup-webrtc)) exposes a high-level API matching a subset of the [W3C WebRTC 1.0 API](https://www.w3.org/TR/webrtc/). It includes the following classes:

* [RTCPeerConnection](#webrtc-RTCPeerConnection)
* [RTCSessionDescription](#webrtc-RTCSessionDescription)

Usage example:

```javascript
const mediasoup = require("mediasoup");
const RTCPeerConnection = mediasoup.webrtc.RTCPeerConnection;
// This is supposed to be our application signaling stack (up to you):
const signaling = require("./signaling");

// Create a mediasoup Server.
const mediaServer = mediasoup.Server({
  logLevel   : "debug",
  rtcIPv4    : true,
  rtcIPv6    : false,
  rtcMinPort : 40000,
  rtcMaxPort : 49999
});

// Room options.
const roomOptions = {
  mediaCodecs : [
    {
      kind        : "audio",
      name        : "audio/opus",
      clockRate   : 48000,
      payloadType : 100
    },
    {
      kind        : "video",
      name        : "video/vp8",
      clockRate   : 90000,
      payloadType : 123
    }
  ]
};

// Somehow our app decides to create a room by providing an "appRoom" (which
// is up to the application).
signaling.on("createroom", (appRoom) => {
  mediaServer.createRoom(roomOptions)
    .then((mediaRoom) => {
      handleRoom(appRoom, mediaRoom);
    });
});

function handleRoom(appRoom, mediaRoom) {
  // Handle new participants in the room. Our custom signaling application
  // fires a "join" event when a new participant wishes to join a room (this is
  // up to the application) by providing some data:
  // - `participant` is supposed to be a JSON with info about the participant:
  //   - `username`: An unique username.
  //   - `usePlanB`: Whether it's a Chrome based endpoint.
  //   - `capabilities`: An SDP created by the browser.
  // - `request` is supposed to be a WebSocket or HTTP request that we must
  //   accept or reject (if something is wrong).
  appRoom.on("join", (participant, request) => {
    handleParticipant(participant, request, appRoom, mediaRoom);
  });
}

function handleParticipant(participant, request, appRoom, mediaRoom) {
  // Create a new mediasoup Peer within the mediasoup Room and create a
  // RTCPeerConnection for it.
  let mediaPeer = mediaRoom.Peer(participant.username);
  let peerconnection = new RTCPeerConnection({
    peer     : mediaPeer,
    usePlanB : participant.usePlanB
  });

  // Participant is required to join the mediasoup Room by providing a
  // capabilities SDP.
  peerconnection.setCapabilities(participant.capabilities)
    // OK, so accept the request.
    .then(() => {
      request.accept();

      // And then generate the initial SDP offer for this participant and send
      // it to him.
      sendSdpOffer(participant, peerconnection, appRoom);
    })
    // Something was wrong, reject the request.
    .catch((error) => {
      request.reject(error);

      // And also close the RTCPeerConnection.
      peerconnection.close();
    });

  // When something changes in the mediasoup Room (such as when a new participant
  // joins or a participant leaves) provides this participant with an
  // updated SDP re-offer.
  peerconnection.on("negotiationneeded", () => {
    sendSdpOffer(participant, peerconnection, appRoom);
  });

  // If the participant leaves the room (by means of the custom signaling
  // mechanism up to the application) close its associated peerconnection.
  participant.on('leave', () => {
    peerconnection.close();
  });
}

function sendSdpOffer(participant, peerconnection, appRoom) {
  // Create an SDP offer for this participant.
  peerconnection.createOffer({
    offerToReceiveAudio : 1,
    offerToReceiveVideo : 1
  })
  // Set it as local description.
  .then((desc) => {
    return peerconnection.setLocalDescription(desc);
  })
  // Send the SDP offer to the browser.
  .then(() => {
    return participant.send({
      offer : peerconnection.localDescription.serialize()
    });
  })
  // Upon receipt of the response from the browser, take the SDP answer and
  // set it as remote description.
  .then((data) => {
    return peerconnection.setRemoteDescription(data.answer);
  })
  // If something goes wrong, reset the RTCPeerConnection internal status so,
  // at least, things may work later in a new re-offer.
  .catch((error) => {
    peerconnection.reset();
  });
}
```

<div markdown="1" class="note">
Check the [WebRTC API tricks](/guide/webrtc_api_tricks/) section to get help regarding how to signal the relationship between audio/video streams and their associated room participants.
</div>
