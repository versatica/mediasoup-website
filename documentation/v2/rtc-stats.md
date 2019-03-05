---
title   : RTC stats
anchors : true
---


# RTC stats

Similar to [WebRTC](https://w3c.github.io/webrtc-stats/) and [ORTC](https://draft.ortc.org/#rtcstats-dictionary), mediasoup provides stats in server side. If enabled, they are also delivered to mediasoup-client.

Currently stats are generated for the following entities:

* [WebRtcTransport](/documentation/v2/mediasoup/api/#WebRtcTransport)
* [Producer](/documentation/v2/mediasoup/api/#Producer)
* [Consumer](/documentation/v2/mediasoup/api/#Consumer)

Stats are an Array of Objects.


## Examples

### Video consumer stats

When enabling stats for a `consumer`, received stats look as follows:

```js
[
  {
    bitrate: 126032
    byteCount: 3813723
    firCount: 0
    fractionLost: 0
    id: '8nvfesjqo5ntjm3k'
    jitter: 17
    kind: 'video'
    mediaType: 'video'
    mimeType: 'video/VP8'
    nackCount: 16
    packetCount: 4566
    packetsDiscarded: 0
    packetsLost: 10
    packetsRepaired: 8
    pliCount: 29
    sliCount: 0
    ssrc: 3514166852
    timestamp: 139426926
    type: 'inbound-rtp'
  },  
  {
    bitrate: 126032
    byteCount: 6025653
    firCount: 0
    fractionLost: 0
    id: 'x2dtpsmtsmnp7dwp'
    inboundRtpId: '8nvfesjqo5ntjm3k'
    kind: 'video'
    mediaType: 'video'
    mimeType: 'video/VP8'
    nackCount: 17
    packetCount: 6431
    packetsDiscarded: 0
    packetsLost: 38
    packetsRepaired: 14
    pliCount: 0
    roundTripTime: 25
    sliCount: 0
    ssrc: 93410199
    timestamp: 139426926
    transportId: 20102291
    type: 'outbound-rtp'
  }
]
```

Here there is an Array with two Objects, one for the stream being consumed by the `consumer` (with `type: 'outbound-rtp'`) and another with the stats of the associated `producer` (`type: 'inbound-rtp'`). Note that the second one includes a `inboundRtpId: '8nvfesjqo5ntjm3k'` field referencing the associated `producer`'s stats Object within the array.

<div markdown="1" class="note">
When the `producer` uses simulcast (so it sends N streams with different SSRC values) the stats Object with `type: 'inbound-rtp'` references the stats of the specific inbound stream with same profile ("low", "medium" or "high") that the `consumer` is receiving in that moment.
</div>

