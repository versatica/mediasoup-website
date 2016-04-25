## Server
{: #Server}

A `server` runs and manages a set of **mediasoup** worker child processes that handle media realtime-communications (ICE, DTLS, RTP, RTCP, DataChannel, etc).


### Properties
{: #Server-properties}

<section markdown='1'>

#### server.closed
{: #server-closed .code}

A boolean indicating whether the `server` has been closed.

</section>


### Methods
{: #Server-methods}

<section markdown='1'>

#### server.close()
{: #server-close .code}

Closes the `server`, including all its `rooms`, and triggers a [close](#server-on-close) event.


#### server.dump()
{: #server-dump .code}

Returns a Promise that resolves to an Object containing the current status and details of the `server`.

*TBD:* Document it.

#### server.updateSettings([options])
{: #server-updateSettings .code}

Updates the `server` settings in runtime.

`options` is a subset of the [options](#mediasoup-Server-options) Object given to `mediasoup.Server()` which just includes the following entries: `logLevel`.

#### server.Room([options])
{: #server-Room .code}

Creates a [Room](#Room) instance.

`options` is an Object with the following fields:

<div markdown='1' id='server-Room-options' class='table-wrapper'>

Option                   | Type    | Description   | Default
------------------------ | ------- | ------------- | -------------
`forceUniquePayloadTypes`| Boolean | TBD. | `false`

</div>

Usage example:

```javascript
var room = server.Room();
```

</section>


### Events
{: #Server-events}

<section markdown='1'>

#### server.on('close', fn(error))
{: #server-on-close .code}

Emitted when the `server` is closed. In case of error, the callback is called with the corresponding `Error` object.

```javascript
server.on('close', (error) => {
  if (error)
    console.error('server closed with error: %o', error);
});
```

</section>
