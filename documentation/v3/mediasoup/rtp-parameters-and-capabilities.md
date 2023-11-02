---
title   : RTP Parameters and Capabilities
anchors : true
---


# RTP Parameters and Capabilities

RTP parameters describe the media that a producer endpoint sends to mediasoup (RTP send parameters) or the media that mediasoup forwards to a consumer endpoint (RTP receive parameters).

RTP capabilities, instead, define what mediasoup or a consumer endpoint can receive, thus RTP parameters depend on (or are constrained to) the remote RTP capabilities.

----

* Will be replaced with the ToC
{: toc}


## RTP Negotiation Overview
{: #RTP-Negotiation-Overview}

When a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) is created it's provided with a set of [RtpCodecCapability](#RtpCodecCapability) that define the audio and video codecs enabled in that router. The application then retrieves the computed [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) (which include the router codecs enhanced with retransmission and RTCP capabilities, and the list of RTP header extensions supported by mediasoup) and provides the endpoints with those RTP capabilities.

The endpoint wishing to send media to mediasoup uses the router's RTP capabilities and its own ones to compute its sending RTP parameters and transmits them to the router (assuming it has already created a transport to send media). The application then creates a [Producer](/documentation/v3/mediasoup/api/#Producer) instance in the router by using the [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) API.

When an endpoint wishes to receive from the router media associated to a specific producer (assuming it has already created a transport to receive media) the application takes the endpoint's RTP capabilities and uses the [transport.consume()](/documentation/v3/mediasoup/api/#transport-consume) API indicating those capabilities and the `producerId` to be consumed, thus generating a [Consumer](/documentation/v3/mediasoup/api/#Consumer) instance whose RTP receive parameters have been calculated by merging both, the producer's RTP parameters and the endpoint's RTP capabilities. The application can then signal the resulting [consumer.rtpParameters](/documentation/v3/mediasoup/api/#consumer-rtpParameters) (along with other information) to the endpoint.

<div markdown="1" class="note">
mediasoup is flexible in what it receives from endpoints, meaning that the producer's RTP parameters can have codec `payloadType` values and RTP header extension `id` values that differ from the preferred ones in the router's RTP capabilities. However, the producer's RTP parameters **MUST NOT** include codecs not present in the router's capabilities.

mediasoup is strict in what it sends to endpoints, meaning that the codec `preferredPayloadType` values and RTP header extension `preferredId` values in the endpoint's RTP capabilities **MUST** match those in the router's RTP capabilities. And then mediasoup will build a RTP receive parameters based on the RTP parameters of the producer being consumed and the endpoint's RTP capabilities.

At the end, the rule is simple:

* The entity sending RTP (mediasoup or an endpoint) decides the sending ids.
* The entity receiving RTP (mediasoup or an endpoint) must honor those ids.
</div>


## Dictionaries
{: #Dictionaries}

<section markdown="1">

#### RtpParameters
{: #RtpParameters .code}

There are two types of RTP parameters ([RtpSendParameters](#RtpSendParameters) and [RtpReceiveParameters](#RtpReceiveParameters)), both sharing the following definition:

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`mid`              | String  | The MID RTP extension value as defined in the [BUNDLE](https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation) specification. | No |
`codecs`           | Array&lt;[RtpCodecParameters](#RtpCodecParameters)&gt; | Media and RTX codecs in use. | Yes |
`headerExtensions` | Array&lt;[RtpHeaderExtensionParameters](#RtpHeaderExtensionParameters)&gt; | RTP header extensions in use. | No | `[ ]`
`encodings`        | Array&lt;[RtpEncodingParameters](#RtpEncodingParameters)&gt; | Transmitted RTP streams and their settings. | No |
`rtcp`             | [RtcpParameters](#RtcpParameters) | Parameters used for RTCP. | No |

</div>


#### RtpSendParameters
{: #RtpSendParameters .code}

> `@inherits` [RtpParameters](#RtpParameters)

The RTP send parameters describe a media stream received by mediasoup from an endpoint through its corresponding mediasoup [Producer](/documentation/v3/mediasoup/api/#Producer).

* These parameters may include a `mid` value that the mediasoup transport will use to match received RTP packets based on their MID RTP extension value.
* mediasoup allows RTP send parameters with a single encoding and with multiple encodings (simulcast). In the latter case, each entry in the `encodings` array must include a `ssrc` field or a `rid` field (the RID RTP extension value).
* If a single encoding is given, RTP send parameters must include `mid` value or the encoding must indicate the `ssrc` of the stream.
* If no encoding is given (so this is a simple stream without layers), then RTP send parameters must include `mid` value.

<div markdown="1" class="note">
Check the [Simulcast](#Simulcast) and [SVC](#SVC) sections for more information.
</div>


#### RtpReceiveParameters
{: #RtpReceiveParameters .code}

> `@inherits` [RtpParameters](#RtpParameters)

The RTP receive parameters describe a media stream as sent by mediasoup to an endpoint through its corresponding mediasoup [Consumer](/documentation/v3/mediasoup/api/#Consumer).

* There is a single entry in the `encodings` array (even if the corresponding producer uses simulcast). The consumer sends a single and continuous RTP stream to the endpoint and spatial/temporal layer selection is possible via [consumer.setPreferredLayers()](/documentation/v3/mediasoup/api/#consumer-setPreferredLayers).
* As an exception, previous bullet is not true when consuming a stream over a [PipeTransport](/documentation/v3/mediasoup/api/#PipeTransport), in which all RTP streams from the associated producer are forwarded verbatim through the consumer.
* The RTP receive parameters will always have their `ssrc` values randomly generated for all of its `encodings` (and optional `rtx: { ssrc: XXXX }` if the endpoint supports RTX), regardless of the original RTP send parameters in the associated producer. This applies even if the producer's `encodings` have `rid` set.


#### RtpCapabilities
{: #RtpCapabilities .code}

The RTP capabilities define what mediasoup or an endpoint can receive at media level.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`codecs`           | Array&lt;[RtpCodecCapability](#RtpCodecCapability)&gt; | Supported media and RTX codecs. | No | `[ ]`
`headerExtensions` | Array&lt;[RtpHeaderExtension](#RtpHeaderExtension)&gt; | Supported RTP header extensions. | No | `[ ]`

</div>


#### RtpCodecParameters
{: #RtpCodecParameters .code}

Provides information on codec settings within the RTP parameters. The list of media codecs supported by mediasoup and their settings is defined in the [supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`mimeType`         | String  | The codec MIME media type/subtype (e.g. "audio/opus", "video/VP8"). | Yes |
`payloadType`      | Number  | The value that goes in the RTP Payload Type Field. Must be unique. | Yes |
`clockRate`        | Number  | Codec clock rate expressed in Hertz. | Yes |
`channels`         | Number  | The number of channels supported (e.g. two for stereo). Just for audio. | No | 1
`parameters`       | Object  | Codec-specific parameters available for signaling. Some parameters (such as "packetization-mode" and "profile-level-id" in H264 or "profile-id" in VP9) are critical for codec matching. | No |
`rtcpFeedback`     | Array&lt;[RtcpFeedback](#RtcpFeedback)&gt; | Transport layer and codec-specific feedback messages for this codec. | No | `[ ]`

</div>

<div markdown="1" class="note">
See the [Codec Parameters](#Codec-Parameters) section below for more info about the codec `parameters`.
</div>


#### RtcpFeedback
{: #RtcpFeedback .code }

Provides information on RTCP feedback messages for a specific codec. Those messages can be transport layer feedback messages or codec-specific feedback messages. The list of RTCP feedbacks supported by mediasoup is defined in the [supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file.

<div markdown="1" class="table-wrapper L3">

Field       | Type    | Description   | Required | Default
----------- | ------- | ------------- | -------- | ---------
`type`      | String  | RTCP feedback type. | Yes |
`parameter` | String  | RTCP feedback parameter. | No |

</div>


#### RtpEncodingParameters
{: #RtpEncodingParameters .code}

Provides information relating to an encoding, which represents a media RTP stream and its associated RTX stream (if any).

<div markdown="1" class="table-wrapper L3">

Field             | Type    | Description   | Required | Default
----------------- | ------- | ------------- | -------- | ---------
`ssrc`            | Number  | The media SSRC. | No |
`rid`             | String  | The RID RTP extension value. Must be unique. | No |
`rtx`             | Object  | RTX stream information. It must contain a numeric `ssrc` field indicating the RTX SSRC. | No.
`dtx`             | Boolean | It indicates whether discontinuous RTP transmission will be used. Useful for audio (if the codec supports it) and for video screen sharing (when static content is being transmitted). | No | `false`
`scalabilityMode` | String  | Number of spatial and temporal layers in the RTP stream (e.g. "L1T3"). See [webrtc-svc](https://w3c.github.io/webrtc-svc/). | No |
`maxBitrate`      | Number  | Maximum bitrate the sender will produce for this stream. | No |
`maxFramerate`    | Double  | Maximum video frame rate (in frames per second) the sender will produce for this stream. | No |
`adaptivePtime`   | Boolean | Whether this encoding may dynamically change the frame length. | No | `false`

</div>

<div markdown="1" class="note">
* `scalabilityMode` is defined in the [Scalable Video Coding (SVC) Extension for WebRTC](https://www.w3.org/TR/webrtc-svc/) specification (check the [Simulcast](#Simulcast) and [SVC](#SVC) sections for more information).
* `maxFramerate` and `adaptivePtime` are defined in the [WebRTC Extensions](https://w3c.github.io/webrtc-extensions/) specification.
</div>


#### RtpHeaderExtensionParameters
{: #RtpHeaderExtensionParameters .code}

Defines a RTP header extension within the RTP parameters. The list of RTP header extensions supported by mediasoup is defined in the [supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`uri`              | String  | The URI of the RTP header extension, as defined in [RFC 5285](https://tools.ietf.org/html/rfc5285). | Yes |
`id`               | Number  | The numeric identifier that goes in the RTP packet. Must be unique. | Yes |
`encrypt`          | Boolean | If `true`, the value in the header is encrypted as per [RFC 6904](https://tools.ietf.org/html/rfc6904). | No | `false`
`parameters`       | Object  | Configuration parameters for the header extension. | No |

</div>

<div markdown="1" class="note">
* mediasoup does not currently support encrypted RTP header extensions.
* No `parameters` are currently considered. 
</div>


#### RtcpParameters
{: #RtcpParameters .code}

Provides information on RTCP settings within the RTP parameters.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`cname`            | String  | The Canonical Name (CNAME) used by RTCP (e.g. in SDES messages). | No |
`reducedSize`      | Boolean | Whether reduced size RTCP [RFC 5506](https://tools.ietf.org/html/5506) is configured (if `true`) or compound RTCP as specified in [RFC 3550](https://tools.ietf.org/html/3550) (if `false`). | No | `true`

</div>

<div markdown="1" class="note">
* If no `cname` is given in a producer's RTP parameters, the mediasoup transport will choose a random one that will be used into RTCP SDES messages sent to all its associated consumers.
* mediasoup assumes `reducedSize` to always be `true`.
</div>


#### RtpCodecCapability
{: #RtpCodecCapability .code}

Provides information on the capabilities of a codec within the RTP capabilities. The list of media codecs supported by mediasoup and their settings is defined in the [supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file.

Exactly one `RtpCodecCapability` will be present for each supported combination of parameters that requires a distinct value of `preferredPayloadType`. For example:

* Multiple H264 codecs, each with their own distinct "packetization-mode" and "profile-level-id" values.
* Multiple VP9 codecs, each with their own distinct "profile-id" value.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`kind`             | [MediaKind](#MediaKind) | Media kind ("audio" or "video"). | Yes |
`mimeType`         | String  | The codec MIME media type/subtype (e.g. "audio/opus", "video/VP8"). | Yes |
`preferredPayloadType` | Number  | The preferred RTP payload type. | Yes |
`clockRate`        | Number  | Codec clock rate expressed in Hertz. | Yes |
`channels`         | Number  | The number of channels supported (e.g. two for stereo). Just for audio. | No | 1
`parameters`           | Object  | Codec specific parameters. Some parameters (such as "packetization-mode" and "profile-level-id" in H264 or "profile-id" in VP9) are critical for codec matching. | No |
`rtcpFeedback`     | Array&lt;[RtcpFeedback](#RtcpFeedback)&gt; | Transport layer and codec-specific feedback messages for this codec. | No | `[ ]`

</div>

<div markdown="1" class="note">
`RtpCodecCapability` entries in the `mediaCodecs` array of [RouterOptions](/documentation/v3/mediasoup/api/#RouterOptions) do not require `preferredPayloadType` field (if unset, mediasoup will choose a random one). If given, make sure it's in the 96-127 range. Neither it requires `rtcpFeedback`.
</div>


#### RtpHeaderExtension
{: #RtpHeaderExtension .code}

Provides information relating to supported header extensions. The list of RTP header extensions supported by mediasoup is defined in the [supportedRtpCapabilities.ts](https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts) file.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`kind`             | [MediaKind](#MediaKind) | Media kind ("audio" or "video"). | Yes |
`uri`              | String  | The URI of the RTP header extension, as defined in [RFC 5285](https://tools.ietf.org/html/rfc5285). | Yes |
`preferredId`      | Number  | The preferred numeric identifier that goes in the RTP packet. Must be unique. | Yes |
`preferredEncrypt` | Boolean | If `true`, it is preferred that the value in the header be encrypted as per [RFC 6904](https://tools.ietf.org/html/rfc6904). | No | `false`
`direction`        | String  | If "sendrecv", mediasoup supports sending and receiving this RTP extension. "sendonly" means that mediasoup can send (but not receive) it. "recvonly" means that mediasoup can receive (but not send) it. | No |

</div>

<div markdown="1" class="note">
* mediasoup does not currently support encrypted RTP header extensions.
* The `direction` field is just present in mediasoup RTP capabilities (retrieved via [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) or [mediasoup.getSupportedRtpCapabilities()](/documentation/v3/mediasoup/api/#mediasoup-getSupportedRtpCapabilities)). It's ignored if present in endpoints' RTP capabilities.
</div>

</section>


## Enums
{: #Enums}

<section markdown="1">

#### MediaKind
{: #MediaKind .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description
-------------- | -------------
"audio"        | Audio media kind.
"video"        | Video media kind.

</div>


## Codec Parameters
{: #Codec-Parameters}

When a producer includes codec parameters into its RTP send parameters, those parameters are passed verbatim to the RTP receive parameters of the consumers associated to that producer.

Some of those parameters are part of the codec settings and are used for codec matching. Some other codec parameters affect the operation of mediasoup for the corresponding producer and consumers.


### Parameters for Codec Matching
{: #Parameters-for-Codec-Matching}

These parameters are part of the codec settings, meaning that their values determine whether an entry in `rtpParameters.codecs` matches or not an entry in the remote `rtpCapabilities.codecs`. These parameters are codec-specific:

<section markdown="1">

#### H264
{: #H264 }

H264 codec matching rules are complex and involve inspection of the following parameters (see the [RFC 6184](https://tools.ietf.org/html/rfc6184) for more details):

<div markdown="1" class="table-wrapper L3">

Parameter            | Type    | Description   | Required | Default
-------------------- | ------- | ------------- | -------- | ---------
"packetization-mode" | Number  | 0 means that the single NAL mode must be used. 1 means that the non-interleaved mode must be used. | No | 0
"profile-level-id"   | String  | Indicates the default sub-profile and the default level of the stream. | Yes |
"level-asymmetry-allowed" | Number | Indicates whether level asymmetry is allowed. | No | 0

</div>

<div markdown="1" class="note">
mediasoup uses the [h264-profile-level-id](https://github.com/ibc/h264-profile-level-id) JavaScript library to evaluate those parameters and perform proper H264 codec matching.
</div>

<div markdown="1" class="note warn">
Depending the negotiated H264 "packetization-mode" and "profile-level-id", Chrome may use OpenH264 software encoder or H264 external hardware encoder. In the latter case, Chrome will **NOT** generate simulcast but a single stream.

See the reported [issue](https://bugs.chromium.org/p/webrtc/issues/detail?id=10747) for more information.
</div>

#### VP9
{: #VP9 }

<div markdown="1" class="table-wrapper L3">

Parameter            | Type    | Description   | Required | Default
-------------------- | ------- | ------------- | -------- | ---------
"profile-id"         | Number  | VP9 coding profile ([more info](https://www.webmproject.org/vp9/profiles/)). Supported values are 0 and 2. | No | 0

</div>

</section>


### Parameters Affecting mediasoup Operation
{: #Parameters-Affecting-mediasoup-Operation}

These parameters influence the mediasoup operation by enabling or disabling some features. These parameters are codec-specific:

<section markdown="1">

#### OPUS
{: #OPUS}

<div markdown="1" class="table-wrapper L3">

Parameter      | Type    | Description   | Required | Default
-------------- | ------- | ------------- | -------- | ---------
"useinbandfec" | Number  | If 1, mediasoup will use the worst packet fraction lost in the RTCP Receiver Report received from the consuming endpoints and use it into the Receiver Report that mediasoup sends to the OPUS producer endpoint. This will force it to generate more in-band FEC into the OPUS packets to accommodate to the worst receiver. | No | 0
"usedtx"        | Number | If 1, mediasoup will not consider the stream as inactive when there is no RTP traffic. Same behavior is achieved by indicating `dtx`: `true` in the corresponding encoding in the RTP send parameters. | No | 0

</div>

</section>


## Simulcast
{: #Simulcast}

Simulcast involves sending N separate video RTP streams (so N different SSRCs) representing N different qualities of the same video source. If RTX is used, there would also be N additional RTP RTX streams, one for each media RTP stream. Each media RTP stream may also contain M temporal layers.

<div markdown="1" class="note">
* Currently mediasoup supports simulcast (optionally with M temporal layers) for VP8 and H264 codecs.
* Starting from Chrome/Chromium M111 it's possible to use a single VP8/H264 stream with temporal layers by setting a proper `scalabilityMode` in the `encoding`.
</div>

When creating a simulcast producer, the associated [rtpParameters](#RtpSendParameters) given to [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) must conform to the following rules:

* There must be N > 1 entries in the `encodings` array or a single entry with `scalabilityMode` indicating 1 spatial layer and more than 1 temporal layer.
* If there are more than 1 encoding, each encoding must include a `ssrc` field or a `rid` field (the RID RTP extension value) to help the mediasoup producer identify which RTP stream each packet belongs to.
* Each encoding represents a "spatial layer". Entries in `encodings` must be ordered from lowest to highest resolution (`encodings[0]` means "spatial layer 0" while `encodings[N-1]` means "spatial layer N-1", being N the number of simulcast streams).
* If the streams have M temporal layers, those must be signaled in each encoding within the [scalabilityMode](https://w3c.github.io/webrtc-svc/#rtcrtpencodingparameters) field:
  * Since each stream has a single spatial layer,  the number of spatial layers indicated in `scalabilityMode` in each encoding must be 1.
  * If there are not temporal layers, the `scalabilityMode` field can be omitted (it defaults to "L1T1", this is, one spatial layer and one temporal layer).
  * All encodings must have same number of temporal layers.

Simulcast consumers will just get a single stream and hence a single entry in their `rtpParameters.encodings` array. Such a encoding entry has a `scalabilityMode` value that determines the number of spatial layers (number of simulcast streams in the producer) and the number of temporal layers.

<div markdown="1" class="note">
To clarify, if the producer uses simulcast with 3 streams (3 SSRCs), mediasoup will forward a single and continuous stream (1 SSRC) to the consumer.

The encoding entry in `rtpParameters.encodings` of the consumer contains a `scalabilityMode` field whose L value (number of spatial layers) matches the number of streams in the producer, and whose T value (number of temporal layers) matches the number of temporal layers in each stream in the producer.
</div>


### Examples
{: #Simulcast-Examples}

The following examples just show the `rtpParameters.encodings` field and, for simplicity, do not include RTX information.

<section markdown="1">

#### Simulcast with 3 streams using SSRCs

* Producer:

```js
encodings :
[
  { ssrc: 111110 },
  { ssrc: 111111 },
  { ssrc: 111112 }
]
```

* Consumer:

```js
encodings :
[
  { ssrc: 222220, scalabilityMode: 'L3T1' }
]
```

#### Simulcast with 4 streams and 3 temporal layers using RID

* Producer:

```js
encodings :
[
  { rid: 'r0', scalabilityMode: 'L1T3' },
  { rid: 'r1', scalabilityMode: 'L1T3' },
  { rid: 'r2', scalabilityMode: 'L1T3' },
  { rid: 'r3', scalabilityMode: 'L1T3' }
]
```

* Consumer:

```js
encodings :
[
  { ssrc: 222220, scalabilityMode: 'L4T3' }
]
```

</section>


## SVC
{: #SVC}

SVC involves sending a single RTP stream with N spatial layers and M temporal layers. If RTX is used, there would also be an additional RTP RTX stream.

mediasoup implements two types of SVC, full SVC and K-SVC. The main difference is that, in K-SVC, a RTP key frame is required in order to up/down switch the maximun spatial layer that mediasoup forwards to a consumer. For more information about SVC in WebRTC check the [webrtc-svc](https://w3c.github.io/webrtc-svc) specification (work in progress).

<div markdown="1" class="note">
Currently mediasoup supports SVC for VP9 codec in both, full SVC and K-SVC modes. </div>

When creating a SVC producer, the associated [rtpParameters](#RtpSendParameters) given to [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) must conform to the following rules:

* There must be just one entry in the `encodings` array.
* Such a encoding must include a [scalabilityMode](https://w3c.github.io/webrtc-svc/#rtcrtpencodingparameters) field.

SVC consumers will get a single stream and hence a single entry in their `rtpParameters.encodings` array. Such a encoding entry has a `scalabilityMode` value that determines the number of available spatial and temporal layers (same value as in the associated producer).

### Examples
{: #SVC-Examples}

The following examples just show the `rtpParameters.encodings` field and, for simplicity, do not include RTX information.

<section markdown="1">

#### Full SVC with 3 spatial layers and 2 temporal layers

* Producer:

```js
encodings :
[
  { ssrc: 111110, scalabilityMode: 'L3T2' }
]
```

* Consumer:

```js
encodings :
[
  { ssrc: 222220, scalabilityMode: 'L3T2' }
]
```

#### K-SVC with 4 spatial layers and 5 temporal layers

* Producer:

```js
encodings :
[
  { ssrc: 111110, scalabilityMode: 'L4T5_KEY' }
]
```

* Consumer:

```js
encodings :
[
  { ssrc: 222220, scalabilityMode: 'L4T5_KEY' }
]
```

</section>
