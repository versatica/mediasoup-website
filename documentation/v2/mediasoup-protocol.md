---
title   : mediasoup protocol
---


# mediasoup protocol

Although mediasoup does not implement a signaling protocol, both the client (mediasoup-client) and the server (mediasoup) must exchange messages. Those messages can be **request**/**response** pairs or **notifications**, and can be sent in both directions.

Those messages can be serialized to JSON bodies for network transmission, but may be converted into JavaScripts Objects (`JSON.parse()`) before they are given to the corresponding API methods in both mediasoup and mediasoup-client.

The exact definition of the message payloads that must be exchanged is documented in the [MEDIASOUP_PROTOCOL.md](https://github.com/versatica/mediasoup-client/blob/v2/MEDIASOUP_PROTOCOL.md) file included in the mediasoup-client source code.

<div markdown="1" class="note">
The application developer does not need to know in depth about these messages, but can intercept them for advanced usages.
</div>


## Request/response pairs and notifications

mediasoup-client can generate both **requests** and **notifications** to be sent to mediasoup, while mediasoup just generates **notifications** and **responses** for mediasoup-client.

* A mediasoup protocol **request** is an Object that requires a **response** from the other side.
* A mediasoup protocol **notification** is also an Object that includes a `notification: true` key/value and does **NOT** require a **response**.

<div markdown="1" class="note">
It's up to the application how to correlate those **requests** and their associated **responses**, for example by enveloping the **request** and its **response** into a signaling transaction that uses a `id` field to match them.
</div>


## Message target

Both **requests** and **notifications** sent by mediasoup-client have a `target` key whose value can be "room" or "peer":

* `target: "room"` means that the **request** or **notification** must be delivered to the corresponding server side [Room](/documentation/v2/mediasoup/api/#Room).
  * The `Room` just accepts **requests** by calling to its [room.receiveRequest()](/documentation/v2/mediasoup/api/#room-receiveRequest) method.
* `target: "peer"` means that the **request** or **notification** must be delivered to the corresponding server side [Peer](/documentation/v2/mediasoup/api/#Peer).
  * The `Peer` accepts **requests** by calling to its [peer.receiveRequest()](/documentation/v2/mediasoup/api/#peer-receiveRequest) method.
  * The `Peer` accepts **notifications** by calling to its [peer.receiveNotification()](/documentation/v2/mediasoup/api/#peer-receiveNotification) method.

<div markdown="1" class="note">
It's up to the application how to correlate those **requests** and their associated **responses**, for example by enveloping the **request** and its **response** into a signaling transaction that uses a `id` field to match them.
</div>


## Message examples

Those real messages are directly taken from the [MEDIASOUP_PROTOCOL.md](https://github.com/versatica/mediasoup-client/blob/v2/MEDIASOUP_PROTOCOL.md) file included in the mediasoup-client source code. Here they are represented in JSON format.


### mediasoup-client request sent to the mediasoup Room

* **request**:

```json
{
  "method": "queryRoom",
  "target": "room"
}
```

* **response**:

```json
{
  "rtpCapabilities": {},
  "mandatoryCodecPayloadTypes": []
}
```

### mediasoup-client request sent to the mediasoup Peer

* **request**:

```json
{
  "method": "createTransport",
  "target": "peer",
  "id": 1111,
  "options": {},
  "dtlsParameters": {},
  "appData": "foo"
}
```

* **response**:

```json
{
  "iceParameters": {},
  "iceCandidates": [],
  "dtlsParameters": {}
}
```

### mediasoup-client notification sent to the mediasoup Peer

* **notification**:

```json
{
  "method": "leave",
  "target": "peer",
  "notification": true,
  "appData": 1234
}
```

### mediasoup notification sent to the mediasoup-client Peer

* **notification**:

```json
{
  "method": "transportStats",
  "target": "peer",
  "notification": true,
  "id": 3333,
  "stats": []
}
```
