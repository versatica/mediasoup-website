## AudioLevelObserver
{: #AudioLevelObserver}

*TODO*

<section markdown="1">

An audio level observer monitors the volume of audio producers.

</section>


### Dictionaries
{: #AudioLevelObserver-dictionaries}

<section markdown="1">

#### AudioLevelObserverOptions
{: #AudioLevelObserverOptions .code}

<div markdown="1" class="table-wrapper L3">

Field          | Type    | Description  | Required | Default 
-------------- | ------- | ------------ | -------- | ----------
`maxEntries`   | Number  | Maximum number of entries in the "volumes" event. | No | 1
`threshold`    | Number  | Minimum average volume (in dBvo from -127 to 0) for entries in the "volumes" event. | No | -80
`interval`     | Number  | Interval in ms for checking audio volumes. | No | 1000

</div>

</section>


### Methods
{: #AudioLevelObserver-methods}

<section markdown="1">

#### activeSpeakerDetector.close()
{: #activeSpeakerDetector-close .code}

Closes the audio level observer.

</section>


### Events
{: #AudioLevelObserver-events}

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
