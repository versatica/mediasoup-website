---
title   : Overview
anchors : true
---


# Overview

An [SFU](https://webrtcglossary.com/sfu/) (Selective Forwarding Unit) receives audio and video streams from endpoints and relays them to everyone else (endpoints send one and receive many). Each receiver endpoint can select which streams and spatial/temporal layers it receives. Compared to a mixer or [MCU](https://webrtcglossary.com/mcu/) (Multipoint Control Unit) this design leads to a better performance, higher throughput and less latency. It's highly scalable and requires much less resources given that it does not transcode or mix media.

Since endpoints get the other endpoints' media separately, they can have a personalized layout and choose which streams to render and how to display them.

<div markdown="1" class="note">
Detailed information regarding the architecture of an SFU can be found at RFC 7667 "RTP Topologies" [section 3.7](https://tools.ietf.org/html/rfc7667#section-3.7).
</div>


## Design Goals

mediasoup and its client side libraries are designed to accomplish with the following goals:

* Be a [SFU](https://webrtcglossary.com/sfu/) (Selective Forwarding Unit).
* Support both WebRTC and plain RTP input and output.
* Be a Node.js module in server side.
* Be a tiny JavaScript and C++ libraries in client side.
* Be minimalist: just handle the media layer.
* Be signaling agnostic: do not mandate any signaling protocol.
* Be super low level API.
* Support all existing WebRTC endpoints.
* Enable integration with well known multimedia libraries/tools.


## Use Cases

mediasoup and its client side libraries provide a super low level API. They are intended to enable different use cases and scenarios, without any constraint or assumption. Some of these use cases are:

* Group video chat applications.
* One-to-many (or few-to-many) broadcasting applications in real-time.
* RTP streaming.
