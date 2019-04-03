## Consumer
{: #Consumer}

<section markdown="1">

A consumer represents an audio or video media track being forwarded from a mediasoup router. It's created on top of a transport that defines how the media packets are carried.

</section>


### Dictionaries
{: #Consumer-dictionaries}

<section markdown="1">

#### ConsumerOptions
{: #ConsumerOptions .code}

*TODO:* Properly document `preferredLayers`.

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`producerId`    | String  | The id of the producer to consume. | Yes |
`rtpCapabilities` | [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*) | RTP capabilities of the consuming endpoint. | Yes |
`paused`        | Boolean | Whether the consumer must start in paused mode. | No | `false`
`preferredLayers` | Object | Object with preferred spatial and temporal layer for simulcast or SVC media sources. | No |
`appData`       | Object  | Custom application data. | No | `{}`

</div>

</section>


### Properties
{: #Consumer-properties}

<section markdown="1">

#### consumer.id
{: #consumer-id .code}

* Read only

Unique identifier (Number).

#### consumer.closed
{: #consumer-closed .code}

* Read only

A Boolean indicating whether the `consumer` has been closed.

#### consumer.appData
{: #consumer-appData .code}

* Read-write

Custom data set by the application.

#### consumer.kind
{: #consumer-kind .code}

* Read only

The media kind ("audio" or "video") handled by the `consumer`.

#### consumer.peer
{: #consumer-peer .code}

* Read only

The [Peer](#Peer) owner of this `consumer` (if any).

#### consumer.transport
{: #consumer-transport .code}

* Read only

The [Transport](#Transport) assigned to this `consumer`.

#### consumer.rtpParameters
{: #consumer-rtpParameters .code}

* Read only

An Object with the effective RTP parameters of the `consumer`, miming the syntax of [RTCRtpParameters](https://draft.ortc.org/#rtcrtpparameters*) in ORTC.

#### consumer.source
{: #consumer-source .code}

* Read only

The RTP source of this `consumer`. Typically it corresponds to a [Producer](#Producer).

#### consumer.enabled
{: #consumer-enabled .code}

* Read only

Boolean indicating whether this `consumer` has been enabled (so the endpoint can receive RTP). Being enabled also means that a `transport` has been assigned to this `consumer`.

#### consumer.locallyPaused
{: #consumer-locallyPaused .code}

* Read only

Boolean indicating whether this `consumer` has been locally paused (in mediasoup).

#### consumer.remotelyPaused
{: #consumer-remotelyPaused .code}

* Read only

Boolean indicating whether this `consumer` has been remotely paused (by the remote client).

#### consumer.sourcePaused
{: #consumer-sourcePaused .code}

* Read only

Boolean indicating whether the source of this `consumer` has been paused.

#### consumer.paused
{: #consumer-paused .code}

* Read only

Boolean indicating whether this `consumer` has been locally or remotely paused, or its source has been paused.

#### consumer.preferredProfile
{: #consumer-preferredProfile .code}

* Read only

String indicating the preferred RTP profile set via [`consumer.setPreferredProfile()`](#consumer-setPreferredProfile).

#### consumer.effectiveProfile
{: #consumer-effectiveProfile .code}

* Read only

String indicating the effective current RTP profile of this `consumer`.

</section>


### Methods
{: #Consumer-methods}

<section markdown="1">

#### consumer.close([appData])
{: #consumer-close .code}

Closes the `consumer` and triggers a [`close`](#consumer-on-close) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### consumer.pause([appData])
{: #consumer-pause .code}

Pauses the `consumer` locally, meaning that no RTP will be relayed to the remote client.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data sent to the remote client. | No |

</div>

#### consumer.resume([appData])
{: #consumer-resume .code}

Resumes the `consumer` locally, meaning that RTP will be relayed again to the remote client (unless the `consumer` was also remotely paused).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data sent to the remote client. | No |

</div>

#### consumer.setPreferredProfile(profile)
{: #consumer-setPreferredProfile .code}

Set the given RTP `profile` as the desired profile. No profile higher than the given one will become effective profile for this `consumer`.

For more information, check the [Glossary](/documentation/v2/glossary/#Glossary-Profile) section.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`profile`  | String  | Preffered RTP profile. | Yes |

</div>

<div markdown="1" class="note">
If no preferred profile is set into a `consumer` (meaning that "default" will be used) and the associated source (`producer`) has a preferred profile, that will be used in the `consumer`.
</div>

#### consumer.requestKeyFrame()
{: #consumer-requestKeyFrame .code}

Request a RTCP PLI to the RTP source (if supported).

#### consumer.getStats()
{: #consumer-getStats .code}

Returns a Promise resolving to an array of Objects containing RTC stats related to the `consumer`.

<div markdown="1" class="note">
Check the [RTC stats](/documentation/v2/rtc-stats/) section for more details.
</div>

</section>


### Events
{: #Consumer-events}

The `Consumer` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### consumer.on("close", fn(originator, appData))
{: #consumer-on-close .code}

Emitted when the `consumer` is closed.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### consumer.on("pause", fn(originator, appData))
{: #consumer-on-pause .code}

Emitted when the `consumer` is locally or remotely paused.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### consumer.on("resume", fn(originator, appData))
{: #consumer-on-resume .code}

Emitted when the `consumer` is locally or remotely resumed.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### consumer.on("effectiveprofilechange", fn(profile))
{: #consumer-on-effectiveprofilechange .code}

Emitted when the effective profile changes.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`profile` | String | Current effective RTP profile.

</div>

#### consumer.on("handled", fn())
{: #consumer-on-handled .code}

Emitted when a `transport` is given to this `consumer`.

#### consumer.on("unhandled", fn())
{: #consumer-on-unhandled .code}

Emitted when the associated `transport` is closed.

</section>
