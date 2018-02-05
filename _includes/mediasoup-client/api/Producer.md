## Producer
{: #Producer}

A `producer` represents an audio/video media track sent to the `room`.

For more information, check the [Glossary](/documentation/glossary#Glossary-Producer) section.


### Dictionaries
{: #Producer-dictionaries}

<section markdown="1">

#### ProducerOptions
{: #Producer-ProducerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field       | Type    | Description   | Required | Default
----------- | ------- | ------------- | -------- | ---------
`simulcast` | [SimulcastOptions](#Producer-SimulcastOptions)\|Boolean | Simulcast options. | No |              

</div>

<div markdown="1" class="note">
If `simulcast` is set to `true`, a default value will be set. Note that in some browsers there is no API to specify bitrates for simulcast streams (such as in Chrome family) so passing an a [SimulcastOptions](#Producer-SimulcastOptions) Object here is the same as just setting it to `true`.
</div>


#### SimulcastOptions
{: #Producer-SimulcastOptions .code}

Options for simulcast streams.

<div markdown="1" class="table-wrapper L3">

Field    | Type    | Description   | Required | Default
-------- | ------- | ------------- | -------- | ---------
`low`    | Integer | Bitrate (in kbps) of the lowest stream. | No | 100000          
`medium` | Integer | Bitrate (in kbps) of the medium stream. | No | 300000          
`high`   | Integer | Bitrate (in kbps) of the highest stream. | No | 1500000          

</div>

<div markdown="1" class="note">
Given values are just a hint. Certain browsers don't even expose an API to define the bitrate of each simulcast layer.
</div>

</section>


### Properties
{: #Producer-properties}

<section markdown="1">

#### producer.id
{: #producer-id .code}

* Read only

Unique identifier (Integer).

#### producer.closed
{: #producer-closed .code}

* Read only

A Boolean indicating whether the `producer` has been closed.

#### producer.appData
{: #producer-appData .code}

* Read-write

Custom data set by the application.

#### producer.kind
{: #producer-kind .code}

* Read only

The media kind ("audio" or "video") handled by the `producer`.

#### producer.track
{: #producer-track .code}

* Read only

The [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) internally handled by the `producer`.

#### producer.originalTrack
{: #producer-originalTrack .code}

* Read only

The original [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) given to the `producer` (not internally used).

#### producer.transport
{: #producer-transport .code}

* Read only

The [Transport](#Transport) assigned to this `producer` (if any).

#### producer.rtpParameters
{: #producer-rtpParameters .code}

* Read only

An Object with the effective RTP parameters of the `producer`, miming the syntax of [RTCRtpParameters](http://draft.ortc.org/#dom-rtcrtpparameters) in ORTC.

#### producer.locallyPaused
{: #producer-locallyPaused .code}

* Read only

Boolean indicating whether this `producer` has been locally paused.

#### producer.remotelyPaused
{: #producer-remotelyPaused .code}

* Read only

Boolean indicating whether this `producer` has been remotely paused.

#### producer.paused
{: #producer-paused .code}

* Read only

Boolean indicating whether this `producer` has been locally or remotely paused.

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

#### producer.send(transport)
{: #producer-send .code}

Enables sending RTP for this `producer` by providing a `transport`. It returns a Promise.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`transport` | [Transport](#Transport) | `transport` with `direction` "send". | Yes |

</div>

#### producer.pause([appData])
{: #producer-pause .code}

Pauses the `producer` locally, meaning that no RTP will be sent to the `room`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### producer.resume([appData])
{: #producer-resume .code}

Resumes the `producer` locally, meaning that RTP will be relayed again to the `room` (unless the `producer` was also remotely paused).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### producer.replaceTrack(track)
{: #producer-replaceTrack .code}

Replaces the audio/video track being sent to the `room`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`track `   | [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) | New audio/video track. | Yes |

</div>

#### producer.enableStats([interval = 1000])
{: #producer-enableStats .code}

Subscribes the `producer` to RTC stats retrieved via the [`stats`](#producer-on-stats) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`interval` | Integer | Stats retrieval interval (in milliseconds). | No | 1000

</div>

<div markdown="1" class="note">
Check the [RTC stats](/documentation/rtc-stats/) section for more details.
</div>

#### producer.disableStats()
{: #producer-disableStats .code}

Closes the subscription to RTC stats for this `producer`.

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

#### producer.on("trackended", fn())
{: #producer-on-trackended .code}

Emitted when the internally managed `track`'s is stopped (useful to detect microphone or webcam disconnection/failures). The `producer` is not automatically closed (it's up to the application to close it or not).

#### producer.on("handled", fn())
{: #producer-on-handled .code}

Emitted when a `transport` is given to this `producer`.

#### producer.on("unhandled", fn())
{: #producer-on-unhandled .code}

Emitted when the associated `transport` is closed.

#### producer.on("stats", fn(stats))
{: #producer-on-stats .code}

Emitted when RTC stats are retrieved.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
---------| ------- | ----------------
`stats`  | sequence&lt;Object&gt; | RTC stats.

</div>

</section>
