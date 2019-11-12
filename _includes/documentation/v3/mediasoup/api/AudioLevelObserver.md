## AudioLevelObserver
{: #AudioLevelObserver}

<section markdown="1">

> `@inherits` [RtpObserver](#RtpObserver)

An audio level observer monitors the volume of the selected audio producers. It just handles audio producers (if [addProducer()](#rtpObserver-addProducer) is called with a video producer it will fail).

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
`appData`      | Object  | Custom application data. | No | `{ }`

</div>


#### AudioLevelObserverVolume
{: #AudioLevelObserverVolume .code}

<div markdown="1" class="table-wrapper L3">

Field          | Type    | Description  | Required | Default 
-------------- | ------- | ------------ | -------- | ----------
`producer`     | [Producer](#Producer) | The audio producer instance. | Yes |
`volume`       | Number  | The average volume (in dBvo from -127 to 0) of the audio producer in the last interval. | Yes |

</div>

</section>


### Properties
{: #AudioLevelObserver-properties}

<section markdown="1">

See also [RtpObserver Properties](#RtpObserver-properties).

</section>


### Methods
{: #AudioLevelObserver-methods}

<section markdown="1">

See also [RtpObserver Methods](#RtpObserver-methods).

</section>


### Events
{: #AudioLevelObserver-events}

<section markdown="1">

See also [RtpObserver Events](#RtpObserver-events).

#### audioLevelObserver.on("volumes", fn(volumes))
{: #audioLevelObserver-on-volumes .code}

Emitted at most every `interval` ms (see [AudioLevelObserverOptions](#AudioLevelObserverOptions)).

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`volumes` | Array&lt;[AudioLevelObserverVolume](#AudioLevelObserverVolume)&gt; | Audio volumes entries ordered by `volume` (louder ones go first).

</div>

#### audioLevelObserver.on("silence")
{: #audioLevelObserver-on-silence .code}

Emitted when no one of the producers in this RTP observer is generating audio with a volume beyond the given threshold.

</section>


### Observer Events
{: #AudioLevelObserver-observer-events}

<section markdown="1">

See also [RTP Observer Observer Events](#RtpObserver-observer-events).

#### audioLevelObserver.observer.on("volumes", fn(volumes))
{: #audioLevelObserver-observer-on-volumes .code}

Same as the [volumes](#audioLevelObserver-on-volumes) event.

#### audioLevelObserver.observer.on("silence")
{: #audioLevelObserver-observer-on-silence .code}

Same as the [silence](#audioLevelObserver-on-silence) event.

</section>
