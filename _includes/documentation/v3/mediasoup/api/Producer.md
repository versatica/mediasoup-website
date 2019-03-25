## Producer
{: #Producer}

<section markdown="1">

A `producer` represents an audio/video media track sent to the `room`.

For more information, check the [Glossary](/documentation/v2/glossary/#Glossary-Producer) section.

</section>


### Properties
{: #Producer-properties}

<section markdown="1">

#### producer.id
{: #producer-id .code}

* Read only

Unique identifier (Number).

#### producer.closed
{: #producer-closed .code}

* Read only

A Boolean indicating whether the `producer` has been closed.

#### producer.appData
{: #producer-appData .code}

* Read-write

Custom data set by the application. When the `producer` is created via the [mediasoup protocol](/documentation/v2/mediasoup-protocol/), the `appData` is filled with the corresponding field in the `createProducer` request.

#### producer.kind
{: #producer-kind .code}

* Read only

The media kind ("audio" or "video") handled by the `producer`.

#### producer.peer
{: #producer-peer .code}

* Read only

The [Peer](#Peer) owner of this `producer`.

#### producer.transport
{: #producer-transport .code}

* Read only

The [Transport](#Transport) assigned to this `producer`.

#### producer.rtpParameters
{: #producer-rtpParameters .code}

* Read only

An Object with the effective RTP parameters of the `producer`, miming the syntax of [RTCRtpParameters](https://draft.ortc.org/#rtcrtpparameters*) in ORTC.

#### producer.locallyPaused
{: #producer-locallyPaused .code}

* Read only

Boolean indicating whether this `producer` has been locally paused (in mediasoup).

#### producer.remotelyPaused
{: #producer-remotelyPaused .code}

* Read only

Boolean indicating whether this `producer` has been remotely paused (by the remote client).

#### producer.paused
{: #producer-paused .code}

* Read only

Boolean indicating whether this `producer` has been locally or remotely paused.

#### producer.preferredProfile
{: #producer-preferredProfile .code}

* Read only

String indicating the preferred RTP profile set via [`producer.setPreferredProfile()`](#producer-setPreferredProfile).

</section>


### Methods
{: #Producer-methods}

<section markdown="1">

#### producer.close([appData])
{: #producer-close .code}

Closes the `producer` and triggers a [`close`](#producer-on-close) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### producer.pause([appData])
{: #producer-pause .code}

Pauses the `producer` locally, meaning that no RTP will be relayed to its associated `consumers`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data sent to the remote client. | No |

</div>

#### producer.resume([appData])
{: #producer-resume .code}

Resumes the `producer` locally, meaning that RTP will be relayed again to its associated `consumers` (unless the `producer` was also remotely paused).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data sent to the remote client. | No |

</div>

#### producer.setPreferredProfile(profile)
{: #producer-setPreferredProfile .code}

Set the given RTP `profile` as the desired profile for all its associated `consumers`.

For more information, check the [Glossary](/documentation/v2/glossary/#Glossary-Profile) section.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`profile`  | String  | Preffered RTP profile. | Yes |

</div>

#### producer.getStats()
{: #producer-getStats .code}

Returns a Promise resolving to an array of Objects containing RTC stats related to the `producer`.

<div markdown="1" class="note">
Check the [RTC stats](/documentation/v2/rtc-stats/) section for more details.
</div>

</section>


### Events
{: #Producer-events}

The `Producer` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### producer.on("close", fn(originator, appData))
{: #producer-on-close .code}

Emitted when the `producer` is closed.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### producer.on("pause", fn(originator, appData))
{: #producer-on-pause .code}

Emitted when the `producer` is locally or remotely paused.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### producer.on("resume", fn(originator, appData))
{: #producer-on-resume .code}

Emitted when the `producer` is locally or remotely resumed.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

</section>
