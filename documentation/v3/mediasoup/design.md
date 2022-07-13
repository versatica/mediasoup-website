---
title   : Design
anchors : true
---


# mediasoup v3 Design

Unlike other existing SFU implementations, mediasoup is not a standalone server but an unopinionated [Node.js](https://nodejs.org) module which can be integrated into a larger application:

```javascript
const mediasoup = require("mediasoup");
```

Thus internally, mediasoup can be splitted into two separate components:

* a JavaScript layer exposing a modern ECMAScript API for Node.js, and
* a set of C/C++ subprocesses that handle the media layer (ICE, DTLS, RTP and so on).

Both components communicate to each other by means of inter-process communication. However, from the point of view of the developer, the application should just care about the JavaScript API integration.


## Features

* ECMAScript low level API.
* Multi-stream: multiple audio/video streams over a single ICE + DTLS transport.
* IPv6 ready.
* ICE / DTLS / RTP / RTCP over UDP and TCP.
* Simulcast and SVC support.
* Congestion control.
* Sender and receiver bandwidth estimation with spatial/temporal layers distribution algorithm.
* Extremely powerful (media worker subprocess coded in C++ on top of [libuv](https://libuv.org)).


## Architecture

![](/images/mediasoup-v3-architecture-01.svg){: .full-width }
