## webrtc.RTCSessionDescription
{: #webrtc-RTCSessionDescription}


### Dictionaries
{: #webrtc-RTCSessionDescription-dictionaries}

<section markdown="1">

#### RTCSessionDescriptionInit
{: #webrtc-RTCSessionDescription-RTCSessionDescriptionInit .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
--------------| ------- | ------------- | -------- | ---------
`type`        | [RTCSdpType](#webrtc-RTCSessionDescription-RTCSdpType) | SDP type. | Yes |
`sdp`         | String  | SDP body. | Yes |

</div>

</section>


### Enums
{: #webrtc-RTCSessionDescription-enums}

<section markdown="1">

#### RTCSdpType
{: #webrtc-RTCSessionDescription-RTCSdpType .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | ---------------
"offer"        | SDP offer.
"answer"       | SDP answer.

</div>

</section>


### Constructor
{: #webrtc-RTCSessionDescription-constructor}

<section markdown="1">

#### new webrtc.RTCSessionDescription(descriptionInitDict)
{: #webrtc-RTCSessionDescription-new .code}

<div markdown="1" class="table-wrapper L3">

Argument              | Type    | Description | Required | Default 
--------------------- | ------- | ----------- | -------- | ----------
`descriptionInitDict` | [RTCSessionDescriptionInit](#webrtc-RTCSessionDescription-RTCSessionDescriptionInit) | Initialization data. | Yes |

</div>

</section>


### Properties
{: #webrtc-RTCSessionDescription-properties}

<section markdown="1">

#### description.type
{: #webrtc-description-type .code}

The [RTCSdpType](#webrtc-RTCSessionDescription-RTCSdpType) type.

#### description.sdp
{: #webrtc-description-sdp .code}

The SDP body (String).
