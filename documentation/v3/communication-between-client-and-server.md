---
title   : Communication Between Client and Server
anchors : true
---


# Communication Between Client and Server

mediasoup does not provide any signaling protocol to communicate clients and server. It's up to the application communicate them by using WebSocket, HTTP or whichever communication means, and exchange mediasoup related parameters, requests/responses and notifications between clients and server. In most scenarios this communication must be bidirectional so a full-duplex channel is usually required. However the application can reuse the same channel for non mediasoup related message exchange (such as authentication procedures, chat messages, file transfer and whatever the application wishes to implement).

<div markdown="1" class="note">
Check the [RTP Parameters and Capabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) section for more details.
</div>

----

* Will be replaced with the ToC
{: toc}


## Guidelines for mediasoup-client and libmediasoupclient
{: #guidelines-for-mediasoup-client-and-libmediasoupclient}

Let's assume our JavaScript or C++ client side application instantiates a mediasoup-client [Device](/documentation/v3/mediasoup-client/api/#Device) or a libmediasoupclient [Device](/documentation/v3/libmediasoupclient/api/#Device) object to connect to a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) (already created in the server) and send and receive media over WebRTC.

<div markdown="1" class="note">
Both mediasoup-client (client side JavaScript library) and libmediasoupclient (C++ library based on libwebrtc) generate [RTP parameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/) suitable for mediasoup, thus simplifying the development of the client side application.
</div>

### Signaling and Peers
{: #signaling-and-peers}

The application may use WebSocket and associate each authenticated WebSocket connection with a "peer".

<div markdown="1" class="note">
Notice that there are no "peers" per se in mediasoup. However the application may wish to define "peers", which may identify and associate a specific user account, WebSocket connection, metadata, and a set of mediasoup transports, producers and consumers.
</div>

### Device Loading
{: #device-loading}

The client side application loads its mediasoup device by providing it with the RTP capabilities of the server side mediasoup router. See [device.load()](/documentation/v3/mediasoup-client/api/#device-load).


### Creating Transports
{: #creating-transports}

Both mediasoup-client and libmediasoupclient need separate WebRTC transports for sending and receiving. Typically, the client application creates those transports in advance, before even wishing to send or receive media.

For sending media:

* A WebRTC transport must be first created in the mediasoup router: [router.createWebRtcTransport()](/documentation/v3/mediasoup/api/#router-createWebRtcTransport).
* And then replicated in the client side application: [device.createSendTransport()](/documentation/v3/mediasoup-client/api/#device-createSendTransport).
* The client application must subscribe to the "connect" and "produce" events in the local transport.

For receiving media:

* A WebRTC transport must be first created in the mediasoup router: [router.createWebRtcTransport()](/documentation/v3/mediasoup/api/#router-createWebRtcTransport).
* And then replicated in the client side application: [device.createRecvTransport()](/documentation/v3/mediasoup-client/api/#device-createRecvTransport).
* The client application must subscribe to the "connect" event in the local transport.


### Producing Media
{: #producing-media}

Once the send transport is created, the client side application can produce multiple audio and video tracks on it.

* The application obtains a [track](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) (e.g. by using the `navigator.mediaDevices.getUserMedia()` API).
* It calls [transport.produce()](/documentation/v3/mediasoup-client/api/#transport-produce) in the local send transport.
  - The transport will emit ["connect"](/documentation/v3/mediasoup-client/api/#transport-on-connect) if this is the first call to `transport.produce()`.
  - The transport will emit ["produce"](/documentation/v3/mediasoup-client/api/#transport-on-produce), thus generating a [Producer](/documentation/v3/mediasoup/api/#Producer) instance in server side.
* Finally `transport.produce()` will resolve with a [Producer](/documentation/v3/mediasoup-client/api/#Producer) instance in client side.


### Consuming Media
{: #consuming-media}

Once the receive transport is created, the client side application can consume multiple audio and video tracks on it. However the order is the opposite (here the consumer must be created in the server first).

* The client application signals its [device.rtpCapabilities](/documentation/v3/mediasoup-client/api/#device-rtpCapabilities) to the server (it may have done it in advance).
* The server application should check whether the remote device can consume a specific producer (this is, whether it supports the producer media codecs). It can do it by using the [router.canConsume()](/documentation/v3/mediasoup/api/#router-canConsume) method.
* Then the server application calls [transport.consume()](/documentation/v3/mediasoup/api/#transport-consume) in the WebRTC transport the client created for receiving media, thus generating a server side [Consumer](/documentation/v3/mediasoup-client/api/#Consumer).
* The server application transmits the consumer information and parameters to the client application, which calls [transport.consume()](/documentation/v3/mediasoup-client/api/#transport-consume) in the local receive transport.
  - The transport will emit ["connect"](/documentation/v3/mediasoup-client/api/#transport-on-connect) if this is the first call to `transport.consume()`.
* Finally `transport.consume()` will resolve with a [Consumer](/documentation/v3/mediasoup-client/api/#Consumer) instance in client side.


### Communicating Actions and Events
{: #communicating-actions-and-events}

<div markdown="1" class="note">
As a core principle, calling a method is a mediasoup instance does **not** generate a direct event in that instance. In summary, this means that calling `close()` on a router, transport, producer or consumer will **not** trigger any event on it.
</div>

When a transport, producer or consumer is closed in client or server side (e.g. by calling `close()` on it), the application should signal its closure to the other side which should also call `close()` on the corresponding entity. In addition, the server side application should listen for the following closure events and notify the client about them:

* Transport ["routerclose"](/documentation/v3/mediasoup/api/#transport-on-routerclose). The client should call `close()` on the corresponding local transport.
* Producer ["transportclose"](/documentation/v3/mediasoup/api/#producer-on-transportclose). The client should call `close()` on the corresponding local producer.
* Consumer ["transportclose"](/documentation/v3/mediasoup/api/#consumer-on-transportclose). The client should call `close()` on the corresponding local consumer.
* Consumer ["producerclose"](/documentation/v3/mediasoup/api/#consumer-on-producerclose). The client should call `close()` on the corresponding local consumer.

The same happens when pausing a producer or consumer in client or server side. The action must be signaled to the other side. In addition, the server side application should listen for the following events and notify the client about them:

* Consumer ["producerpause"](/documentation/v3/mediasoup/api/#consumer-on-producerpause). The client should call `pause()` on the corresponding local transport.
* Consumer ["producerresume"](/documentation/v3/mediasoup/api/#consumer-on-producerresume). The client should call `resume()` on the corresponding local transport (unless the consumer itself was also paused on purpose). 

When simulcast or SVC is in use, the application may be interested in signaling preferred layers and effective layers between client and server side consumers.

* The server side application sets the consumer preferred layers via [consumer.setPreferredLayers()](/documentation/v3/mediasoup/api/#consumer-setPreferredLayers).
* The server side consumer subscribes to the ["layerschange"](/documentation/v3/mediasoup/api/#consumer-on-layerschange) event and notifies the client application about the effective layers being transmitted.


## Guidelines for FFmpeg
{: #guidelines-for-ffmpeg}

*TBD*

<div markdown="1" class="note">
For now check the [broadcaster example](https://github.com/versatica/mediasoup-demo/tree/v3/broadcasters) in the mediasoup demo application.
</div>


## Guidelines for GStreamer
{: #guidelines-for-gstreamer}

*TBD*
