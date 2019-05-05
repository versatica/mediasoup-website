## Logger
{: #Logger}

<section markdown="1">

The Logger is responsible for all the logging in libmediasoupclient.

</section>


### Enums
{: #Logger-dictionaries}

<section markdown="1">

#### LogLevel
{: #LoggerLogLevel .code}

<div markdown="1" class="table-wrapper L2">

Value          | Description  
-------------- | -------------
"LOG_DEBUG"    | *TODO*
"LOG_WARN"     | *TODO*
"LOG_ERROR"    | *TODO*
"LOG_NONE"     | *TODO*

</div>

</section>


### Functions
{: #Logger-functions}

<section markdown="1">

#### Logger::SetLogLevel(level)
{: #Logger-setLogLevel .code}

Sets log level.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`level`     | [LogLevel](#LoggerLogLevel)| The log level to be used for logging. | Yes |

</div>


#### Logger::SetHandler(handler)
{: #Logger-setHandler .code}

Sets log handler.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description | Required | Default 
-------- | ------- | ----------- | -------- | ----------
`level`  | [LogHandlerInterface\*](#LogHandlerInterface) | The log handler to be used. | Yes |

</div>

#### Logger::SetDefaultHandler()
{: #Logger::-producerId .code}

Sets the default log handler, which prints all log messages to `stdout`.


</section>

## Logger::LogHandlerInterface
{: #LogHandlerInterface}

This is an abstract class which can be implemented and provided to libmediasoupclient via [Logger::SetHandler](#Logger-setHandler)

<section markdown="1">

#### Logger::LogHandlerInterface::OnLog(level, payload, len)
{: #loghandlerinterface-on-log .code}

Executed for every log.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`level`     | [LogLevel](#LoggerLogLevel)  | The level this log message belongs to. | Yes |
`payload`  | char\*   | The log message. | Yes |
`len`      | size_t   | The log message length. | Yes |

</div>

```c++
void LogHandler::OnLog(LogLevel /*level*/, char* payload, size_t /*len*/)
{
	std::cout << payload << std::endl;
}
```

</section>
