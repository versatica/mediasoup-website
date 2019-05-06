---
title   : Design
anchors : true
---


# libmediasoupclient v3 Design

libmediasoupclient is a C++ library based on [libwebrtc](https://webrtc.org/) for building mediasoup based C++ client side applications.

## Features

* C++11 low level API.
* Since it uses [libwebrtc](https://webrtc.org/) it integrates a native WebRTC engine.


## Multi Threading

libmediasoup client does not implement multi-threading. All API methods marked as `@async` block the thread until the underlaying operation is terminated. Such underlaying operation can be an operation executed by [libwebrtc](https://webrtc.org/) or an operation executed by the user code via a listener event.

Example:

[SendTransport::Produce](/documentation/v3/libmediasoupclient/api/#SendTransport-Produce) calls [SendTransport::Listener::OnProduce](/documentation/v3/libmediasoupclient/api/#SendTransportListener-OnProduce) and waits for the last to return before continuing.
