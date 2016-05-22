## Room
{: #Room}

A `room` holds a multiparty RTC (Real-Time Communication) conference.


### Dictionaries
{: #Room-dictionaries}

<section markdown="1">

#### RoomSettings
{: #Room-RoomSettings .code}

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`forceUniquePayloadTypes` | Boolean | TBD. | No | `false`

</div>

</section>


### Properties
{: #Room-properties}

<section markdown="1">

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

```json
{
  "roomId"                   : 45450588,
  "options"                  : {},
  "peers"                    : [],
  "mapRtpReceiverRtpSenders" : {}
}
```

#### room.Peer(name)
{: #room-Peer .code}

Returns a new [Peer](#Peer) instance.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`name`     | String  | Peer name. Must be unique within the `room`. | Yes |

</div>

Usage example:

```javascript
var peer = room.Peer("alice");
```

#### room.getPeer(name)
{: #room-getPeer .code}

Returns a [Peer](#Peer) with the given `name`, or `undefined` if such a peer does not exist in the `room`.

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

#### room.on("close", fn(error))
{: #room-on-close .code}

Emitted when the `room` is closed. In case of error, the callback is called with the corresponding `Error` object.

</section>
