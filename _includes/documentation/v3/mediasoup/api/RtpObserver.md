## RtpObserver
{: #RtpObserver}

<section markdown="1">

> `@abstract`

An RTP observer inspects the media received by a set of selected producers.

mediasoup implements the following RTP observer classes:

* [ActiveSpeakerObserver](#ActiveSpeakerObserver)
* [AudioLevelObserver](#AudioLevelObserver)

</section>


### Dictionaries
{: #RtpObserver-dictionaries}

<section markdown="1">

#### RtpObserverAddRemoveProducerOptions
{: #RtpObserverAddRemoveProducerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`producerId`    | String  | Id of the producer to add or remove. | Yes |

</div>

</section>


### Enums
{: #Transport-enums}

<section markdown="1">

#### RtpObserverType
{: #RtpObserverType .code}

<div markdown="1" class="table-wrapper L2">

Value           | Description
--------------- | -------------
"activespeaker" | The type of [ActiveSpeakerObserver](#ActiveSpeakerObserver).
"audiolevel"    | The type of [AudioLevelObserver](#AudioLevelObserver).

</div>

</section>


### Properties
{: #RtpObserver-properties}

<section markdown="1">

These are properties common to all RTP observer classes. Each RTP observer class may define new ones.

#### rtpObserver.id
{: #rtpObserver-id .code}

RTP observer identifier.

> `@type` String, read only

#### rtpObserver.closed
{: #rtpObserver-closed .code}

Whether the RTP observer is closed.

> `@type` Boolean, read only

#### rtpObserver.type
{: #rtpObserver-type .code}

RTP observer type.

> `@type` [RtpObserverType](#RtpObserverType), read only

#### rtpObserver.paused
{: #rtpObserver-paused .code}

Whether the RTP observer is paused.

> `@type` Boolean, read only

#### rtpObserver.appData
{: #rtpObserver-appData .code}

Custom data provided by the application in the worker factory method. The app can modify it at any  time.

> `@type` [AppData](#AppData)

#### rtpObserver.observer
{: #rtpObserver-observer .code}

See the [Observer Events](#RtpObserver-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #RtpObserver-methods}

<section markdown="1">

These are methods common to all RTP observer classes. Each RTP observer class may define new ones.

#### rtpObserver.close()
{: #rtpObserver-close .code}

Closes the RTP observer.

#### rtpObserver.pause()
{: #rtpObserver-pause .code}

Pauses the RTP observer. No RTP is inspected until `resume()` is called.

> `@async`

#### rtpObserver.resume()
{: #rtpObserver-resume .code}

Resumes the RTP observer. RTP is inspected again.

> `@async`

#### rtpObserver.addProducer(options)
{: #rtpObserver-addProducer .code}

Provides the RTP observer with a new producer to monitor.

<div markdown="1" class="table-wrapper L3">

Argument     | Type    | Description | Required | Default 
------------ | ------- | ----------- | -------- | ----------
`options`    | [RtpObserverAddRemoveProducerOptions](#RtpObserverAddRemoveProducerOptions) | Options. | Yes |

</div>

> `@async`

#### rtpObserver.removeProducer(options)
{: #rtpObserver-removeProducer .code}

Removes the given producer from the RTP observer.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`    | [RtpObserverAddRemoveProducerOptions](#RtpObserverAddRemoveProducerOptions) | Options. | Yes |

</div>

> `@async`

</section>


### Events
{: #RtpObserver-events}

<section markdown="1">

These are events common to all RTP observer classes. Each RTP observer class may define new ones.

#### rtpObserver.on("routerclose")
{: #rtpObserver-on-routerclose .code}

Emitted when the router this RTP observer belongs to is closed for whatever reason. The RTP observer itself is also closed.

```javascript
rtpObserver.on("routerclose", () =>
{
  console.log("router closed so RTP observer closed");
});
```

#### rtpObserver.on("listenererror", fn(eventName, error))
{: #rtpObserver-on-listenererror .code}

Emitted when an event listener given by the application throws. The exception is silently ignored internally to not break the internal state. By listening to this event, the application can be aware of exceptions happening in its given event listeners.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`eventName` | String  | The name of the event.
`error`     | Error   | The error happening in the application given event listener.

</div>

</section>


### Observer Events
{: #RtpObserver-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

These are observer events common to all RTP observer classes. Each transport class may define new ones.

#### rtpObserver.observer.on("close", fn())
{: #rtpObserver-observer-on-close .code}

Emitted when the RTP observer is closed for whatever reason.

#### rtpObserver.observer.on("pause", fn())
{: #rtpObserver-observer-on-pause .code}

Emitted when the RTP observer is paused.

#### rtpObserver.observer.on("resume", fn())
{: #rtpObserver-observer-on-resume .code}

Emitted when the RTP observer is resumed.

#### rtpObserver.observer.on("addproducer", fn(producer))
{: #rtpObserver-observer-on-addproducer .code}

Emitted when a new producer is added into the RTP observer.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`producer` | [Producer](#Producer) | New producer.

</div>

#### rtpObserver.observer.on("removeproducer", fn(producer))
{: #rtpObserver-observer-on-removeproducer .code}

Emitted when a producer is removed from the RTP observer.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`producer` | [Producer](#Producer) | New producer.

</div>

</section>
