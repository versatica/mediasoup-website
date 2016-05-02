## RTP Parameters
{: #RTP}

The RTP dictionaries defined in this section are used by both the [RtpReceiver](#RtpReceiver) and the [RtpSender](#RtpSender).

### Dictionaries
{: #RTP-dictionaries}

<section markdown="1">

#### RtpParameters
{: #RTP-RtpParameters .code}

<div markdown="1" class="table-wrapper">

Field                    | Type    | Description   | Default
------------------------ | ------- | ------------- | -------------
`muxId`                  | String  | Stable identifier associated to the RTP stream that corresponds to the MID RTP header extension defined in [BUNDLE](https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation). | Unset
`codecs`                 | sequence<[RtpCodecParameters](#RTP-RtpCodecParameters)> | The list of codecs to send or receive. | Unset
`encodings`              | sequence<[RtpEncodingParameters](#RTP-RtpEncodingParameters)> | The "encodings" or "layers" to be used for simulcast, Scalable Video Coding, RTX, FEC, etc.  | Unset
`headerExtensions`       | sequence<[RtpHeaderExtensionParameters](#RTP-RtpHeaderExtensionParameters)> | Configured RTP header extensions. | Unset.
`rtcp`                   | [RtcpParameters](#RTP-RtcpParameters) | Parameters to configure RTCP. | Unset.

</div>

</section>


