---
title   : Installation
anchors : true
---


# Installation

**mediasoup-client** can be installed in different ways:

* Via NPM:

```bash
$ npm install mediasoup-client --save
```

* Via Bower:

```bash
$ bower install mediasoup-client
```

* By loading the [ES5 transpiled file](https://raw.githubusercontent.com/versatica/mediasoup-client/master/dist/mediasoup-client.js) into an HTML `<script>` tag:

```html
<script src="/js/mediasoup-client.js"></script>
```


## Usage

Depending on how your web application loads libraries (for example, by using a JavaScript module loader) your may need to use one of the following ways to load **mediasoup-client**:

* Using ES6 `import`:

```javascript
import * as mediasoupClient from 'mediasoup-client';
```

* Using [browserify](http://browserify.org) or [webpack](https://webpack.github.io): 

```javascript
const mediasoupClient = require("mediasoup-client");
```

* Using an HTML `<script>` tag:

```javascript
window.mediasoupClient
```
