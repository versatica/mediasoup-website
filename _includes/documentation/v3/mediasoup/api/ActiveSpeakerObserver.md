## ActiveSpeakerObserver
{: #ActiveSpeakerObserver}

<section markdown="1">

> `@inherits` [RtpObserver](#RtpObserver)

An active speaker observer monitors the speech activity of the selected audio producers. It just handles audio producers (if [addProducer()](#rtpObserver-addProducer) is called with a video producer it will fail).

Implementation of Dominant Speaker Identification for Multipoint Videoconferencing by Ilana Volfin and Israel Cohen. This implementation uses the RTP Audio Level extension from RFC-6464 for the input signal. This has been ported from [DominantSpeakerIdentification.java](https://github.com/jitsi/jitsi-utils/blob/master/src/main/java/org/jitsi/utils/dsi/DominantSpeakerIdentification.java) in Jitsi. Audio levels used for speech detection are read from an RTP header extension. No decoding of audio data is done. See [RFC6464](https://tools.ietf.org/html/rfc6464) for more information.

</section>


### Dictionaries
{: #ActiveSpeakerDetection-dictionaries}

<section markdown="1">

#### ActiveSpeakerObserverOptions
{: #ActiveSpeakerObserverOptions .code}

<div markdown="1" class="table-wrapper L3">

Field          | Type    | Description  | Required | Default 
-------------- | ------- | ------------ | -------- | ----------
`interval`     | Number  | Interval in ms for checking audio volumes. | No | 300
`appData`      | Object  | Custom application data. | No | `{ }`

</div>


#### ActiveSpeakerObserverActivity
{: #ActiveSpeakerObserverActivity .code}

<div markdown="1" class="table-wrapper L3">

Field          | Type    | Description  | Required | Default 
-------------- | ------- | ------------ | -------- | ----------
`producer`     | [Producer](#Producer) | The dominant audio producer instance. | Yes |

</div>

</section>


### Properties
{: #ActiveSpeakerObserver-properties}

<section markdown="1">

See also [RtpObserver Properties](#RtpObserver-properties).

</section>


### Methods
{: #ActiveSpeakerObserver-methods}

<section markdown="1">

See also [RtpObserver Methods](#RtpObserver-methods).

</section>


### Events
{: #ActiveSpeakerObserver-events}

<section markdown="1">

See also [RtpObserver Events](#RtpObserver-events).

#### activeSpeakerObserver.on("dominantspeaker", fn(dominantSpeaker))
{: #activeSpeakerObserver-on-dominantspeaker .code}

Emitted when a new dominant speaker is detected.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`dominantSpeaker` | [Producer](#Producer) | Audio producer with most dominant audio in the last interval.

</div>

</section>


### Observer Events
{: #ActiveSpeakerObserver-observer-events}

<section markdown="1">

See also [RTP Observer Observer Events](#RtpObserver-observer-events).

#### activeSpeakerObserver.observer.on("dominantspeaker", fn(event))
{: #activeSpeakerObserver-observer-on-dominantspeaker .code}

Same as the [dominantspeaker](#activeSpeakerObserver-on-dominantspeaker) event.

</section>
