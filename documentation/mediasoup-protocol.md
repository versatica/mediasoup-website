---
title   : mediasoup protocol
---


# mediasoup protocol

Although **mediasoup** does not implement a signaling protocol, both the client (**mediasoup-client**) and the server (**mediasoup**) must exchange messages. Those messages can be a request/response pair or a notification, and can be sent in both directions.

The exact definition of the message payloads that must be exchanged is documented in the [MEDIASOUP_PROTOCOL.md](https://github.com/versatica/mediasoup-client/blob/master/MEDIASOUP_PROTOCOL.md) file included in the **mediasoup-client** source code.

<div markdown="1" class="note">
The application developer does not need to know about these messages, but can intercept them for advanced usages.
</div>
