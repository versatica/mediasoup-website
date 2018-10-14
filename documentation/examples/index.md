---
title   : Examples
anchors : true
---


# Examples


### versatica/mediasoup-demo

**URL:** [https://github.com/versatica/mediasoup-demo](https://github.com/versatica/mediasoup-demo)

This is the "official" mediasoup demo made by **mediasoup** authors. Said that, we (the authors) don't want this demo to become the "mediasoup reference" and encourage developers to read the API documentation instead.

The **mediasoup-demo** has a client side web application and a server side Node.js application:

* The client side is a [React](https://reactjs.org) application that uses [mediasoup-client](https://github.com/versatica/mediasoup-client) and [protoo-client](https://www.npmjs.com/package/protoo-client) among other libraries.
* The server side is a Node.js application that uses [mediasoup](https://github.com/versatica/mediasoup) and [protoo-server](https://www.npmjs.com/package/protoo-server).
* [protoo](https://protoojs.org) is a JavaScript library for both, client and server sides, that provides an easy way for clients to connect via WebSocket to a shared room. The API offers request/response transactions and notifications in both directions.
  - As an alternative (there are many) readers may be more used to [socket.io](https://socket.io).


### footniko/mediasoup-sample

**URL:** [https://github.com/footniko/mediasoup-sample](https://github.com/footniko/mediasoup-sample)

Made by [@footniko](https://github.com/footniko), this demo is born in response to the need of many users to have a simpler **mediasoup** based application example.

Both, the client side and server side, have a single `index.js` that include all the needed **mediasoup** API. The application uses [socket.io](https://socket.io) as signaling solution.


### michaelfig/mediasoup-broadcast-example

**URL:** [https://github.com/michaelfig/mediasoup-broadcast-example](https://github.com/michaelfig/mediasoup-broadcast-example)

Made by [@michaelfig](https://github.com/michaelfig), this project is a vanilla Javascript example of how to use **mediasoup** to support the specific case of one-to-many broadcast audio/video on individual "channels".
