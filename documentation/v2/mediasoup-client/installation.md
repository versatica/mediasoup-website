---
title   : Installation
anchors : true
---


# Installation

Install mediasoup-client within you client application:

```bash
$ npm install mediasoup-client@2
```


## Usage

Depending on how your web application loads libraries (for example, by using a JavaScript module loader) your may need to use one of the following ways to load mediasoup-client:

* Using `import`:

```javascript
import * as mediasoupClient from "mediasoup-client";
```

* Using CommonJS with [browserify](http://browserify.org) or [webpack](https://webpack.github.io): 

```javascript
const mediasoupClient = require("mediasoup-client");
```
