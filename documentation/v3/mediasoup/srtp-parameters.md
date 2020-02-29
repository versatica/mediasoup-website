---
title   : SRTP Parameters
anchors : true
---


# SRTP Parameters

Actually these SRTP parameters just apply to `PlainRtpTransport` and `PipeTransport` which has optional SRTP support.

----

* Will be replaced with the ToC
{: toc}


## Dictionaries
{: #Dictionaries}

<section markdown="1">

#### SrtpParameters
{: #SrtpParameters .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type   | Description   | Required  | Default
--------------| ------ | ------------- | --------- |
`cryptoSuite` | [SrtpCryptoSuite](#SrtpCryptoSuite) | Encryption and authentication transforms to be used. | Yes |
`keyBase64`   | String | SRTP keying material (master key and salt) in Base64. | Yes |

</div>

</section>


## Enums
{: #Enums}

<section markdown="1">

#### SrtpCryptoSuite
{: #SrtpCryptoSuite .code}

<div markdown="1" class="table-wrapper L2">

Value                     | Description
------------------------- | -------------
"AES_CM_128_HMAC_SHA1_80" | It requires SRTP keying material of 30 bytes (40 bytes in Base64).
"AES_CM_128_HMAC_SHA1_32" | It requires SRTP keying material of 30 bytes (40 bytes in Base64).

</div>

</section>
