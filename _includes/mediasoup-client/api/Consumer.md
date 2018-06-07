## Consumer
{: #Consumer}

A `consumer` represents an audio/video media track received from the `room`.

For more information, check the [Glossary](/documentation/glossary/#Glossary-Consumer) section.


### Properties
{: #Consumer-properties}

<section markdown="1">

#### consumer.id
{: #consumer-id .code}

* Read only

Unique identifier (Integer).

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

#### consumer.rtpParameters
{: #consumer-rtpParameters .code}

* Read only

An Object with the effective RTP parameters of the `consumer`, miming the syntax of [RTCRtpParameters](https://draft.ortc.org/#rtcrtpparameters*) in ORTC.

#### consumer.track
{: #consumer-track .code}

* Read only

The [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) internally handled by the `consumer`.

It is `undefined` if [`receive()`](#consumer-receive) was not called before.

#### consumer.peer
{: #consumer-peer .code}

* Read only

The remote [Peer](#Peer) instance producing the media.

It is `undefined` if this is not a `Consumer` associated to a remote `peer`.

#### consumer.supported
{: #consumer-supported .code}

* Read only

A Boolean indicating whether our browser/device can enable this `Consumer`. If we don't support the audio/video codec this won't be `true`.

#### consumer.transport
{: #consumer-transport .code}

* Read only

The [Transport](#Transport) assigned to this `consumer` (if any).

#### consumer.locallyPaused
{: #consumer-locallyPaused .code}

* Read only

Boolean indicating whether this `consumer` has been locally paused.

#### consumer.remotelyPaused
{: #consumer-remotelyPaused .code}

* Read only

Boolean indicating whether this `consumer` has been remotely paused.

#### consumer.paused
{: #consumer-paused .code}

* Read only

Boolean indicating whether this `consumer` has been locally or remotely paused.

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

#### consumer.receive(transport)
{: #consumer-receive .code}

Enables receiving RTP for this `consumer` by providing a `transport`. It returns a Promise resolving to a remote [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack).

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`transport` | [Transport](#Transport) | `transport` with `direction` "recv". | Yes |

</div>

Usage example:

```javascript
const stream = new MediaStream();

consumer.receive(recvTransport)
  .then((track) =>
  {
    stream.addTrack(track);
    videoElem.srcObject = stream;
  });
```

#### consumer.pause([appData])
{: #consumer-pause .code}

Pauses the `consumer` locally, meaning that no RTP will be received from the `room`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### consumer.resume([appData])
{: #consumer-resume .code}

Resumes the `consumer` locally, meaning that RTP will be received again from the `room` (unless the `consumer` or its remote source was also remotely paused).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### consumer.setPreferredProfile(profile)
{: #consumer-setPreferredProfile .code}

Set the given RTP `profile` as the desired profile. No profile higher than the given one will become effective profile for this `consumer`.

For more information, check the [Glossary](/documentation/glossary/#Glossary-Profile) section.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`profile`  | String  | Preffered RTP profile. | Yes |

</div>

#### consumer.enableStats([interval = 1000])
{: #consumer-enableStats .code}

Subscribes the `consumer` to RTC stats retrieved via the [`stats`](#consumer-on-stats) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`interval` | Integer | Stats retrieval interval (in milliseconds). | No | 1000

</div>

<div markdown="1" class="note">
Check the [RTC stats](/documentation/rtc-stats/) section for more details.
</div>

#### consumer.disableStats()
{: #consumer-disableStats .code}

Closes the subscription to RTC stats for this `consumer`.

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

#### consumer.on("stats", fn(stats))
{: #consumer-on-stats .code}

Emitted when RTC stats are retrieved.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
---------| ------- | ----------------
`stats`  | sequence&lt;Object&gt; | RTC stats.

</div>

</section>
