## Room
{: #Room}

A `room` holds a multiparty RTC (Real-Time Communication) conference.


### Dictionaries
{: #Room-dictionaries}

<section markdown="1">

#### RoomMediaCodec
{: #Room-RoomMediaCodec .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`kind`                   | String  | Media kind ("audio" or "video"). | Yes. |
`name`                   | String  | The codec MIME subtype. Valid values are listed in [IANA-RTP-2](http://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-2). Examples: "opus", "VP8", "H264". | Yes |
`preferredPayloadType`   | Integer | The value that goes in the RTP Payload Type Field. Must be unique. If unset, **mediasoup** chooses. | No |
`clockRate`              | Integer | Codec clock rate expressed in Hertz. | Yes |
`channels`               | Integer | The number of channels (mono=1, stereo=2) for audio codecs. | No | 1
`parameters`             | Dictionary | Codec-specific parameters available for signaling. | No |

</div>

<div markdown="1" class="note warn">
 * Feature codecs (such as RTX or FEC) must not be placed into `mediaCodecs`.
</div>

#### AudioLevelInfo
{: #Room-AudioLevelInfo .code}

<div markdown="1" class="table-wrapper L3">

Field            | Type    | Description   | Required | Default
---------------- | ------- | ------------- | -------- | ---------
`producer`       | [Producer](#Producer) | `producer` generating audio. | Yes |
`audioLevel`     | Integer | Audio level in dBov (0 means maximum level, -127 means no audio). | Yes |

</div>

</section>


### Properties
{: #Room-properties}

<section markdown="1">

#### room.id
{: #room-id .code}

* Read only

Unique identifier (number).

#### room.closed
{: #room-closed .code}

* Read only

A Boolean indicating whether the `room` has been closed.

#### room.rtpCapabilities
{: #room-rtpCapabilities .code}

* Read only.

An Object with the RTP capabilities of the room, miming the syntax of [RTCRtpCapabilities](http://draft.ortc.org/#dom-rtcrtpcapabilities) in ORTC.

#### room.peers
{: #room-peers .code}

* Read only

An Array with the list of [Peer](#Peer) instances in the `room`.

</section>


### Methods
{: #Room-methods}

<section markdown="1">

#### room.close([appData])
{: #room-close .code}

Closes the `room`, including all its `peers`, and triggers a [`close`](#room-on-close) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### room.getPeerByName(name)
{: #room-getPeerByName .code}

Retrieves the [Peer](#Peer) with the given `name`, or `undefined` if not found.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`name`     | String  | Peer name. | Yes |

</div>

#### room.receiveRequest(request)
{: #room-receiveRequest .code}

*TODO*

#### room.createActiveSpeakerDetector()
{: #room-createActiveSpeakerDetector .code}

*TODO*

#### room.createRtpStreamer(producer, [options])
{: #room-createRtpStreamer .code}

*TODO*

</section>


### Events
{: #Room-events}

The `Room` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### room.on("close", fn(appData))
{: #room-on-close .code}

Emitted when the `room` is closed. If [close()](#room-close) was called with `appData` as argument, same value will be provided in the callback argument.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`appData` | Any     | Custom app data.

</div>


#### room.on("newpeer", peer)
{: #room-on-newpeer .code}

Emitted when a new `peer` is created.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`peer`   | [Peer](#Peer) | New `peer`.

</div>

#### room.on("audiolevels", fn(audioLevelInfos))
{: #room-on-audiolevels .code}

Emitted every few milliseconds. It provides information regarding the audio level of each audio `producer` in the `room`.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`audioLevelInfos` | sequence<[AudioLevelInfo](#Room-AudioLevelInfo)> | Audio level information entries ordered by `audioLevel` (higher first).

</div>

</section>
