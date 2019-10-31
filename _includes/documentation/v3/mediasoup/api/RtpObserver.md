## RtpObserver
{: #RtpObserver}

<section markdown="1">

> `@abstract`

An RTP observer inspects the media received by a set of selected producers.

mediasoup implements the following RTP observer classes:

* [AudioLevelObserver](#AudioLevelObserver)

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

#### rtpObserver.paused
{: #rtpObserver-paused .code}

Whether the RTP observer is paused.

> `@type` Boolean, read only

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

#### rtpObserver.addProducer(producer)
{: #rtpObserver-addProducer .code}

Provides the RTP observer with a new producer to monitor.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`producer`  | [Producer](#Producer) | Producer. | Yes |

</div>

> `@async`

#### rtpObserver.removeProducer(producer)
{: #rtpObserver-removeProducer .code}

Removes the given producer from the RTP observer.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`producer`  | [Producer](#Producer) | Producer. | Yes |

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

</section>

