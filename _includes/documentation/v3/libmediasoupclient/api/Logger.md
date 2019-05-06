## Logger
{: #Logger}

<section markdown="1">

C++ namespace (within the `mediasoupclient` namespace) responsible for logging.

</section>


### Enums
{: #Logger-dictionaries}

<section markdown="1">

#### LogLevel
{: #LoggerLogLevel .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"LOG_DEBUG"    | Logs debug level and above.
"LOG_WARN"     | Logs warning level and above.
"LOG_ERROR"    | Logs error level.
"LOG_NONE"     | Logs nothing.

</div>

</section>

<section markdown="1">

LOG_DEBUG only applies if libmediasoupclient building flag [MEDIASOUP_CLIENT_LOG_DEV](/documentation/v3/libmediasoupclient/installation/#Building-Flags) is provided.

Log trace only applies if libmediasoupclient building flag [MEDIASOUP_CLIENT_LOG_TRACE](/documentation/v3/libmediasoupclient/installation/#Building-Flags) is provided and LogLevel is LOG_DEBUG.

</section>


### Classes
{: #Logger-classes}

<section markdown="1">

#### Logger::LogHandlerInterface
{: #Logger-LogHandlerInterface .code}

See [LogHandlerInterface](#LoggerLogHandlerInterface).

</section>


### Functions
{: #Logger-functions}

<section markdown="1">

#### Logger::SetLogLevel(level)
{: #Logger-SetLogLevel .code}

Sets log level.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`level`     | [LogLevel](#LoggerLogLevel)| The log level to be used for logging. | Yes |

</div>


#### Logger::SetHandler(handler)
{: #Logger-SetHandler .code}

Sets log handler.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description | Required | Default 
-------- | ------- | ----------- | -------- | ----------
`level`  | [LogHandlerInterface\*](#LoggerLogHandlerInterface) | The log handler to be used. | Yes |

</div>

#### Logger::SetDefaultHandler()
{: #Logger-SetDefaultHandler .code}

Sets the default log handler, which prints all log messages to `stdout`.

</section>
