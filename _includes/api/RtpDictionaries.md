## RTP Dictionaries
{: #RtpDictionaries}

### Dictionaries
{: #RtpDictionaries-dictionaries}

<section markdown="1">

#### RtpParameters
{: #RtpDictionaries-RtpParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`muxId`                  | String  | Stable identifier associated to the RTP stream that corresponds to the MID RTP header extension defined in [BUNDLE](https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation). | No |
`codecs`                 | sequence<[RtpCodecParameters](#RtpDictionaries-RtpCodecParameters)> | The list of codecs to send or receive. | Yes |
`encodings`              | sequence<[RtpEncodingParameters](#RtpDictionaries-RtpEncodingParameters)> | The "encodings" or "layers" to be used for simulcast, Scalable Video Coding, RTX, FEC, etc.  | No |
`headerExtensions`       | sequence<[RtpHeaderExtensionParameters](#RtpDictionaries-RtpHeaderExtensionParameters)> | Configured RTP header extensions. | No |
`rtcp`                   | [RtcpParameters](#RtpDictionaries-RtcpParameters) | RTCP parameters. | No |
`userParameters`         | Dictionary | Custom user parameters. | No |

</div>

Entries for the RTP retransmission mechanism defined in [RFC 4588](https://tools.ietf.org/html/rfc4588) are not included in the `codecs` sequence.

`userParameters` are custom parameters set by the user in [`rtpReceiver.receive()`](#rtpReceiver-receive) and copied verbatim into the corresponding [RtpParameters](#RtpDictionaries-RtpParameters) of all the associated [RtpSender](#RtpSender) instances.


#### RtpCodecParameters
{: #RtpDictionaries-RtpCodecParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`name`                   | String  | The codec MIME type. Valid values are listed in [IANA-RTP-2](http://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-2). The syntax must match `type/subtype` (examples: "audio/opus", "video/H264"). | Yes |
`payloadType`            | Integer | The value that goes in the RTP Payload Type Field. Must be unique. | Yes |
`clockRate`              | Integer | Codec clock rate expressed in Hertz. | No |
`maxptime`               | Integer | The maximum packetization time. | No |
`ptime`                  | Integer | The duration of media represented by a packet in millisecond. | No |
`numChannels`            | Integer | Codec clock rate expressed in Hertz. | No |
`rtx`                    | [RTCRtpCodecRtxParameters](#RtpDictionaries-RTCRtpCodecRtxParameters) | Retransmission parameters for the codec. | No |
`rtcpFeedback`           | sequence<[RtcpFeedback](#RtpDictionaries-RtcpFeedback)> | Transport layer and codec-specific feedback messages for this codec. | No |
`parameters`             | Dictionary | Codec-specific parameters available for signaling. | No |

</div>

#### RTCRtpCodecRtxParameters
{: #RtpDictionaries-RTCRtpCodecRtxParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`payloadType`            | Integer | The payload type of retransmission packets defined in [RFC 4588](https://tools.ietf.org/html/rfc4588). | Yes |
`rtxTime`                | Integer | The maximum time (measured in milliseconds) a sender will keep an original RTP packet in its buffers available for retransmission. | No |

</div>

#### RtcpFeedback
{: #RtpDictionaries-RtcpFeedback .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`type`                   | String  | "RTCP Feedback" Attribute Values ("ack", "ccm", "nack", "goog-remb", "transport-cc", etc.). | Yes |
`parameter`              | String  | For a `type` of "ack" or "nack", valid values are the "ack" and "nack" Attribute Values enumerated in [IANA-SDP-15](http://www.iana.org/assignments/sdp-parameters/sdp-parameters.xhtml#sdp-parameters-15) ("sli", "rpsi", etc.). For the Generic NACK feedback message defined in [RFC 4585](https://tools.ietf.org/html/rfc4585#section-6.2.1), the `type` attribute is set to "nack" and the `parameter` attribute is unset. For a type of "ccm", valid values for parameter are the "Codec Control Messages" enumerated in [IANA-SDP-19](http://www.iana.org/assignments/sdp-parameters/sdp-parameters.xhtml#sdp-parameters-19) ("fir", "tmmbr" (includes "tmmbn"), etc.). | No |

</div>

#### RtpEncodingParameters
{: #RtpDictionaries-RtpEncodingParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`ssrc`                   | Integer | The SSRC for this layering/encoding. Multiple [RtpEncodingParameters](#RtpDictionaries-RtpEncodingParameters) objects can share the same `ssrc` value (useful, for example, to indicate that different RTX payload types associated to different codecs are carried over the same stream). | No |
`codecPayloadType`       | Integer | For per-encoding codec specifications. If set, it must point to an entry in `codecs` with same `payloadType`. | No |
`fec`                    | [RtpFecParameters](#RtpDictionaries-RtpFecParameters) | If set, specifies the FEC mechanism to use. | No |
`rtx`                    | [RtpRtxParameters](#RtpDictionaries-RtpRtxParameters) | If set, specifies the RTX parameters. | No |
`resolutionScale`        | Double   | Just for video streams. It signals how the video's resolution will be scaled down in each dimension. For example, if the value is 2.0, the video will be scaled down by a factor of 2 in each dimension, resulting in sending a video of one quarter size. For scalable video coding, it refers to the aggregate scale down of this layer when combined with all dependent layers. | No | 1.0
`framerateScale`         | Double   | Inverse of the input framerate fraction to be encoded. Example: 1.0 = full framerate, 2.0 = one half of the full framerate. For scalable video coding, it refers to the inverse of the aggregate fraction of input framerate achieved by this layer when combined with all dependent layers. | No | 1.0
`maxFramerate`           | Integer  | The maximum framerate to use for this encoding. Not used for scalable video coding. | No |
`active`                 | Boolean  | Whether this encoding is actively being sent/received. | No | `true`
`encodingId`             | String   | An identifier for the encoding object. Should be unique. Values must be composed only of case-sensitive alphanumeric characters (a-z, A-Z, 0-9) up to a maximum of 16 characters. Will be placed into the [RID](https://tools.ietf.org/html/draft-ietf-mmusic-rid) header extension. | No |
`dependencyEncodingIds`  | sequence<String> | The `encodingId` values on which this layer depends. | No |

</div>

#### RtpFecParameters
{: #RtpDictionaries-RtpFecParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`mechanism`              | String  | The Forward Error Correction (FEC) mechanism to use: "red", "red+ulpfec" or "flexfec". | Yes |
`ssrc`                   | Integer | The SSRC to use for FEC. | No |

</div>

#### RtpRtxParameters
{: #RtpDictionaries-RtpRtxParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`ssrc`                   | Integer | The SSRC to use for retransmission. | No |

</div>

#### RtpHeaderExtensionParameters
{: #RtpDictionaries-RtpHeaderExtensionParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`uri`                    | String  | The URI of the RTP header extension. | Yes |
`id`                     | Integer | The value that goes in the RTP packet. | Yes |
`encrypt`                | Boolean | If true, the value in the header is encrypted as per [RFC 6904](http://tools.ietf.org/html/rfc6904). | No | `false`
`parameters`             | Dictionary | Configuration parameters for the header extension. An example is the "vad" attribute in the client-to-mixer header extension. | No |

</div>

#### RtcpParameters
{: #RtpDictionaries-RtcpParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`cname`                  | String  | The Canonical Name (CNAME) used by RTCP (e.g. in SDES messages). | No |
`ssrc`                   | Integer | The SSRC to be used in the "SSRC of packet sender" field defined in [RFC 3550](http://tools.ietf.org/html/rfc3550) Section 6.4.2 (Receiver Report) and [RFC 4585](http://tools.ietf.org/html/rfc4585) Section 6.1 (Feedback Messages), as well as the "SSRC" field defined in [RFC 3611](http://tools.ietf.org/html/rfc3611) Section 2 (Extended Reports). | No |
`reducedSize`            | Boolean  | Whether reduced size RTCP [RFC 5506](http://tools.ietf.org/html/rfc5506) is configured (if `true`) or compound RTCP as specified in [RFC 3550](http://tools.ietf.org/html/rfc3550) (if `false`). | No | `false` 

</div>

</section>


