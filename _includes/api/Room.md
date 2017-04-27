## Room
{: #Room}

A `room` holds a multiparty RTC (Real-Time Communication) conference.


### Dictionaries
{: #Room-dictionaries}

<section markdown="1">

#### RoomOptions
{: #Room-RoomOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`mediaCodecs`            | sequence<[RoomMediaCodec](#Room-RoomMediaCodec)> | Media codecs available in the `room`. | Yes. |

</div>

#### RoomMediaCodec
{: #Room-RoomMediaCodec .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`mediaCodecs`            | sequence<[RtpCodecParameters](#RtpDictionaries-RtpCodecParameters)> | The list of media codecs supported by the `room`. | Yes |

</div>

<div markdown="1" class="note warn">
 * Feature codecs (such as RTX or FEC) must not be placed into `mediaCodecs`.
 * Entries in `mediaCodecs` must not have `rtcpFeedback` parameter.
</div>

#### AudioLevelInfo
{: #Room-AudioLevelInfo .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`peer`                   | [Peer](#Peer) | `peer` generating audio. | Yes |
`rtpReceiver`            | [RtpReceiver](#RtpReceiver) | `rtpReceiver` generating audio. | Yes |
`audioLevel`             | Integer | Audio level in dBov (0 means maximum level, -127 means no audio). | Yes |

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

#### room.peers
{: #room-peers .code}

* Read only

An Array with the list of [Peer](#Peer) instances in the `room`.

</section>


### Methods
{: #Room-methods}

<section markdown="1">

#### room.close()
{: #room-close .code}

Closes the `room`, including all its `peers`, and triggers a [`close`](#room-on-close) event.

#### room.dump()
{: #room-dump .code}

For debugging purposes. Returns a Promise that resolves to an Object containing the `room` internals.

#### room.Peer(name)
{: #room-Peer .code}

Creates and returns a new [Peer](#Peer) instance.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`name`     | String  | Peer name. Must be unique within the `room`. | Yes |

</div>

Usage example:

```javascript
const peer = room.Peer("alice");
```

#### room.getPeer(name)
{: #room-getPeer .code}

Returns a [Peer](#Peer) with the given `name`, or `undefined` if such a peer does not exist in the `room`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`name`     | String  | Peer name. | Yes |

</div>


### Events
{: #Room-events}

The `Room` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### room.on("close", fn(error))
{: #room-on-close .code}

Emitted when the `room` is closed. In case of error, the callback is called with the corresponding `Error` object.

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

Emitted every 500 ms. Provides information regarding the audio level of each audio `rtpReceiver` in the `room`.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`audioLevelInfos` | sequence<[AudioLevelInfo](#Room-AudioLevelInfo)> | Audio level information entries ordered by level (higher first).

</div>

</section>
