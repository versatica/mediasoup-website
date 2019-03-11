## libmediasoupclient::Device
{: #libmediasoupclient::Device}

A `device` is used to create [SendTransport](#libmediasoupclient::SendTransport) and [RecvTansport](#libmediasoupclient::RecvTransport) instances.

```c++
auto device = new libmediasoupclient::Device();
```


### Methods
{: #libmediasoupclient::Device-methods}

<section markdown="1">

#### device.Load(routerRtpCapabilities)
{: #device-load .code}

Initilalizes the `device` with the given server-side router RTP capabilities.

<div markdown="1" class="table-wrapper L3">

Argument                | Type            | Description              | Required | Default
----------              | -------         | -----------              | -------- | ----------
`routerRtpCapabilities` | const nlohmann::json&  | Router RTP capabilities. | Yes      |

</div>

#### device.IsLoaded()
{: #device-isLoaded .code}

Returns `true` if the `device` is loaded or `false` otherwise.

#### device.CanProduce(kind)
{: #device-canProduce .code}

Returns `true` if the `device` is loaded or `false` otherwise.

<div markdown="1" class="table-wrapper L3">

Argument   | Type        | Description               | Required | Default
---------- | -------     | -----------               | -------- | ----------
`kind`     | const std::string& | Media kind (audio\|video). | Yes      |

</div>

#### device.GetHandlerName()
{: #device-getHandlerName .code}

Returns the handler name.

#### device.GetRtpCapabilities()
{: #device-getRtpCapabilities .code}

Returns the [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*) of the Device for receiving media.

#### device.CreateSendTransport(listener, transportRemoteParameters, [peerConnectionOptions], [appdata])
{: #device-createSendTransport .code}

Returns a [SendTransport](#SendTransport) instance.

<div markdown="1" class="table-wrapper L3">

Argument                    | Type  | Description | Required | Default
--------------------------- | ----- | ------------| -------- | ----------
`listener`                  | [SendTransportListener](#SendTransportListener)\* | Transport listener. | Yes |
`transportRemoteParameters` | const nlohmann::json& | Transport remote parameters | Yes |
`peerConnectionOptions`     | [PeerConnectionOptions](#PeerConnectionOptions)\* | PeerConnection options | No |
`appData`                   | nlohmann::json | Application data | No |

</div>


</section>
