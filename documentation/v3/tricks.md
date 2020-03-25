---
title   : Tricks
anchors : true
---


# mediasoup v3 Tricks

Some useful tricks for mediasoup and client libraries.


## Using a different video codec in each Producer
{: #using-a-different-video-codec-in-each-producer}

Sometimes it's useful to use, for instance, H264 for webcam and VP8 for screen sharing. Starting from mediasoup-client 3.6.0, this is possible by using the new `codec` option in [ProducerOptions](/documentation/v3/mediasoup-client/api/#ProducerOptions). Example:

```javascript
// Assuming that the mediasoup Router has been provided with both VP8 and H264
// video codecs, let's use H264 for webcam and VP8 for screen sharing.

const webcamProducer = await sendTransport.produce(
  {
    track: videoTrack,
    codec : device.rtpCapabilities.codecs
      .find((codec) => codec.mimeType.toLowerCase() === 'video/h264')
  });

const sharingProducer = await sendTransport.produce(
  {
    track: sharingTrack,
    codec : device.rtpCapabilities.codecs
      .find((codec) => codec.mimeType.toLowerCase() === 'video/vp8')
  });
```

## RTP capabilities filtering
{: #rtp-capabilities-filtering}

**Related issue:**

* Wrong received video orientation in Firefox and FFmpeg.

The mediasoup [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) represent the RTP capabilities that the router supports. While the `codecs` list depends on the [RouterOptions](/documentation/v3/mediasoup/api/#RouterOptions) given by during the router creation, other RTP capabilities such as the `headerExtensions` are fixed and are basically a copy of the `headerExtensions` in the [supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file of mediasoup.

For instance, some of those RTP header extensions can affect the behaviour of the client. A good example is the "urn:3gpp:video-orientation" extension which, if supported by both the client and mediasoup, will make the client to not rotate its sending video (for instance when moving the mobile from portrait to landscape) but, instead, set an orientation value into a RTP header extension. This is supported by Chrome and any libwebrtc based endpoint (such as libmediasoupclient).

The problem with this is that, if a receiving consumer (i.e. Firefox as per today or FFmpeg) does not support such a RTP header extension, when the sender rotates its video the receiver will not realize of it and will render the received video with an orientation of 90º or -90º. In order to avoid that problem here the trick:

Being in sender side (let's assume it supports the "urn:3gpp:video-orientation" extension), the application may call [device.load()](/documentation/v3/mediasoup-client/api/#device-load) (mediasoup-client, i.e. Chrome) or [device.load()](/documentation/v3/libmediasoupclient/api/#device-Load) (libmediasoupclient) with a filtered version of the router RTP capabilities by removing the problematic headers. For instance, when in Chrome running mediasoup-client it would be as follows:

```javascript
// Let's get router RTP capabilities via our own app signaling.
let routerRtpCapabilities = await mySignaling.request("getRouterRtpCapabilities");

// Just for Chrome, Safari or any libwebrtc based browser.
if (supportsVideoOrientationHeaderExtension)
{
  // Remove the "urn:3gpp:video-orientation" extension so when rotating the
  // device, Chrome will encode rotated video instead of indicating the video
  // orientation in an RTP header extension.
  routerRtpCapabilities.headerExtensions = routerRtpCapabilities.headerExtensions.
    filter((ext) => ext.uri !== 'urn:3gpp:video-orientation');
}

// Finally apply the router RTP capabilities to the device.
await device.load({ routerRtpCapabilities });
```
