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

### All platforms

* `node` version >= v12.0.0
* `python` version >= 3.6 with PIP

### Linux, OSX and any *NIX system

* GNU `make`
* `gcc` and `g++` >= 4.9 or `clang` (with C++11 support)
* `cc` and `c++` commands (symlinks) pointing to the corresponding `gcc`/`g++` or `clang`/`clang++` executables.

<div markdown="1" class="note">
* In Debian and Ubuntu install the `python3-pip` DEB package, otherwise PIP package manager might be unavailable.
* In Debian and Ubuntu install the `build-essential` DEB package. It includes both `make` and `gcc`/`g++`.
* In YUM based Linux (Red Hat, CentOS) use `yum groupinstall "Development Tools"`.
</div>

<div markdown="1" class="note">
If there is neither `python3` nor `python` command pointing to Python 3 executable, set the `PYTHON` environment variable during mediasoup installation:

```bash
$ PYTHON=python3.9 npm install mediasoup@3 --save
```
</div>

<div markdown="1" class="note">
If the `MEDIASOUP_MAX_CORES` environment variable is set, the build process will use that number of CPU cores. Otherwise, it will auto-detect the number of cores in the machine.
</div>


### Windows

* GNU `make` (from MSYS project, can be installed with [MinGW](https://sourceforge.net/projects/mingw/))
* Microsoft C++ (MSVC) compiler (with C++11 support)

<div markdown="1" class="note">
* Append the path of folder containing MSVC `cl` compiler executable to the Windows `PATH` environment variable (e.g. "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Tools\MSVC\14.29.30133\bin\Hostx64\x64").
</div>


## Usage

Within your Node.js application:

```javascript
const mediasoup = require("mediasoup");
```
