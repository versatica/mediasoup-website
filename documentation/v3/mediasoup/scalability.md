---
title   : Scalability
anchors : true
---


# Scalability

Scalability is a vague concept that can apply to different scenarios and requirements. Below some of those scenarios are exposed.

<div markdown="1" class="note">
Before entering into details, let's clarify how mediasoup works internally:

* mediasoup is a Node.js library that exposes a JavaScript ES6 API to manage workers, routers, transports, producers and consumer (among others).
* A [Worker](/documentation/v3/mediasoup/api/#Worker) represents a mediasoup C++ subprocess that runs in a single CPU core. It can handle N routers.
* A [Router](/documentation/v3/mediasoup/api/#Router) holds producers and consumers that exchange audio/video RTP between them. In certain common usages, a router can be understood as a "multi-party conference room". A router uses a single CPU.
* A router behaves as an [SFU](https://webrtcglossary.com/sfu/) (Selective Forwarding Unit). This is:
  * it forwards RTP packets between producers and consumers,
  * it selects which spatial and temporal layers to forward based on consumer settings and network capability,
  * it requests RTP packet retransmission to producer endpoints when there is packet loss,
  * it holds a buffer with packets from producer endpoints and retransmits them to consumer endpoints when requested by those,
  * however it does neither decode nor transcode media packets, so it can not generate video key frames on demand, but just requests them to the producer endpoints.
</div>

----

* Will be replaced with the ToC
{: toc}


## Multiple and Separate mediasoup Routers
{: #multiple-and-separate-mediasoup-routers}

A good example of this scenario is an application that provides multi-party conference rooms. Each room uses a single mediasoup router thus each mediasoup worker (which uses a single CPU) may hold multiple "rooms".

Depending on the host CPU capabilities, a mediasoup C++ subprocess can tipically handle over ~500 consumers in total. If for example there are 4 peers in a room, all them sending audio and video and all them consuming the audio and video of the other peers, this would mean that:

* Each peer receives audio and video from 3 peers, so 3x2 = 6 consumers in total.
* There are 4 peers, so 4x6 = 24 consumers in total.

Depending on the needed capability, the server side application using mediasoup should launch as many workers as required (no more than the number of CPU cores in the host) and distribute "rooms" (mediasoup routers) accross them.

If higher capability is required, the application backend should run mediasoup in multiple hosts and distribute "rooms" across them.


## One-To-Many Broadcasting
{: #one-to-many-broadcasting}

In this scenario, a single broadcaster endpoint (or a few of them) produce audio and video and the backend stream the media to hundred of thousands of viewers in real-time (no delay). If there are more than 200-300 viewers (so 400-600 consumers), the capabilities of a single mediasoup router could be exceeded.

To help with those scenarios, mediasoup provides a mechanism to inter-communicate different mediasoup routers by using the [router.pipeToRouter()](/documentation/v3/mediasoup/api/#router-pipeToRouter) API.

The concept is simple:

* The broadcaster endpoint produces (producer1) its audio/video into a mediasoup router1 created in worker1.
* The server side application creates worker2, worker3, etc. in the same host and also a router (router2, router3, etc.) in each of them.
* Viewers are connected at transport level to those router2, router3, etc.
* The application pipes producer1 from router1 to router2 and from router1 to router3, etc.
* Viewers consume producer1 from their respective routers.

It's also perfectly possible to inter-communicate mediasoup routers running in different physical hosts. However, since mediasoup does not provide any signaling protocol, it's up to the application to implement the required information exchange to accomplish with that goal. As a good reference, in order to pipe a producer into a router in a different host, the application should implement something similar to what the [router.pipeToRouter()](https://github.com/versatica/mediasoup/blob/v3/lib/Router.js#L448) method already does, but taking into account that in this case both routers are not co-located in the same host so network signaling is needed.

<div markdown="1" class="note warn">
When broadcasting a video stream to many viewers (hundreds or thousands of consumers) it's important to be aware of how video RTP transmission typically works:

* A viewer may eventually loose video packets so would request packet retransmission to mediasoup. Retranmissions are handled per transport (they do not reach the broadcaster endpoint) so there is no limitation here.
* A viewer may connect or reconnect, or may change its preferred spatial layer, or may just loose too many packets. Any of those circumstances would imply a video key frame request by means of a RTCP PLI or FIR that reaches the broadcaster endpoint.
* Upon receipt of a video PLI or FIR, the encoder in the broadcaster endpoint generates a video key frame which is a video packet much bigger than the usual ones.
* If the encoder receives many PLIs or FIRs (although mediaoup protects the producer endpoint by preventing it from receiving more than one PLI or FIR per second) the sending bitrate of the broadcaster endpoint would increase by 2x or 3x. This may be a problem for the producer endpoint and also for viewers that will receive much more bits per second.
* And that is the problem.

In those scenarios, a "re-encoder" in server-side is required. This is, an endpoint that consumes the streams of the broadcaster endpoint, re-encodes those streams and re-produce them into a set of mediasoup routers with hundreds or thousands of consumers. Since such a "re-encoder" runs typically in the backend network, it's not limited by available bandwidth.

At the end, those scenarios require a proper architecture with distribution of viewers across multiple mediasoup routers (in the same or different hosts) and the placement special "re-encoder" endpoints in the backend that can absorb PLIs and FIRs generated by a subset of those viewers.

mediasoup comes with [libmediasoupclient](/documentation/v3/libmediasoupclient) which, among others, can be used as a re-encoder (wink, wink).
</div>
