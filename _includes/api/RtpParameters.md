## RTP Parameters
{: #RTP}

The RTP dictionaries defined in this section are used by both the [RtpReceiver](#RtpReceiver) and the [RtpSender](#RtpSender).

### Dictionaries
{: #RTP-dictionaries}

<section markdown="1">

#### RtpParameters
{: #RTP-RtpParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`muxId`                  | String  | Stable identifier associated to the RTP stream that corresponds to the MID RTP header extension defined in [BUNDLE](https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation). | No |
`codecs`                 | sequence<[RtpCodecParameters](#RTP-RtpCodecParameters)> | The list of codecs to send or receive. | Yes |
`encodings`              | sequence<[RtpEncodingParameters](#RTP-RtpEncodingParameters)> | The "encodings" or "layers" to be used for simulcast, Scalable Video Coding, RTX, FEC, etc.  | No |
`headerExtensions`       | sequence<[RtpHeaderExtensionParameters](#RTP-RtpHeaderExtensionParameters)> | Configured RTP header extensions. | No |
`rtcp`                   | [RtcpParameters](#RTP-RtcpParameters) | RTCP parameters. | Yes |

</div>

#### RtpCodecParameters
{: #RTP-RtpCodecParameters .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`name`                   | String  | The codec name. Valid values are listed in [IANA-RTP-2](http://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-2) ("Subtype" column). | Yes |

</div>

</section>


