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
  - The transport will emit ["produce"](/documentation/v3/mediasoup-client/api/#transport-on-produce) so the application will transmit the event parameters to the server and will create a [Producer](/documentation/v3/mediasoup/api/#Producer) instance in server side.
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


### Producing Data (DataChannels)
{: #producing-data}

Once the send transport is created, the client side application can produce multiple [DataChannels](https://www.w3.org/TR/webrtc/#rtcdatachannel) on it.

* The application calls [transport.produceData()](/documentation/v3/mediasoup-client/api/#transport-producedata) in the local send transport.
  - The transport will emit ["connect"](/documentation/v3/mediasoup-client/api/#transport-on-connect) if this is the first call to `transport.produceData()`.
  - The transport will emit ["producedata"](/documentation/v3/mediasoup-client/api/#transport-on-producedata) so the application will transmit the event parameters to the server and will create a [DataProducer](/documentation/v3/mediasoup/api/#DataProducer) instance in server side.
* Finally `transport.produceData()` will resolve with a [DataProducer](/documentation/v3/mediasoup-client/api/#DataProducer) instance in client side.


### Consuming Data (DataChannels)
{: #consuming-data}

Once the receive transport is created, the client side application can consume multiple [DataChannels](https://www.w3.org/TR/webrtc/#rtcdatachannel) on it. However the order is the opposite (here the consumer must be created in the server first).

* The client application signals its [device.sctpCapabilities](/documentation/v3/mediasoup-client/api/#device-sctpCapabilities) to the server (it may have done it in advance).
* Then the server application calls [transport.consumeData()](/documentation/v3/mediasoup/api/#transport-consumedata) in the WebRTC transport the client created for receiving, thus generating a server side [DataConsumer](/documentation/v3/mediasoup-client/api/#DataConsumer).
* The server application transmits the consumer information and parameters to the client application, which calls [transport.consumeData()](/documentation/v3/mediasoup-client/api/#transport-consumedata) in the local receive transport.
  - The transport will emit ["connect"](/documentation/v3/mediasoup-client/api/#transport-on-connect) if this is the first call to `transport.consumeData()`.
* Finally `transport.consumeData()` will resolve with a [DataConsumer](/documentation/v3/mediasoup-client/api/#Consumer) instance in client side.


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


## Guidelines for FFmpeg and GStreamer
{: #guidelines-for-ffmpeg-and-gstreamer}

Both, FFmpeg and GStreamer (and any other similar software), can be used to inject media into a mediasoup router or to consume media from a mediasoup router (for recording purposes, transcoding, streaming using HLS, etc).

This can be done by creating a server side plain RTP transport (via [router.createPlainRtpTransport()](/documentation/v3/mediasoup/api/#router-createPlainRtpTransport)) and then calling [produce()](/documentation/v3/mediasoup/api/#transport-produce) or [consume()](/documentation/v3/mediasoup/api/#transport-consume) on it with the appropriate parameters.

<div markdown="1" class="note">
Check the [broadcaster example](https://github.com/versatica/mediasoup-demo/tree/v3/broadcasters) (based on FFmpeg) in the mediasoup demo application.
</div>

Some useful resources:

* [FFmpeg documentation](https://ffmpeg.org/documentation.html)
* [GStreamer documentation](https://gstreamer.freedesktop.org/documentation/)
* [libopus encoding options in FFmpeg](http://ffmpeg.org/ffmpeg-codecs.html#libopus-1)
* [node-fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
* [node-gstreamer-superficial](https://github.com/dturing/node-gstreamer-superficial)


### Producing Media from an External Endpoint (RTP In)
{: #producing-media-from-an-external-endpoint}

If you wish to produce media in a mediasoup router by using an external tool (such as FFmpeg or GStreamer) or make mediasoup receive media produced by other RTP source:

* Check your mediasoup [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) as those determine the kind of media (codecs configuration, RTCP capabilities, RTP header extensions, etc) that mediasoup can receive.
* Create (if not already created) a plain RTP transport in mediasoup and get its local IP and port for RTP (and optionally for RTCP if your external endpoint does not support RTCP-mux).
* Decide the RTP settings of your external endpoint (SSRC values, codec payload type, RTCP capabilities, etc.) and create a [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters) object. Those RTP parameters must match what your endpoint will send to mediasoup.
* Create a producer (via `transport.produce()`) on top of the plain RTP transport with those RTP parameters.
* Instruct your external endpoint to send media to the local IP and port(s) of the mediasoup plain RTP transport.


### Consuming Media in an External Endpoint (RTP Out)
{: #consuming-media-in-an-external-endpoint}

If you wish to route the media of a producer to an external RTP device or endpoint (such as FFmpeg or GStreamer):

* Create (if not already created) a plain RTP transport in mediasoup and get its local IP and port for RTP (and optionally for RTCP if your media endpoint does not support RTCP-mux).
* Check your mediasoup [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) and create a subset of them with the RTP capabilities supported by your external endpoint. It's critical that you keep the same codec `preferredPayloadType` values and RTP header extension `preferredId` values.
* Create a consumer (via `transport.consume()`) on top of the plain RTP transport with the corresponding `producerId` and the generated `rtpCapabilities` of your external endpoint.
* Get the [consumer.rtpParameters](/documentation/v3/mediasoup/api/#consumer-rtpParameters) and the transport local RTP IP and port(s) and instruct your external endpoint to consume RTP based on those parameters.
  * You may need to build a "remote" SDP offer based on those transport and RTP parameters if your endpoint requires a SDP.
  * Or you may need to tell your external endpoint about the media source parameters (via FFmpeg or GStreamer command line arguments).


### Example: Inject Audio and Video using FFmpeg
{: #example-inject-audio-and-video-using-ffmpeg}

Let's assume we have a `/home/foo/party.mp4` file with a stereo audio track and a video track that we want to inject into a mediasoup router. We run FFmpeg in the server host so media transmission takes places in the localhost network.

* Create a plain RTP transport in the mediasoup router to send the audio track:

```javascript
const audioTransport = await router.createPlainTransport(
  { 
    ip       : '127.0.0.1',
    rtcpMux  : false,
    comedia  : true
  });

// Read the transport local RTP port.
const audioRtpPort = audioTransport.tuple.localPort;
// => 3301

// Read the transport local RTCP port.
const audioRtcpPort = audioTransport.rtcpTuple.localPort;
// => 4502
```

* Create a plain RTP transport in the mediasoup router to send the video track:

```javascript
const videoTransport = await router.createPlainTransport(
  { 
    ip       : '127.0.0.1',
    rtcpMux  : false,
    comedia  : true
  });

// Read the transport local RTP port.
const videoRtpPort = videoTransport.tuple.localPort;
// => 3501

// Read the transport local RTCP port.
const videoRtcpPort = videoTransport.rtcpTuple.localPort;
// => 2989
```

* Create an audio producer on the first transport:

```js
const audioProducer = await audioTransport.produce(
  {
    kind          : 'audio',
    rtpParameters :
    {
      codecs :
      [
        {
          mimeType     : 'audio/opus',
          clockRate    : 48000,
          payloadType  : 101,
          channels     : 2,
          rtcpFeedback : [ ],
          parameters   : { sprop-stereo: 1 }
        }
      ],
      encodings : [ { ssrc: 11111111 } ]
    }
  });
```

* Create a video producer on the second transport:

```js
const videoProducer = await videoTransport.produce(
  {
    kind          : 'video',
    rtpParameters :
    {
      codecs :
      [
        {
          mimeType     : 'video/vp8',
          clockRate    : 90000,
          payloadType  : 102,
          rtcpFeedback : [ ], // FFmpeg does not support NACK nor PLI/FIR.
        }
      ],
      encodings : [ { ssrc: 22222222 } ]
    }
  });
```

* Instruct FFmpeg to encode the mp4 file into two RTP streams with the above selected codec payload types and SSRC values, and transmit them to the IPs and ports of the audio and video transports:

```bash
ffmpeg \
  -re \
  -v info \
  -stream_loop -1 \
  -i /home/foo/party.mp4 \
  -map 0:a:0 \
  -acodec libopus -ab 128k -ac 2 -ar 48000 \
  -map 0:v:0 \
  -pix_fmt yuv420p -c:v libvpx -b:v 1000k -deadline realtime -cpu-used 4 \
  -f tee \
  "[select=a:f=rtp:ssrc=11111111:payload_type=101]rtp://127.0.0.1:3301?rtcpport=4502|[select=v:f=rtp:ssrc=22222222:payload_type=102]rtp://127.0.0.1:3501?rtcpport=2989"
```

<div markdown="1" class="note">
The FFmpeg command line arguments above may not be perfect. This is the mediasoup documentation. Check the [FFmpeg documentation](https://ffmpeg.org/documentation.html) or the [GStreamer documentation](https://gstreamer.freedesktop.org/documentation/) to properly use them.

In other words: Please do not make questions about FFmpeg or GStreamer in the [mediasoup Discourse Group](https://mediasoup.discourse.group).
</div>

* Once done, other endpoints (WebRTC endpoints or any others) can receive both, the FFmpeg audio and video track, by using the [transport.consume()](/documentation/v3/mediasoup/api/#transport-consume) API as usual.
