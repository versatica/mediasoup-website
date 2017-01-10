## webrtc
{: #webrtc}

The `webrtc` module (exported via [`mediasoup.webrtc`](#mediasoup-webrtc)) exposes a high-level API matching a subset of the [W3C WebRTC 1.0 API](https://www.w3.org/TR/webrtc/). It includes the following classes:

* [RTCPeerConnection](#webrtc-RTCPeerConnection)
* [RTCSessionDescription](#webrtc-RTCSessionDescription)

Usage example:

```javascript
const mediasoup = require("mediasoup");
const RTCPeerConnection = mediasoup.webrtc.RTCPeerConnection;
const RTCSessionDescription = mediasoup.webrtc.RTCSessionDescription;

let room; // an existing  mediasoup Room instance

// [...]

// Function called when a new participant wants to join an existing room
function onNewParticipant(request, participant) {
  let peerconnection = new RTCPeerConnection(room, participant.id);
  let desc = new RTCSessionDescription({
    type : "offer",
    sdp  : request.sdp
  });

  // Set the remote SDP offer
  peerconnection.setRemoteDescription(desc)
    .then(() => {
      return peerconnection.createAnswer();
    })
    .then((desc) => {
      return peerconnection.setLocalDescription(desc);
    })
    .then(() => {
      // Answer the participant request with the SDP answer
      request.accept({
        sdp : peerconnection.localDescription.sdp
      });
    })
    .catch((error) => {
      console.error("error handling SDP offer from participant: %s", error);
      
      // Reject the participant
      request.reject(error.message);

      // Close the peerconnection
      peerconnection.close();
    });

  // Handle "negotiationneeded" event
  peerconnection.on("negotiationneeded", () => {
    peerconnection.createOffer()
      .then((desc) => {
        return peerconnection.setLocalDescription(desc);
      })
      .then(() => {
        // Send the SDP re-offer to the endpoint and expect a SDP answer
        // (assume this method returns a Promise with the received response)
        return participant.sendRequest("reoffer", {
          sdp : peerconnection.localDescription.sdp
        });
      })
      .then((response) => {
        let desc = new RTCSessionDescription(response.sdp);

        // Update the remote description
        peerconnection.setRemoteDescription(desc);
      });
  });
}
```

