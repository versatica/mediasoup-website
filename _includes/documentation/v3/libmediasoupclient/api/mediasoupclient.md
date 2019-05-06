## mediasoupclient
{: #mediasoupclient}

<section markdown="1">

The main C++ namespace exposed by the libmediasoupclient library.

```c++
#include "libmediasoupclient/mediasoupclient.hpp"
```

</section>


### Classes
{: #mediasoupclient-classes}

<section markdown="1">

#### mediasoupclient::Device
{: #mediasoupclient-Device .code}

The `Device` class.

> `@returns` [Device](#Device)

```javascript
auto* device = new mediasoupclient::Device();
```

</section>


### Functions
{: #mediasoupclient-functions}

<section markdown="1">

#### mediasoupclient::Version()
{: #mediasoupclient-Version .code}

The libmediasoupclient version.

> `@returns` std::string

```c++
mediasoupclient::Version();
// "1.0.0"
```

#### mediasoupclient::Initialize()
{: #mediasoupclient-Initialize .code}

libmediasoupclient initialization. Initializes libwebrtc.

```c++
mediasoupclient::Initialize();
```

#### mediasoupclient::Cleanup()
{: #mediasoupclient-Cleanup .code}

libmediasoupclient cleanup. Cleans up libwebrtc.

```c++
mediasoupclient::Cleanup();
```

#### mediasoupclient::parseScalabilityMode(scalabilityMode)
{: #mediasoupclient-parseScalabilityMode .code}

Parses the given `scalabilityMode` string according to the rules in [webrtc-svc](https://w3c.github.io/webrtc-svc/).

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`scalabilityMode` | const std::string& | Scalability mode. | Yes |

</div>

> `@returns` nlohmann::json:
> 
> * `spatialLayers` {`@type` uint16_t} Number of spatial layers (by default 1).
>
> * `temporalLayers` {`@type` uint16_t} Number of temporal layers (by default 1).

```javascript
mediasoup::parseScalabilityMode("L2T3");
// => { spatialLayers: 2, temporalLayers: 3 }

mediasoup::parseScalabilityMode("L4T7_KEY_SHIFT");
// => { spatialLayers: 4, temporalLayers: 7 }
```

</section>
