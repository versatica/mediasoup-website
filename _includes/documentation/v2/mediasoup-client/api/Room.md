## Room
{: #Room}

A `room` is the local representation of a remote [Room](/documentation/v2/mediasoup/api/#Room) in mediasoup plus our own `peer` joining it.

For more information, check the [Glossary](/documentation/v2/glossary/#Glossary-Room) section.


### Dictionaries
{: #Room-dictionaries}

<section markdown="1">

#### RoomOptions
{: #Room-RoomOptions .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`roomSettings`           | Object  | Remote room settings. If given it must include a `rtpCapabilities` entry (`RTCRtpCapabilities` of the remote room). | No |
`requestTimeout`         | Number | Timeout for mediasoup protocol sent requests (in milliseconds). | No | 10000 (10 seconds)
`transportOptions`       | [TransportOptions](#Transport-TransportOptions) | Options for created `transports`. | No |
`turnServers`            | sequence&lt;[RTCIceServer](https://w3c.github.io/webrtc-pc/#rtciceserver-dictionary)&gt; | Array of TURN servers. | No | `[]`
`iceTransportPolicy`     | String  | The [ICE transport policy](https://w3c.github.io/webrtc-pc/#dom-rtcconfiguration-icetransportpolicy). | No | "all"
`rtcAudioJitterBufferMaxPackets` | Number | Experimental feature in libwebrtc for audio jitter. | No |
`rtcAudioJitterBufferMinDelayMs` | Number | Experimental feature in libwebrtc for audio jitter. | No |
`spy`                    | Boolean | Join as spy peer (other peers won't see this peer) | No | `false`

</div>

<div markdown="1" class="note">
If `roomSettings` is given (so it's an Object with `rtpCapabilities`) mediasoup-client will not request them when [room.join()](#room-join) is called.

You can manually get the server side room's RTP capabilities via the [room.rtpCapabilities](/documentation/v2/mediasoup/api/#room-rtpCapabilities) getter.

Here you have a chance to mangle those room RTP capabilities and remove/reorder codecs (to force this mediasoup-client `room` instance to use a preferred video codec and so on).
</div>

<div markdown="1" class="note warn">
It's up to the application server running mediasoup whether a `peer` with `spy: true` must be allowed to join a room or not. The server can do this by inspecting the mediasoup protocol request with `method: 'join'`.

For more inforrmation, see the [mediasoup protocol](/documentation/v2/mediasoup-protocol/) and the [usage example](/documentation/v2/mediasoup/api/#room-receiveRequest) in server side.
</div>

</section>


### Constructor
{: #Room-constructor}

<section markdown="1">

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`options`  | [RoomOptions](#Room-RoomOptions) | Room options. | No |

</div>

Usage example:

```javascript
const room = mediasoupClient.Room(
  {
    requestTimeout : 8000
  });
```

</section>


### Properties
{: #Room-properties}

<section markdown="1">

#### room.joined
{: #room-joined .code}

* Read only

A Boolean indicating whether the `room` has been joined.

#### room.closed
{: #room-closed .code}

* Read only

A Boolean indicating whether the `room` has been closed.

#### room.peerName
{: #room-peerName .code}

* Read only.

An String representing the `name` of own our `Peer`.

#### room.transports
{: #room-transports .code}

* Read only

An Array with our list of [Transport](#Transport) instances in the `room`.

#### room.producers
{: #room-producers .code}

* Read only

An Array with our list of [Producer](#Producer) instances in the `room`.

#### room.peers
{: #room-peers .code}

* Read only

An Array with the list of remote [Peer](#Peer) instances in the `room`.

</section>


### Methods
{: #Room-methods}

<section markdown="1">

#### room.join(peerName, [appData])
{: #room-join .code}

Start the procedures to join a remote `room`. Returns a Promise resolving with an Array of remote [Peer](#Peer) instances already in the `room`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`peerName` | String  | My `Peer` name. | Yes |
`appData`  | Any     | Custom app data. | No |

</div>

Usage example:

```javascript
room.join("alice")
  .then((peers) =>
  {
    console.info("room joined");
  });
```

<div markdown="1" class="note">
Once the Promise returned by `join()` resolves, it's recommended to immediately iterate all the `peers` the Promise resolves with, and also all the `consumers` in each `peer` so they can be enabled for media reception.
</div>

#### room.leave([appData])
{: #room-leave .code}

Leaves the `room` and triggers a [`close`](#room-on-close) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### room.receiveNotification(notification)
{: #room-receiveNotification .code}

Receive a [mediasoup protocol](/documentation/v2/mediasoup-protocol/) notification payload (generated by mediasoup).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`notification` | Object  | mediasoup protocol notification. | Yes |

</div>

The method does not return anything.

#### room.canSend(kind)
{: #room-canSend .code}

Whether we can send the given `kind` of media (it depends on the available room and device codecs).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`kind`     | String  | Media kind ("audio" or "video"). | Yes |

</div>

#### room.createTransport(direction, [appData])
{: #room-createTransport .code}

Creates a new [Transport](#Transport) for sending or receiving audio/video.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`direction`| String  | Direction of the media ("send" or "recv"). | Yes |
`appData`  | Any     | Custom app data. | No |

</div>

#### room.createProducer(track, [options], [appData])
{: #room-createProducer .code}

Creates a new [Producer](#Producer) for the given audio/video `track`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`track`    | [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) | Audio/video track. | Yes |
`options`  | [ProducerOptions](#Producer-ProducerOptions) | Options for the `producer`. | No |
`appData`  | Any     | Custom app data. | No |

</div>

Usage example:

```javascript
let micProducer;
let webcamProducer;

navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  .then((stream) =>
  {
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];

    micProducer = room.createProducer(audioTrack);
    webcamProducer = room.createProducer(videoTrack);
  });
```

<div markdown="1" class="note">
Within the new `Producer`, the given `track` is internally cloned, so the application can safely `stop()` the original `track`.
</div>

<div markdown="1" class="warn">
The above is not true in [react-native-webrtc](https://github.com/oney/react-native-webrtc/) because it does not implement `track.clone()` and, hence, the `track` handled by the `Producer` is the original one and MUST NOT be stopped by the application.
</div>

#### room.restartIce()
{: #room-restartIce .code}

Restarts all the [Transport](#Transport) instances by following ICE rules. Useful when detecting IP change.

#### room.getTransportById(name)
{: #room-getTransportById .code}

Retrieves the [Transport](#Transport) with the given `id`, or `undefined` if not found.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`id`       | Number | Transport id. | Yes |

</div>

#### room.getProducerById(name)
{: #room-getProducerById .code}

Retrieves the [Producer](#Producer) with the given `id`, or `undefined` if not found.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`id`       | Number | Producer id. | Yes |

</div>

#### room.getPeerByName(name)
{: #room-getPeerByName .code}

Retrieves the remote [Peer](#Peer) with the given `name`, or `undefined` if not found.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`name`     | String  | Peer name. | Yes |

</div>

</section>


### Events
{: #Room-events}

The `Room` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### room.on("close", fn(appData))
{: #room-on-close .code}

Emitted when the `room` is closed or when our `peer` leaves it.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`appData` | Any     | Custom app data.

</div>

#### room.on("request", fn(request, callback, errback))
{: #room-on-request .code}

Emitted when a new [mediasoup protocol](/documentation/v2/mediasoup-protocol/) request must be sent to mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description   
---------- | ------- | ----------------
`request`  | Object | mediasoup protocol request.
`callback` | Function | Function that must be called with the mediasoup protocol response received from mediasoup as single argument.
`errback`  | Function | Function that must be called with an error (`Error` instance or String) if the request failed for any reason.

</div>

Usage example:

```javascript
room.on("request", (request, callback, errback) =>
{
  myChannel.send({ type: "mediasoup-request", body: request })
    .then((response) =>
    {
      // Success response, so pass the mediasoup response to the local Room.
      callback(response.body);
    })
    .catch((error) =>
    {
      // Error response, so pass the error to the local Room.
      errback(error);
    });
});
```

#### room.on("notify", fn(notification))
{: #room-on-notify .code}

Emitted when a new [mediasoup protocol](/documentation/v2/mediasoup-protocol/) notification must be sent to mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`notification` | Object | mediasoup protocol notification.

</div>

Usage example:

```javascript
room.on("notify", (notification) =>
{
  myChannel.send({ type: 'mediasoup-notification', body: notification });
});
```

#### room.on("newpeer", fn(peer))
{: #room-on-newpeer .code}

Emitted when a new remote `peer` joins the `room`.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`peer`   | [Peer](#Peer) | New remote `peer`.

</div>

<div markdown="1" class="note">
When the `newpeer` event is fired, the application should immediately iterate all the `consumers` in the new `peer` if it wishes to enable them.
</div>

</section>
