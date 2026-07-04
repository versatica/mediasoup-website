## Errors
{: #errors}

<section markdown="1">

The public API of the Node.js layer of mediasoup generates errors which can be native errors (such as `TypeError` or `Error` instances) or custom ones (defined below):

#### UnsupportedError
{: #UnsupportedError .code}

Custom error class indicating that something is not supported.

```javascript
class UnsupportedError extends Error
```

#### WorkerClosedError
{: #WorkerClosedError .code}

Custom error class produced when calling a method on a closed worker.

```javascript
class WorkerClosedError extends Error
```

#### NotFoundError
{: #NotFoundError .code}

Custom error class indicating that a referenced entity doesn't exist.

```javascript
class NotFoundError extends Error
```

For example, when calling `transport.consumer()` it may happen that the associated producer is already closed. In this case, the method will reject with `NotFoundError`:

```javascript
import { NotFoundError } from 'mediasoup/errors';

// [...]

try
{
  const consumer = await transport.consume(
    {
      producerId: 'xxxxx',
      rtpCapabilities: peerRtpCapabilities
    });
}
catch (error)
{
  if (error.instanceof(NotFoundError))
  {
    // Producer is closed, this is a legitimate scenario.
  }
  else
  {
    // Something was wrong.
  }
}
```


</section>
