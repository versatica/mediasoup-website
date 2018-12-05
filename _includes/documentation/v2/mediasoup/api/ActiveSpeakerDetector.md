## ActiveSpeakerDetector
{: #ActiveSpeakerDetector}

An `activeSpeakerDetector` provides the `room` with the highest audio volume level.

<div markdown="1" class="note">
The `ActiveSpeakerDetector` mechanism is based on the [`audiolevels`](#room-on-audiolevels) event of the `room`.
</div>


### Methods
{: #ActiveSpeakerDetector-methods}

<section markdown="1">

#### activeSpeakerDetector.close()
{: #activeSpeakerDetector-close .code}

Closes the `activeSpeakerDetector` and triggers a [`close`](#activeSpeakerDetector-on-close) event.

</section>


### Events
{: #ActiveSpeakerDetector-events}

The `ActiveSpeakerDetector` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### activeSpeakerDetector.on("close", fn())
{: #activeSpeakerDetector-on-close .code}

Emitted when the `activeSpeakerDetector` is closed.

#### activeSpeakerDetector.on("activespeakerchange", peer, producer)
{: #activeSpeakerDetector-on-activespeakerchange .code}

Emitted when a new active speaker is detected.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`peer`    | [Peer](#Peer) | Associated `peer`.
`producer`| [Producer](#Producer) | Associated audio `producer`.

</div>

<div markdown="1" class="note">
Both `peer` and `producer` can be `undefined` when no active speaker is detected.
</div>

</section>
