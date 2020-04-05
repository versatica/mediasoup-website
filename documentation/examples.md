---
title   : Examples
anchors : true
---


# Examples


### versatica/mediasoup-demo

**Project:** [https://github.com/versatica/mediasoup-demo](https://github.com/versatica/mediasoup-demo)

This is the "official" mediasoup demo made by mediasoup authors. Said that, we (the authors) don't want this demo to become the "mediasoup reference" and encourage developers to read the API documentation instead.

The **mediasoup-demo** has a client side web application and a server side Node.js application:

* The client side is a [React](https://reactjs.org) application that uses [mediasoup-client](https://github.com/versatica/mediasoup-client) and [protoo-client](https://www.npmjs.com/package/protoo-client) among other libraries.
* The server side is a Node.js application that uses [mediasoup](https://github.com/versatica/mediasoup) and [protoo-server](https://www.npmjs.com/package/protoo-server).
* [protoo](https://protoojs.org) is a JavaScript library for both, client and server sides, that provides an easy way for clients to connect via WebSocket to a shared room. The API offers request/response transactions and notifications in both directions.
  - As an alternative (there are many) readers may be more used to [socket.io](https://socket.io).


### versatica/mediasoup-broadcaster-demo

**Project:** [https://github.com/versatica/mediasoup-broadcaster-demo](https://github.com/versatica/mediasoup-broadcaster-demo)

Made by [mediasoup authors](https://github.com/versatica), this project is a
[libmediasoupclient](https://github.com/versatica/libmediasoupclient/) based application that takes the system microphone and webcam and produces the media to the specified room in [mediasoup-demo](https://github.com/versatica/mediasoup-demo/) application.


### Kurento/mediasoup-demos

**Project:** [https://github.com/Kurento/mediasoup-demos](https://github.com/Kurento/mediasoup-demos)

Contains mediasoup + Kurento integration projects.


### vpalmisano/mediasoupbin

**Project:** [https://github.com/vpalmisano/mediasoupbin](https://github.com/vpalmisano/mediasoupbin)

GStreamer plugin for mediasoup-demo.


### havfo/multiparty-meeting

**Project:** [https://github.com/havfo/multiparty-meeting](https://github.com/havfo/multiparty-meeting)

**Web:** [https://letsmeet.no](https://letsmeet.no)

Multiparty web-meetings using mediasoup and WebRTC. It started as a fork of mediasoup-demo but has evolved quite a bit.


### ethand91/mediasoup3-record-demo

**Project:** [https://github.com/ethand91/mediasoup3-record-demo](https://github.com/ethand91/mediasoup3-record-demo)

Simple audio/video record application using mediasoup and GStreamer or FFmpeg.


### mkhahani/mediasoup-sample-app

**Project:** [https://github.com/mkhahani/mediasoup-sample-app](https://github.com/mkhahani/mediasoup-sample-app)

A minimal client/server app based on Mediasoup and Socket.io made by [@mkhahani](https://github.com/mkhahani).


### daily-co/mediasoup-sandbox

**Project:** [https://github.com/daily-co/mediasoup-sandbox/tree/master/single-page](https://github.com/daily-co/mediasoup-sandbox/tree/master/single-page)

Sample code with the the simplest possible signaling, and fewest possible dependencies, for cross-browser testing of:

* Sending/receiving audio and video tracks
* Switching to a different input device and replacing a track
* Screen sharing
* Subscribing to and unsubscribing from tracks
* Pausing tracks for sender and receiver independently
* Simulcast
* Setting maximum simulcast layer when sending
* Setting maximum simulcast layer when receiving
* Display of stats
* Display of "active speaker"


### Others

Other public projects using mediasoup can be found in [GitHub](https://github.com/versatica/mediasoup/network/dependents).

