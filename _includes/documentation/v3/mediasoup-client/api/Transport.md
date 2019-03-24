## Transport
{: #Transport}

A `transport` represents a path, negotiated via ICE and DTLS, for sending or receiving audio/video RTP.

For more information, check the [Glossary](/documentation/v2/glossary/#Glossary-Transport) section.

<div markdown="1" class="note">
Internally, the `transport` runs a specific handler depending on the underlying browser/device. This may be a `RTCPeerConnection` with Plan-B, or Unified-Plan, using legacy or modern WebRTC API, or even a set of `RTCIceTransport`, `RTCDtlsTransport`, `RTCRtpSender`, `RTCRtpReceiver` instances when the browser/device runs ORTC inside.
</div>


### Dictionaries
{: #Transport-dictionaries}

<section markdown="1">

#### TransportOptions
{: #Transport-TransportOptions .code}

Options for a [Transport](/documentation/v2/mediasoup/api/#Transport) in mediasoup (server side).

<div markdown="1" class="table-wrapper L3">

Field                    | Type    | Description   | Required | Default
------------------------ | ------- | ------------- | -------- | ---------
`udp`                    | Boolean | Offer UDP ICE candidates. | No | `true`
`tcp`                    | Boolean | Offer TCP ICE candidates. | No | `true`
`preferIPv4`             | Boolean | Prefer IPv4 over IPv6 ICE candidates. | No | `false`
`preferIPv6`             | Boolean | Prefer IPv6 over IPv4 ICE candidates. | No | `false`
`preferUdp`              | Boolean | Prefer UDP over TCP ICE candidates. | No | `false`
`preferTcp`              | Boolean | Prefer TCP over UDP ICE candidates. | No | `false`

</div>

</section>


### Enums
{: #Transport-enums}

<section markdown="1">

#### ConnectionState
{: #Transport-ConnectionState .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"new"          | ICE procedures not initiated yet.
"connecting"   | ICE procedures initiated.
"connected"    | ICE connected.
"failed"       | ICE procedures failed.
"disconnected" | ICE connection was temporaty closed.
"closed"       | ICE state when the `transport` has been closed.

</div>

</section>


### Properties
{: #Transport-properties}

<section markdown="1">

#### transport.id
{: #transport-id .code}

* Read only

Unique identifier (Number).

#### transport.closed
{: #transport-closed .code}

* Read only

A Boolean indicating whether the `transport` has been closed.

#### transport.appData
{: #transport-appData .code}

* Read-write

Custom data set by the application.

#### transport.direction
{: #transport-direction .code}

* Read only

A String ("send" or "recv") representing the direction of the media over this `transport`.

#### transport.connectionState
{: #transport-connectionState .code}

* Read only

The [ConnectionState](#Transport-ConnectionState) of the underlying `RTCPeerConnection` or `RTCIceTransport`.


#### transport.handler
{: #transport-handler .code}

* Read only

The [DeviceHandler](https://github.com/versatica/mediasoup-client/blob/master/lib/handlers) used by the `transport`.

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### transport.close([appData])
{: #transport-close .code}

Closes the `transport` and triggers a [`close`](#transport-on-close) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`appData`  | Any     | Custom app data. | No |

</div>

#### transport.enableStats([interval = 1000])
{: #transport-enableStats .code}

Subscribes the `transport` to RTC stats retrieved via the [`stats`](#transport-on-stats) event.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`interval` | Number | Stats retrieval interval (in milliseconds). | No | 1000

</div>

<div markdown="1" class="note">
Check the [RTC stats](/documentation/v2/rtc-stats/) section for more details.
</div>

#### transport.disableStats()
{: #transport-disableStats .code}

Closes the subscription to RTC stats for this `transport`.

</section>


### Events
{: #Transport-events}

The `Transport` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### transport.on("close", fn(originator, appData))
{: #transport-on-close .code}

Emitted when the `transport` is closed.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description   
--------- | ------- | ----------------
`originator` | String | "local" or "remote".
`appData` | Any     | Custom app data.

</div>

#### transport.on("connectionstatechange", fn(connectionstate))
{: #transport-on-connectionstatechange .code}

Emitted when the underlying ICE connection state changes.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
----------------- | ------- | ----------------
`connectionstate`| [ConnectionState](#Transport-ConnectionState) | The new connection state.

</div>

#### transport.on("stats", fn(stats))
{: #transport-on-stats .code}

Emitted when RTC stats are retrieved.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
---------| ------- | ----------------
`stats`  | sequence&lt;Object&gt; | RTC stats.

</div>

</section>
