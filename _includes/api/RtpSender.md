## RtpSender
{: #RtpSender}

*TBD*


### Properties
{: #RtpSender-properties}

<section markdown="1">

*TBD*

</section>


### Methods
{: #RtpSender-methods}

<section markdown="1">

#### rtpSender.dump()
{: #rtpSender-dump .code}

For debugging purposes. Returns a Promise that resolves to an Object containing the `rtpSender` internals.

```json
{
  "rtpSenderId"   : 67138704,
  "kind"          : "audio",
  "rtpParameters" : {}
}
```

#### rtpSender.isRtpSender()
{: #rtpSender-isRtpSender .code}

Returns `true`.

#### rtpSender.isRtpReceiver()
{: #rtpSender-isRtpReceiver .code}

Returns `false`.

</section>


### Events
{: #RtpSender-events}

The `RtpSender` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

*TBD*

</section>
