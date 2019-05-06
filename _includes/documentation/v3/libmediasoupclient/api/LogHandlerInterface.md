## LogHandlerInterface
{: #LogHandlerInterface}

<section markdown="1">

> `@abstract`

This is an abstract class which can be implemented and provided to libmediasoupclient via [Logger::SetHandler()](#Logger-SetHandler).

</section>


### Events
{: #LogHandlerInterface-events}

<section markdown="1">

#### LogHandlerInterface::OnLog(level, payload, len)
{: #LogHandlerInterface-OnLog .code}

Executed for every log.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`level`     | [LogLevel](#LoggerLogLevel) | The level this log message belongs to. | Yes |
`payload`  | char\*   | The log message. | Yes |
`len`      | size_t   | The log message length. | Yes |

</div>

```c++
void MyLogHandler::OnLog(LogLevel level, char* payload, size_t len)
{
	std::cout << payload << std::endl;
}
```

</section>
