## WebRtcServer
{: #WebRtcServer}

<section markdown="1">

A WebRTC server brings the ability to listen on a single UDP/TCP port to [WebRtcTransports](#WebRtcTransport). Instead of passing `listenInfos` to [router.createWebRtcTransport()](#router-createWebRtcTransport) pass `webRtcServer` with an instance of a `WebRtcServer` so the new WebRTC transport will not listen on its own IP:port(s) but will have its network traffic handled by the WebRTC server instead.

<div markdown="1" class="note">
* A WebRTC server exists within the context of a [Worker](#Worker), meaning that if your app launches N workers it also needs to create N WebRTC servers listening on different ports (to not collide).
* The WebRTC transport implementation of mediasoup is [ICE Lite](https://tools.ietf.org/html/rfc5245#section-2.7), meaning that it does not initiate ICE connections but expects ICE Binding Requests from endpoints.
</div>

</section>

#### WebRtcServerOptions
{: #WebRtcServerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field        | Type    | Description   | Required | Default
------------ | ------- | ------------- | -------- | ---------
`listenInfos` | Array&lt;[TransportListenInfo](#TransportListenInfo)\|String&gt; | Listening information in order of preference (first one is the preferred one). | No |
`appData`    | [AppData](#AppData) | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
* The IP in each entry in `listenInfos` must be a bindable IP in the host.
* If you use "0.0.0.0" or "::" in an entry in `listenInfos`, then you need to also provide `announcedAddress` in the corresponding entry in `listenInfos`.
</div>

</section>


### Properties
{: #WebRtcServer-properties}

<section markdown="1">


#### webRtcServer.id
{: #webRtcServer-id .code}

WebRTC server identifier.

> `@type` String, read only

#### webRtcServer.closed
{: #webRtcServer-closed .code}

Whether the WebRTC server is closed.

> `@type` Boolean, read only

#### webRtcServer.appData
{: #webRtcServer-appData .code}

Custom data provided by the application in the worker factory method. The app can modify it at any time.

> `@type` [AppData](#AppData)

#### webRtcServer.observer
{: #webRtcServer-observer .code}

See the [Observer Events](#WebRtcServer-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>



### Methods
{: #WebRtcServer-methods}

<section markdown="1">

#### webRtcServer.close()
{: #webRtcServer-close .code}

Closes the WebRTC server. Triggers a ["listenserverclose"](#transport-on-listenserverclose) event in all WebRTC transports using this WebRTC server.

</section>


### Events
{: #WebRtcServer-events}

<section markdown="1">

#### webRtcServer.on("workerclose", fn())
{: #webRtcServer-on-workerclose .code}

Emitted when the worker this WebRTC server belongs to is closed for whatever reason. The WebRTC server itself is also closed. A ["listenserverclose"](#transport-on-listenserverclose) event is triggered in all WebRTC transports using this WebRTC server.

```javascript
webRtcServer.on("workerclose", () =>
{
  console.log("worker closed so webRtcServer closed");
});
```

</section>


### Observer Events
{: #WebRtcServer-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### webRtcServer.observer.on("close", fn())
{: #webRtcServer-observer-on-close .code}

Emitted when the WebRTC server is closed for whatever reason.

#### webRtcServer.observer.on("webrtctransporthandled", fn(webRtcTransport))
{: #webRtcServer-observer-on-webrtctransporthandled .code}

Emitted when a new WebRTC transport that uses this WebRTC server is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`webRtcTransport` | [WebRtcTransport](#WebRtcTransport) | Handled WebRTC transport.

</div>

#### webRtcServer.observer.on("webrtctransportunhandled", fn(webRtcTransport))
{: #webRtcServer-observer-on-webrtctransportunhandled .code}

Emitted when a new WebRTC transport that uses this WebRTC server is closed. It's also emitted for all WebRTC transports handled by this WebRTC server when the latter is closed.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`webRtcTransport` | [WebRtcTransport](#WebRtcTransport) | Unhandled WebRTC transport.

</div>

</section>
