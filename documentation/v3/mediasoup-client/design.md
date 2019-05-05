---
title   : Design
anchors : true
---


# mediasoup-client v3 Design

mediasoup-client is a JavaScript library for building mediasoup based client side applications (such as web applications). It's a tiny library exposing a powerful cross-browser API and supports all current WebRTC browsers via different [handlers](https://github.com/versatica/mediasoup-client/tree/v3/lib/handlers) for each model/version.


## Features

* ECMAScript 6 low level API.
* Works in the browser and Node.js.

<div markdown="1" class="note">
There is no native WebRTC or RTP engine in Node.js. When running mediasoup-client in Node.js, the application can provide it with a custom handler to control a 3rd party media/RTP library.
</div>
