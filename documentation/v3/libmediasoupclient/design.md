---
title   : Design
anchors : true
---


# libmediasoupclient v3 Design

libmediasoupclient is a C++ library based on [libwebrtc](https://webrtc.org/) for building mediasoup based C++ client side applications.


## Features

* C++11 low level API.
* Uses [libwebrtc](https://webrtc.org/) as native WebRTC engine.


## libwebrtc API

The application is responsible of using the API exposed by libwebrtc to create instances of `webrtc::MediaStreamTrackInterface` (audio and video tracks) and use them to feed the API methods of libmediasoupclient.

<div markdown="1" class="note">
This is: libmediasoupclient does not expose any "track factory" API. The application must use libwebrtc for that.
</div>


## Multi Threading

libmediasoup client does not implement multi-threading. All API methods marked as `@async` block the current thread until the underlaying operation is terminated. Such underlaying operation can be an operation executed by the libwebrtc stack or an operation executed by the user.

Examples:

* [device.GetRtpCapabilities()](/documentation/v3/libmediasoupclient/api/#device-GetRtpCapabilities) blocks the current thread until capabilities are internally retrieved and returns them.
* [sendTransport.Produce()](/documentation/v3/libmediasoupclient/api/#SendTransport-Produce) internally performs SDP offer/answer in the underlaying `RTCPeerConnection` instance and blocks the thread until done.
* The [SendTransport::Listener::OnProduce](/documentation/v3/libmediasoupclient/api/#SendTransportListener-OnProduce) event returns a `std::future` and waits for the application to fullfill it (once it communicates to the server).
