---
title   : F.A.Q.
anchors : true
---


# F.A.Q.

* Will be replaced with the ToC
{: toc}


### Why a Node.js module?
{: #why-a-nodejs-module}

You may wonder "why not a standalone server?". That's a fair question.

Being a [Node.js](https://nodejs.org) module, **mediasoup** is easily integrable within larger Node.js applications. Consider that **mediasoup** just handles the media plane (audio/video streams) so the application needs some kind of signaling mechanism. Having both the signaling and the media handlers working together makes the application architecture easier.

All those using others languages/platforms for the signaling plane would need to develop their own communication channel with a standalone Node.js server running **mediasoup** (or wait for somebody to do it).


### Is mediasoup a native addon?
{: #is-mediasoup-a-native-addon}

Not exactly. [Native addons](https://nodejs.org/api/addons.html) are Node.js extensions written in C/C++ that can be loaded using `require()` as if they were ordinary Node.js modules.

Instead, **mediasoup** launches a set of C++ child processes ([media workers](https://github.com/ibc/mediasoup/tree/master/worker)) and communicates with them by means of inter-process communication. This approach leads to a media worker design not tiled to the internals of Node.js or V8 (which change in every new release).


### Which signaling protocol does it use?
{: #which-signaling-protocol-does-it-use}

That's a wrong question. **mediasoup** does not provide any network signaling protocol to communicate with endpoints/browsers. It just handles the media layer.

It's up to the application developer to build his preferred signaling protocol or choose an existing one (let it be SIP, XMPP, HTTP/WebSocket+JSON, or whichever custom protocol) and integrate it with **mediasoup**.


### ORTC API?
{: #ortc-api}

[ORTC](http://ortc.org/) is a more granular and "Object" based API for WebRTC. Moreover, the [WebRTC draft](http://w3c.github.io/webrtc-pc/) is evolving to the "Object" model so both specifications are converging.

By providing a similar API, the developer does not need to learn yet another WebRTC API when it comes to write a **mediasoup** based application.


### WebRTC API?
{: #webrtc-api}

Yes! **mediasoup** provides a high-level API (on top of the ORTC API) that exposes a subset of the [W3C WebRTC 1.0 API](https://www.w3.org/TR/webrtc/).

Check the [webrtc](/api#webrtc) module documentation.


### Is there any example code?
{: #is-there-any-example-code}

Given that **mediasoup** does not handle the signaling plane, it's hard to provide a "full application example". The [API](/api/), the [Guide](/guide/) and the existing [test units](https://github.com/ibc/mediasoup/tree/master/test) should be sufficient for the developer to learn how to use it.


### Does mediasoup transcode?
{: #does-mediasoup-transcode}

No. All the peers in a room must support a common subset of audio and video codecs. Said that, WebRTC defines a list of MTI ("mandatory to implement") audio/video codecs, so in a world of happy unicorns this topic should not be a problem.


### Does it work with legacy SIP endpoints?
{: #does-it-work-with-legacy-sip-endpoints}

This is a WebRTC SFU so, as far as the endpoint supports the WebRTC media requirements (ICE, DTLS-SRTP, MTI codecs, multi-stream, etc.), it can join a **mediasoup** room.

However, these requirements are not usually satisfied by existing SIP devices so a media gateway may be required. We consider that such a task (translating the old world to the new one) is best done outside **mediasoup**.


### Can I connect mediasoup with Asterisk/FreeSwitch?
{: #can-i-connect-mediasoup-with-asterisk-freeswitch}

Regardless both have basic WebRTC support, neither Asterisk nor FreeSwitch support multiple audio/video streams over the same RTP flow.

Or to put it another way, a legacy telephony call cannot join a **mediasoup** room expecting a single mixed audio back.
