## mediasoupClient
{: #mediasoupClient}

The top-level module exported by the **mediasoup-client** library.

```javascript
import mediasoupClient from "mediasoup-client";
```

or

```javascript
const mediasoupClient = require("mediasoup-client");
```


### Dictionaries
{: #mediasoupClient-dictionaries}

<section markdown="1">

#### DeviceInfo
{: #mediasoupClient-DeviceInfo .code}

<div markdown="1" class="table-wrapper L3">

Field       | Type    | Description
----------- | ------- | -------------
`flag`      | String  | Browser/device identifier.
`name`      | String  | Browser/device descriptive name (taken from `User-Agent`.
`version`   | String  | Browser/device version.
`bowser`    | Object  | Object produced by the `_detect()` method of the [bowser](https://www.npmjs.com/package/bowser) library.

</div>

<div markdown="1" class="note">
Current `flag` values can be:

* "chrome"
* "firefox"
* "safari"
* "msedge"
* "opera"
</div>

</section>


### Functions
{: #mediasoupClient-functions}

<section markdown="1">

#### mediasoupClient.isDeviceSupported()
{: #mediasoupClient-isDeviceSupported .code}

Returns a Boolean indicating if the current browser/device is supported by **mediasoup-client**.

#### mediasoupClient.getDeviceInfo()
{: #mediasoupClient-getDeviceInfo .code}

Returns a [DeviceInfo](#mediasoupClient-DeviceInfo) Object with the browser/device information.

#### mediasoupClient.checkCapabilitiesForRoom(roomRtpCapabilities)
{: #mediasoupClient-checkCapabilitiesForRoom .code}

Checks the audio/video capabilities of the current device/browser for the remote `room` given its RTP capabilities.

It returns a Promise that resolves to an Object with `audio` and `video` Booleans, indicating whether sending and receiving audio/video is possible once joined in that `room`.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`roomRtpCapabilities`  | [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*) | Room RTP capabilities. | Yes |

</div>

<div markdown="1" class="note">
This method is useful in the scenario in which the application wishes to request the user with mic/webcam permissions before joining the room. By running this method before, the application could avoid requesting webcam permission to the user if his browser does not support the video codec of the room.
</div>

</section>


### Classes
{: #mediasoupClient-classes}

<section markdown="1">

#### mediasoupClient.Room
{: #mediasoupClient-Room .code}

Exposes the [Room](#Room) class.

</section>
