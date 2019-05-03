## Logger
{: #Logger}

<section markdown="1">

The Logger is responsible for all the logging in libmediasoupclient.

</section>


### Dictionaries
{: #Logger-dictionaries}

<section markdown="1">

#### LogLevel
{: #LogLevel .code}

There are four log severities:

* **LOG_DEBUG**
* **LOG_WARN**
* **LOG_ERROR**
* **LOG_NONE**


### Functions
{: #Logger-functions}

<section markdown="1">

#### Logger::SetLogLevel(level)
{: #Logger-setLogLevel .code}

Set the indicated log level.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`level`  | [LogLevel](#LogLevel)  | The log level to be used for logging. | Yes |

</div>


#### Logger::SetHandler(handler)
{: #Logger-setHandler .code}

Set the indicated log handler.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`level`  | [LogHandlerInterface\*](#LogHandlerInterface)  | The log handler to be used. | Yes |

</div>

#### Logger::SetDefaultHandler()
{: #Logger::-producerId .code}

Set the default log handler, which prints all log messages to `stdout`.


</section>

## Logger::LogHandlerInterface
{: #LogHandlerInterface}

This is an abstract class which can be implemented and provided to libmediasoupclient via [Logger::SetHandler](#Logger-setHandler)

<section markdown="1">

#### Logger::LogHandlerInterface::OnLog(level, payload, len)
{: #loghandlerinterface-on-log .code}

Executed for every log.

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`level`  | [LogLevel](#LogLevel)  | The level this log message belongs to. | Yes |
`payload`  | char\*  | The log message. | Yes |
`len`  | size_t  | The log message length. | Yes |

</div>

```c++
void LogHandler::OnLog(LogLevel /*level*/, char* payload, size_t /*len*/)
{
	std::cout << payload << std::endl;
}
```

</section>
