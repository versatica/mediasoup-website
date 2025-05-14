## Device
{: #Device}

<section markdown="1">

A device represents an endpoint that connects to a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) to send and/or receive media.

<div markdown="1" class="note">
* This is the entry point for JavaScript client side applications (such as web applications).
* If you are developing a React Native app, take a look to the [React Native](/documentation/v3/mediasoup-client/react-native/) section.
</div>

</section>


### Dictionaries
{: #Device-dictionaries}

<section markdown="1">

#### DeviceOptions
{: #DeviceOptions .code}

<div markdown="1" class="table-wrapper L3">

Field            | Type     | Description   | Required | Default
---------------- | -------- | ------------- | -------- | ---------
`handlerName`    | [BuiltinHandlerName](#BuiltinHandlerName) | The name of one of the builtin handlers. | No |
`handlerFactory` | Function | A function that returns an instance of a handler. Check the [HandlerInterface](https://github.com/versatica/mediasoup-client/tree/v3/src/handlers/HandlerInterface.ts) parent class from which any valid handler must inherit. | No |

</div>

<div markdown="1" class="note">
* Web applications do not need to provide any `handlerName` or `handlerFactory` arguments into the `Device` constructor. mediasoup-client detects the underlying browser and chooses a suitable WebRTC handler depending on the browser vendor and version.

* If the web application wishes to force a specific built-in handler (for example, force `Chrome67` built-in handler in Chrome >= 70 instead of having `Chrome70` auto-detected) the application can do it as follows:

```javascript
const device = new mediasoupClient.Device({ handlerName: "Chrome67" });
```
</div>

#### DeviceSctpCapabilities
{: #DeviceSctpCapabilities .code}

<div markdown="1" class="table-wrapper L3">

Field            | Type   | Description
---------------- | ------ | -------------
`numStreams`     | [NumSctpStreams](/documentation/v3/mediasoup/sctp-parameters/#NumSctpStreams) | Initially requested and supported SCTP streams.

</div>

</section>


### Enums
{: #Device-enums}

<section markdown="1">

#### BuiltinHandlerName
{: #BuiltinHandlerName .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"Chrome74"     | Chrome/Chromium >= 74.
"Chrome70"     | Chrome/Chromium >= 70.
"Chrome67"     | Chrome/Chromium >= 67.
"Chrome55"     | Chrome/Chromium >= 55.
"Firefox120"   | Firefox >= 120.
"Firefox60"    | Firefox >= 60.
"Safari12"     | Safari >= 12.
"Safari11"     | Safari >= 11.
"Edge11"       | Edge >= 11 && <= 18 (higher versions use Chromium).
"ReactNativeUnifiedPlan" | React-Native environment with `react-native-webrtc` >= 106.0.0 with Unified-Plan support.
"ReactNative"  | React-Native environment with `react-native-webrtc` previous versions with Plan-B support.

</div>

</section>

### Class functions
{: #Device-class-functions}

<section markdown="1">

#### Device.factory(options)
{: #device-factory .code}

Creates a new device. It's recommended to use `Device.factory()` instead of the `Device` constructor because the browser/device detection handler in `Device.factory()` uses [detectDeviceAsync()](#mediasoupClient-detectDeviceAsync) instead of [detectDevice()](#mediasoupClient-detectDevice).

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description | Required | Default 
--------- | ------- | ----------- | -------- | ----------
`options` | [DeviceOptions](#DeviceOptions) | Device options. | No |

</div>

> `@async`
> 
> `@returns` [Device](#Device)

> `@throws` UnsupportedError, if the current browser/device is not supported.

```javascript
let device;

try
{
  device = await Device.factory();
}
catch (error)
{
  if (error.name === 'UnsupportedError')
    console.warn('browser not supported');
}
```

</section>


### Constructor
{: #Device-constructor}

<section markdown="1">

#### new Device(options)
{: #device-new-Device .code}

Creates a new device.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description | Required | Default 
--------- | ------- | ----------- | -------- | ----------
`options` | [DeviceOptions](#DeviceOptions) | Device options. | No |

</div>

> `@deprecated`

> `@throws` UnsupportedError, if the current browser/device is not supported.

```javascript
let device;

try
{
  device = new mediasoupClient.Device();
}
catch (error)
{
  if (error.name === 'UnsupportedError')
    console.warn('browser not supported');
}
```

<div markdown="1" class="note warn">
Using the `Device` constructor directly is deprecated. Use [Device.factory()](#device-factory) instead.
</div>

</section>


### Properties
{: #Device-properties}

<section markdown="1">

#### device.handlerName
{: #device-handlerName .code}

The selected handler class name.

> `@returns` String, read only

```javascript
console.log(device.handlerName);
// => "Chrome74"
```

#### device.loaded
{: #device-loaded .code}

Whether the device has been loaded (see the [load()](#device-load) method).

> `@returns` Boolean

#### device.rtpCapabilities
{: #device-rtpCapabilities .code}

The device RTP capabilities, generated by combining both the underlying WebRTC capabilities and the router RTP capabilities (see the [load()](#device-load) method).

> `@returns` [RtpCapabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCapabilities), read only
> 
> `@throws` InvalidStateError, if device not loaded

<div markdown="1" class="note">
These RTP capabilities must be given to the mediasoup router in order to consume a remote stream. Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### device.sctpCapabilities
{: #device-sctpCapabilities .code}

The device SCTP capabilities.

> `@returns` [DeviceSctpCapabilities](#DeviceSctpCapabilities), read only
> 
> `@throws` InvalidStateError, if device not loaded

#### device.observer
{: #device-observer .code}

See the [Observer Events](#Device-observer-events) section below.

> `@type` [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), read only

</section>


### Methods
{: #Device-methods}

<section markdown="1">

#### device.load({ routerRtpCapabilities, preferLocalCodecsOrder })
{: #device-load .code}

Loads the device with the RTP capabilities of the mediasoup router. This is how the device knows about the allowed media codecs and other settings.

<div markdown="1" class="table-wrapper L3">

Argument      | Type    | Description | Required | Default 
------------- | ------- | ----------- | -------- | ----------
`routerRtpCapabilities` | [RtpCapabilities](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCapabilities) | The mediasoup router RTP capabilities. | Yes |
`preferLocalCodecsOrder` | Boolean | Whether to prefer device's local order of codecs rather than the order of codecs provided to mediasoup server. | No |

</div>

> `@async`
> 
> `@throws` InvalidStateError, if device already loaded
> 
> `@throws` TypeError, if invalid arguments

<div markdown="1" class="note">
* The router RTP capabilities are exposed via the [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) getter. Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.

* See also how to [filter those server-side capabilities](/documentation/v3/tricks/#rtp-capabilities-filtering) before applying them to the mediasoup-client device.
</div>

```javascript
await device.load({ routerRtpCapabilities });
// Now the device is ready.
```

#### device.canProduce(kind)
{: #device-canProduce .code}

Whether the device can produce media of the given kind. This depends on the media codecs enabled in the mediasoup router and the media capabilities of the browser/device.

<div markdown="1" class="table-wrapper L3">

Argument  | Type    | Description | Required | Default 
--------- | ------- | ----------- | -------- | ----------
`kind`    | String  | [MediaKind](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#MediaKind) | Yes |

</div>

> `@returns` Boolean
> 
> `@throws` InvalidStateError, if device not loaded
> 
> `@throws` TypeError, if invalid kind

```javascript
if (device.canProduce("video"))
{
  // Do getUserMedia() and produce video.
}
```

#### device.createSendTransport(options)
{: #device-createSendTransport .code}

Creates a new WebRTC transport to **send** media. The transport must be previously created in the mediasoup router via [router.createWebRtcTransport()](/documentation/v3/mediasoup/api/#router-createWebRtcTransport).

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [TransportOptions](#TransportOptions) | WebRTC transport options. | Yes |

</div>

> `@returns` [Transport](#Transport)
> 
> `@throws` InvalidStateError, if device not loaded
> 
> `@throws` TypeError, if invalid arguments

<div markdown="1" class="note">
mediasoup server side WebRTC transports have DTLS role "auto" by default. mediasoup-client selects "client" DTLS role by default for both sending and receiving transports. However local DTLS role can be forced by overriding remote `dtlsParameters.role` value with "client" to force the local DTLS role "server".
</div>

```javascript
const transport = device.createSendTransport(
  {
    id             : "0b38d662-ea00-4c70-9ae3-b675d6a89e09",
    iceParameters  : { ... },
    iceCandidates  : [ ... ],
    dtlsParameters : { ... },
    sctpParameters : { ... }
  });
```

#### device.createRecvTransport(options)
{: #device-createRecvTransport .code}

Creates a new WebRTC transport to **receive** media. The transport must be previously created in the mediasoup router via [router.createWebRtcTransport()](/documentation/v3/mediasoup/api/#router-createWebRtcTransport).

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [TransportOptions](#TransportOptions) | WebRTC transport options. | Yes |

</div>

> `@returns` [Transport](#Transport)
> 
> `@throws` InvalidStateError, if device not loaded
> 
> `@throws` TypeError, if invalid arguments

<div markdown="1" class="note">
mediasoup server side WebRTC transports have DTLS role "auto" by default. mediasoup-client selects "client" DTLS role by default for both sending and receiving transports. However local DTLS role can be forced by overriding remote `dtlsParameters.role` value with "client" to force the local DTLS role "server".
</div>

```javascript
const transport = device.createRecvTransport(
  {
    id             : "152f60cd-10ac-443b-8529-6474ecba2e44",
    iceParameters  : { ... },
    iceCandidates  : [ ... ],
    dtlsParameters : { ... },
    sctpParameters : { ... }
  });
```

</section>


### Observer Events
{: #Device-observer-events}

<section markdown="1">

<div markdown="1" class="note">
See the [Observer API](#observer-api) section below.
</div>

#### device.observer.on("newtransport", fn(transport))
{: #router-observer-on-newtransport .code}

Emitted when a new transport is created.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description   
----------- | ------- | ----------------
`transport` | [Transport](#Transport) | New transport.

</div>

```javascript
device.observer.on("newtransport", (transport) =>
{
  console.log("new transport created [id:%s]", transport.id);
});
```

</section>
