## mediasoupclient
{: #mediasoupclient}

### Classes
{: #mediasoupclient-classes}

<section markdown="1">

#### mediasoupclient::Device
{: #mediasoupclient-Device .code}

The `Device` class.

> `@type` [Device](#Device)

```javascript
auto* device = new mediasoupclient::Device();
```

</section>


### Functions
{: #mediasoupclient-functions}

<section markdown="1">

#### mediasoupclient::Version()
{: #mediasoupclient-version .code}

The libmediasoupclient version.

> `@type` std::string

```c++
mediasoupclient::Version();
// "1.0.0"
```

#### mediasoupclient::Initialize()
{: #mediasoupclient-initialize .code}

libmediasoupclient initialization. Initializes libwebrtc.

> `@type` void

```c++
mediasoupclient::Initialize();
```

#### mediasoupclient::Cleanup()
{: #mediasoupclient-cleanup .code}

libmediasoupclient cleanup. Cleans up libwebrtc.

> `@type` void

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
