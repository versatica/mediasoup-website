---
title   : Overview
anchors : true
---


# Overview

An [SFU](https://webrtcglossary.com/sfu/) (Selective Forwarding Unit) receives audio and video streams from every participant in a conference room and relays them to everyone else (endpoints send one and receive many). Compared to a mixer or MCU (Multipoint Control Unit), this design leads to a better performance, higher throughput and less latency. It's highly scalable and requires much less resources given that it does not transcode or mix media.

Since endpoints get the other participants media separately, they can have a personalized layout and choose which streams to render and how to display them.

<div markdown="1" class="note">
Detailed information regarding the architecture of an SFU can be found at RFC 7667 "RTP Topologies" [section 3.7](https://tools.ietf.org/html/rfc7667#section-3.7).
</div>


## mediasoup Goals

* Be a WebRTC [SFU](https://webrtcglossary.com/sfu/) (Selective Forwarding Unit).
* Be a Node.js module in server side.
* Be a tiny JavaScript (and C++) library in client side.
* Be minimalist: just handle the media layer.
* Support all the existing WebRTC endpoints.
* Do not mandate a specific signaling protocol (be signaling agnostic).


## Server Side

Unlike other existing SFU implementations, [mediasoup](https://github.com/versatica/mediasoup) is not a standalone server but an unopinionated [Node.js](https://nodejs.org) module which can be integrated into a larger application:

```javascript
const mediasoup = require("mediasoup");
```

Thus internally, mediasoup can be splitted into two separete components:

* a JavaScript layer exposing a modern ECMAScript 6 API for Node.js, and
* a set of C/C++ subprocesses that handle the media layer (ICE, DTLS, RTP and so on).

Both components communicate to each other by means of inter-process communication. However, from the point of view of the developer, the application should just care about the JavaScript API integration.


#### Features

* ECMAScript 6 API.
* Multi-stream: multiple audio/video streams over a single ICE + DTLS transport.
* IPv6 ready.
* ICE / DTLS / RTP / RTCP over UDP and TCP.
* Simulcast support.
* Congestion control.
* Sender and receiver bandwidth estimation and layers distribution algorithm.
* Extremely powerful (media worker subprocess coded in C++ on top of [libuv](https://libuv.org)).


## Client Side

[mediasoup-client](https://github.com/versatica/mediasoup-client) is the JavaScript library for building JavaScript client side applications. It's a tiny library exposing a powerful cross-browser API. It supports all current WebRTC browsers with different "handlers" for each browser model/version.

[libmediasoupclient](https://github.com/versatica/libmediasoupclient) is a C++ library for building C++ client side applications.
