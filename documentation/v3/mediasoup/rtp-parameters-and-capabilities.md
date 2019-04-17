---
title   : RTP Parameters and Capabilities
anchors : true
---


# RTP Parameters and Capabilities

The RTP parameters describe the media that an endpoint sends to mediasoup (RTP send parameters) or the media that mediasoup forwards to an endpoint (RTP receive parameters). The RTP capabilities, instead, define what mediasoup or an endpoint can receive, thus RTP parameters depend on (or are constrained to) the remote RTP capabilities.

* Will be replaced with the ToC
{: toc}


## RTP Negotiation Overview
{: #RTP-Negotiation-Overview}

When a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) is created it's provided with a set of [RouterMediaCodec](/documentation/v3/mediasoup/api/#RouterMediaCodec) that define the audio and video codecs enabled in that router. The application then retrieves the computed [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) (which include the router codecs enhanced with retransmission and RTCP capabilities, and the list of RTP header extensions supported by mediasoup) and provides the endpoints with those RTP capabilities.

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

#### RTCRtpParameters
{: #RTCRtpParameters .code}

There are two types of RTP parameters ([RTCRtpSendParameters](#RTCRtpSendParameters) and [RTCRtpReceiveParameters](#RTCRtpReceiveParameters)), both sharing the following definition:

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`mid`              | String  | The MID RTP extension value as defined in the [BUNDLE](https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation) specification. | No |
`codecs`           | Array&lt;[RTCRtpCodecParameters](#RTCRtpCodecParameters)&gt; | Media and RTX codecs in use. | Yes |
`headerExtensions` | Array&lt;[RTCRtpHeaderExtensionParameters](#RTCRtpHeaderExtensionParameters)&gt; | RTP header extensions in use. | No | `[ ]`
`rtcp`             | [RTCRtcpParameters](#RTCRtcpParameters) | Parameters used for RTCP. | No |

</div>

#### RTCRtpSendParameters
{: #RTCRtpSendParameters .code}

> `@inherits` [RTCRtpParameters](#RTCRtpParameters)

The RTP send parameters describe a media stream received by mediasoup from an endpoint through its corresponding mediasoup [Producer](/documentation/v3/mediasoup/api/#Producer).

* These parameters may include a `mid` value that the mediasoup transport will use to match received RTP packets based on their MID RTP extension value.
* mediasoup allows RTP send parameters with a single encoding and with multiple encodings (simulcast). In the latter case, each entry in the `encodings` array must include a `ssrc` field or a `rid` field (the RID RTP extension value) to help the mediasoup producer identify which RTP stream each packet belongs to.

<div markdown="1" class="note">
When simulcast is enabled (there is more than one entry in the `encodings` array) mediasoup assumes that each encoding represents a "spatial layer" and that those entries are ordered from lowest to highest resolution (`encodings[0]` means "spatial layer 0" while `encodings[N]` means "spatial layer N").
</div>

#### RTCRtpReceiveParameters
{: #RTCRtpReceiveParameters .code}

> `@inherits` [RTCRtpParameters](#RTCRtpParameters)

The RTP receive parameters describe a media stream as sent by mediasoup to an endpoint through its corresponding mediasoup [Consumer](/documentation/v3/mediasoup/api/#Consumer).

* The `mid` value is unset (mediasoup does not include the MID RTP extension into RTP packets being sent to endpoints).
* There is a single entry in the `encodings` array (even if the corresponding producer uses simulcast). The consumer sends a single and continuous RTP stream to the endpoint and spatial/temporal layer selection is possible via [consumer.setPreferredLayers()](/documentation/v3/mediasoup/api/#consumer-setPreferredLayers).
* As an exception, previous bullet is not true when consuming a stream over a [PipeTransport](/documentation/v3/mediasoup/api/#PipeTransport), in which all RTP streams from the associated producer are forwarded verbatim through the consumer.
* No matter the original RTP send parameters of the associated producer have `rid` in each entry in `encodings`, the RTP receive parameters will replace them with entries having a randomly generated `ssrc` value (and optional `rtx: { ssrc: XXXX }` if the endpoint supports RTX). 

#### RTCRtpCapabilities
{: #RTCRtpCapabilities .code}

The RTP capabilities define what mediasoup or an endpoint can receive at media level.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`codecs`           | Array&lt;[RTCRtpCodecCapability](#RTCRtpCodecCapability)&gt; | Supported media and RTX codecs. | Yes |
`headerExtensions` | Array&lt;[RTCRtpHeaderExtension](#RTCRtpHeaderExtension)&gt; | Supported RTP header extensions. | No | `[ ]`

</div>

#### RTCRtpCodecParameters
{: #RTCRtpCodecParameters .code}

Provides information on codec settings.

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`mimeType`         | String  | The codec MIME media type/subtype ("audio/opus", "video/VP8", etc). | Yes |
`payloadType`      | Number  | The value that goes in the RTP Payload Type Field. Must be unique. | Yes |
`clockRate`        | Number  | Codec clock rate expressed in Hertz. | Yes |
`channels`         | Number  | The number of channels supported (e.g. two for stereo). Just for audio. | No | 1
`parameters`       | Object  | Codec-specific parameters available for signaling. Some parameters (such as "packetization-mode" and "profile-level-id" in H264) are critical for codec matching. | No |
`rtcpFeedback`     | Array&lt;[RTCRtcpFeedback](#RTCRtcpFeedback)&gt; | Transport layer and codec-specific feedback messages for this codec. | No | `[ ]`

</div>



</section>
