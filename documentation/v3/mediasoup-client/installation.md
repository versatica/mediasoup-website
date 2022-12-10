---
title   : Installation
anchors : true
---


# mediasoup-client v3 Installation

Install mediasoup-client within you client application:

```bash
$ npm install mediasoup-client@3
```


## Usage

mediasoup-client is written in TypeScript and transpiled to JavaScript plus CommonJS. This is: it uses `require()` internally.

This makes it work in the browser by properly using [browserify](http://browserify.org), [webpack](https://webpack.js.org) or similar tools, and also in Node.js (which does not yet implement `import`/`export`) . It's up to the application developer to decide how to integrate mediasoup-client into his client side application.

<div markdown="1" class="note">
mediasoup-client does not provide any bundled, minified and/or ES5 transpiled single file. There are tools out there to do that if your application needs it.
</div>

Depending on how your web application loads libraries (for example, by using a JavaScript module loader) your may need to use one of the following ways to load mediasoup-client:

* Using `import`:

```javascript
import * as mediasoupClient from "mediasoup-client";
```

* Using CommonJS with [browserify](http://browserify.org) or [webpack](https://webpack.github.io): 

```javascript
const mediasoupClient = require("mediasoup-client");
```
