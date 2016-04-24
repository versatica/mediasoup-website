---
title   : Overview
code    : true
anchors : true
---


# Overview

Before all else, **mediasoup** is an SFU (*Selective Forwarding Unit*) that enables multiparty conferencing for WebRTC endpoints.

An SFU does not mix participants' media streams but relays them in a multi-streaming fashion (enpoints send one and receive many). This design leads to a better performance, higher throughput and less latency than the classic MCU (*Multipoint Control Unit*) model, and lets the endpoint choose which streams to render and how to display them.

<div markdown='1' class='note'>
Detailed information regarding the architecture of an SFU can be found at RFC 7667 "RTP Topologies" [section 3.7](https://tools.ietf.org/html/rfc7667#section-3.7).
</div>

Unlike other existing SFU implementations, **mediasoup** is not a standalone server but an unopinionated Node.js library which can be integrated into a larger application:

```javascript
var mediasoup = require('mediasoup');
```

Thus internally, **mediasoup** can be splitted into two separete components:

* a JavaScript layer exposing a modern ECMAScript 6 [API](/api/), and
* a subprocess that handles the media layer (ICE, DTLS, RTP and so on).

Both components communicate to each other by means of inter-process communication. From the point of view of the developer, the application integrating **mediasoup** should just worry about the JavaScript [API](/api/) exposed by the library.


## Design goals

* Be a Node.js library: `npm install mediasoup`
* Be minimalist: just handle the media layer
* Don't deal with network signaling protocols (SIP, XMPP, etc)
* Expose a modern ECMAScript 6 [API](/api/) in sync with [ORTC](http://ortc.org/)
* Work with current WebRTC client implementations


## Features

* IPv6 ready
* ICE / DTLS / RTP / RTCP / DataChannel over UDP and TCP
* Powerful (media handler subprocess coded in C++ on top of [libuv](http://libuv.org))


## Requirements

* Node.js >= `v4.0.0`
* POSIX based operating system (Windows not yet supported)
