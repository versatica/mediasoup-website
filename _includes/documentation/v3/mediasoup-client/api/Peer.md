## Peer
{: #Peer}

A `peer` is the local representation of a remote `peer`.

For more information, check the [Glossary](/documentation/v2/glossary/#Glossary-Peer) section.


### Properties
{: #Peer-properties}

<section markdown="1">

#### peer.name
{: #peer-name .code}

* Read only

The `name` (String) of the remote `peer`.

#### peer.closed
{: #peer-closed .code}

* Read only

A Boolean indicating whether the `peer` has been closed.

#### peer.appData
{: #peer-appData .code}

* Read-write

Custom data set by the remote application.

#### peer.consumers
{: #peer-consumers .code}

* Read only

An Array with the list of [Consumer](#Consumer) instances associated to the remote `peer` in the order in which they were created.

</section>


### Methods
{: #Peer-methods}

<section markdown="1">

#### peer.getConsumerById(id)
{: #peer-getConsumerById .code}

Retrieves the [Consumer](#Consumer) with the given `id`, or `undefined` if not found.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`id`       | Number | Consumer id. | Yes |

</div>

</section>


### Events
{: #Peer-events}

The `Peer` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### peer.on("close", fn())
{: #peer-on-close .code}

Emitted when the remote `peer` is closed or leaves the `room`.

#### peer.on("newconsumer", fn(consumer))
{: #peer-on-notify .code}

Emitted when a new `consumer` is created for receiving new media produced by the remote `peer`.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`consumer` | [Consumer](#Consumer) | New `consumer`.

</div>

</section>
