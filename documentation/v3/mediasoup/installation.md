---
title   : Installation
anchors : true
---


# mediasoup v3 Installation

Install the mediasoup Node.js module via NPM within your Node.js application:

```bash
$ npm install mediasoup@3 --save
```


## Requirements

In order to build the mediasoup C/C++ components the following packages and libraries must be available in the target host:

### Linux, OSX and any *NIX system

* `node` version >= v8.6.0
* `python` version 2 or 3
* `make`
* `gcc` and `g++` >= 4.9 or `clang` (with C++11 support)

<div markdown="1" class="note">
* In Debian and Ubuntu install the `build-essential` DEB package. It includes both `make` and `gcc`/`g++`.
* In YUM based Linux (Red Hat, CentOS) use `yum groupinstall "Development Tools"`.
</div>

<div markdown="1" class="note">
If there is not `python` command pointing to Python 2 or 3 executable, set the `PYTHON` environment variable during mediasoup installation:

```bash
$ PYTHON=python3 npm install mediasoup@3 --save
```
</div>

### Windows

* `node` version >= v8.6.0
* `python` version 2 or 3
* Visual Studio >= 2015

<div markdown="1" class="note">
* Append the path of `MSBuild.exe` folder to the Windows `PATH` environment variable (e.g. "C:\Program Files (x86)\MSBuild\14.0\Bin").
* Create a new Windows environment variable `GYP_MSVS_VERSION` with the version of Visual Studio as value (e.g. "2017" for Visual Studio 2017).
</div>


## Usage

Within your Node.js application:

```javascript
const mediasoup = require("mediasoup");
```
