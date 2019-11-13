---
title   : Tricks
anchors : true
---


# mediasoup v3 Tricks

Here some tricks for mediasoup.


## RTP Capabilities Filtering
{: #rtp-capabilities-filtering}

The mediasoup [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) represent the RTP capabilities that the router supports. While the `codecs` list depends on the [RouterOptions](/documentation/v3/mediasoup/api/#RouterOptions) given by during the router creation, other RTP capabilities such as the `headerExtensions` are fixed and are basically a copy of the `headerExtensions` in the [supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file of mediasoup.

For instance, some of those RTP header extensions can affect the behaviour of the client. A good example is the "urn:3gpp:video-orientation" extension which, if supported by both the client and mediasoup, will make the client to not rotate its sending video (for instance when moving the mobile from portrait to landscape) but, instead, set an orientation value into a RTP header extension.

The problem with this is that, if a receiving consumer (i.e. Firefox as per today or FFmpeg) does not support such a RTP header extension, when the sender rotates its video the receiver will not realize of it and will render the received video with an inclination of 90º or -90º. In order to avoid that problem (which just affects some receivers), here the trick:

Being in client side, when calling [device.load()](/documentation/v3/mediasoup-client/api/#device-load) (mediasoup-client) or [device.load()](/documentation/v3/libmediasoupclient/api/#device-Load) (libmediasoupclient), the application could provide such a method with a filtered version of the original RTP capabilities of the router by removing the problematic headers. For instance, for Firefox running mediasoup-client it would be as follows:

```javascript
// Let's get router RTP capabilities via our own app signaling.
let routerRtpCapabilities = await mySignaling.request("getRouterRtpCapabilities");

// Just for Firefox.
if (isFirefox)
{
  routerRtpCapabilities.headerExtensions = routerRtpCapabilities.headerExtensions.
    filter((ext) => ext.uri !== 'urn:3gpp:video-orientation');
}

// Finally apply the router RTP capabilities to the device.
await device.load({ routerRtpCapabilities });
```

