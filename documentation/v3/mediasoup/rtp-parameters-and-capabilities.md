---
title   : RTP Parameters and Capabilities
anchors : true
---


# RTP Parameters and Capabilities

RTP parameters describe the media that an endpoint sends to mediasoup (RTP send parameters) or the media that mediasoup forwards to an endpoint (RTP receive parameters).

RTP capabilities, instead, define what mediasoup or an endpoint can receive, thus RTP parameters depend on (or are constrained to) the remote RTP capabilities.

----

* Will be replaced with the ToC
{: toc}


## RTP Negotiation Overview
{: #RTP-Negotiation-Overview}

When a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) is created it's provided with a set of [RTCRtpCodecCapability](#RTCRtpCodecCapability) that define the audio and video codecs enabled in that router. The application then retrieves the computed [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) (which include the router codecs enhanced with retransmission and RTCP capabilities, and the list of RTP header extensions supported by mediasoup) and provides the endpoints with those RTP capabilities.

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
`encodings`        | Array&lt;[RtpEncodingParameters](#RtpEncodingParameters)&gt; | Transmitted RTP streams and their settings. | Yes |
`rtcp`             | [RtcpParameters](#RtcpParameters) | Parameters used for RTCP. | No |

</div>

#### RtpSendParameters
{: #RtpSendParameters .code}

> `@inherits` [RtpParameters](#RtpParameters)

The RTP send parameters describe a media stream received by mediasoup from an endpoint through its corresponding mediasoup [Producer](/documentation/v3/mediasoup/api/#Producer).

* These parameters may include a `mid` value that the mediasoup transport will use to match received RTP packets based on their MID RTP extension value.
* mediasoup allows RTP send parameters with a single encoding and with multiple encodings (simulcast). In the latter case, each entry in the `encodings` array must include a `ssrc` field or a `rid` field (the RID RTP extension value) to help the mediasoup producer identify which RTP stream each packet belongs to.

<div markdown="1" class="note">
When simulcast is enabled (there is more than one entry in the `encodings` array) mediasoup assumes that each encoding represents a "spatial layer" and that those entries are ordered from lowest to highest resolution (`encodings[0]` means "spatial layer 0" while `encodings[N]` means "spatial layer N").
</div>

#### RtpReceiveParameters
{: #RtpReceiveParameters .code}

> `@inherits` [RtpParameters](#RtpParameters)

The RTP receive parameters describe a media stream as sent by mediasoup to an endpoint through its corresponding mediasoup [Consumer](/documentation/v3/mediasoup/api/#Consumer).

* The `mid` value is unset (mediasoup does not include the MID RTP extension into RTP packets being sent to endpoints).
* There is a single entry in the `encodings` array (even if the corresponding producer uses simulcast). The consumer sends a single and continuous RTP stream to the endpoint and spatial/temporal layer selection is possible via [consumer.setPreferredLayers()](/documentation/v3/mediasoup/api/#consumer-setPreferredLayers).
* As an exception, previous bullet is not true when consuming a stream over a [PipeTransport](/documentation/v3/mediasoup/api/#PipeTransport), in which all RTP streams from the associated producer are forwarded verbatim through the consumer.
* No matter the original RTP send parameters of the associated producer have `rid` in each entry in `encodings`, the RTP receive parameters will replace them with entries having a randomly generated `ssrc` value (and optional `rtx: { ssrc: XXXX }` if the endpoint supports RTX). 

#### RtpCapabilities
{: #RtpCapabilities .code}

The RTP capabilities define what mediasoup or an endpoint can receive at media level.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`codecs`           | Array&lt;[RtpCodecCapability](#RtpCodecCapability)&gt; | Supported media and RTX codecs. | Yes |
`headerExtensions` | Array&lt;[RtpHeaderExtension](#RtpHeaderExtension)&gt; | Supported RTP header extensions. | No | `[ ]`

</div>

#### RtpCodecParameters
{: #RtpCodecParameters .code}

Provides information on codec settings within the RTP parameters. The list of media codecs supported by mediasoup and their settings is defined in the [supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`mimeType`         | String  | The codec MIME media type/subtype (e.g. "audio/opus", "video/VP8"). | Yes |
`payloadType`      | Number  | The value that goes in the RTP Payload Type Field. Must be unique. | Yes |
`clockRate`        | Number  | Codec clock rate expressed in Hertz. | Yes |
`channels`         | Number  | The number of channels supported (e.g. two for stereo). Just for audio. | No | 1
`parameters`       | Object  | Codec-specific parameters available for signaling. Some parameters (such as "packetization-mode" and "profile-level-id" in H264) are critical for codec matching. | No |
`rtcpFeedback`     | Array&lt;[RtcpFeedback](#RtcpFeedback)&gt; | Transport layer and codec-specific feedback messages for this codec. | No | `[ ]`

</div>

<div markdown="1" class="note">
See the [Codec Parameters](#Codec-Parameters) section below for more info about the codec `parameters`.
</div>

#### RtcpFeedback
{: #RtcpFeedback .code }

Provides information on RTCP feedback messages for a specific codec. Those messages can be transport layer feedback messages or codec-specific feedback messages. The list of RTCP feedbacks supported by mediasoup is defined in the [supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

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
`dtx`             | Boolean | For audio. Indicates whether discontinuous RTP transmission will be used. | No | `false`
`scalabilityMode` | String  | Number of spatial and temporal layers in the RTP stream (e.g. "L1T3"). See [webrtc-svc](https://w3c.github.io/webrtc-svc/). | No |

</div>

<div markdown="1" class="note">
When creating a mediasoup producer:

* If `rtpParameters` contains `mid` and `encodings` has a single entry, neither `ssrc` nor `rid` are mandatory in the single encoding.
* In `encodings` with multiple entries (simulcast), `ssrc` or `rid` must be specified in each encoding.
</div>

#### RtpHeaderExtensionParameters
{: #RtpHeaderExtensionParameters .code}

Defines a RTP header extension within the RTP parameters. The list of RTP header extensions supported by mediasoup is defined in the [supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

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

Provides information on the capabilities of a codec within the RTP capabilities. The list of media codecs supported by mediasoup and their settings is defined in the [supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

Exactly one `RtpCodecCapability` will be present for each supported combination of parameters that requires a distinct value of `preferredPayloadType`. For example:

* Multiple H264 codecs, each with their own distinct "packetization-mode" and "profile-leve-id" values.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`kind`             | String  | Media kind ("audio" or "video"). | Yes |
`mimeType`         | String  | The codec MIME media type/subtype (e.g. "audio/opus", "video/VP8"). | Yes |
`preferredPayloadType` | Number  | The preferred RTP payload type. | Yes |
`clockRate`        | Number  | Codec clock rate expressed in Hertz. | Yes |
`channels`         | Number  | The number of channels supported (e.g. two for stereo). Just for audio. | No | 1
`parameters`           | Object  | Codec specific parameters. Some parameters (such as "packetization-mode" and "profile-level-id" in H264) are critical for codec matching. | No |

</div>

<div markdown="1" class="note">
`RtpCodecCapability` entries in the `mediaCodecs` argument of [worker.createRouter()](/documentation/v3/mediasoup/api/#worker-createRouter) do not require `preferredPayloadType` field (if unset, mediasoup will choose a random one). If given, make sure it's in the 96-127 range.
</div>

#### RtpHeaderExtension
{: #RtpHeaderExtension .code}

Provides information relating to supported header extensions. The list of RTP header extensions supported by mediasoup is defined in the [supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`kind`             | String  | Media kind ("audio" or "video"). If unset, it's valid for all kinds. | No |
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
"useinbandfec" | Number  | If 1, mediasoup will use the worst packet fraction lost in the RTCP Receiver Report received from the consuming endpoints and use it into the Receiver Report that mediasoup sends to the OPUS producer endpoint. This will force it to generate more in-band FEC into the OPUS packets to accomodate to the worst receiver. | No | 0
"usedtx"        | Number | If 1, mediasoup will not consider the stream as inactive when there is no RTP traffic. Same behavior is achieved by indicating `dtx`: `true` in the corresponding encoding in the RTP send parameters. | No | 0

</div>

</section>
