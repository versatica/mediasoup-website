---
title   : Installation
anchors : true
---


# mediasoup v3 Installation

In Node.js, install mediasoup via NPM within your Node.js application:

```bash
$ npm install mediasoup@3
```

In Rust, install it within your Rust application:

```bash
cargo add mediasoup
```


## Requirements

In order to build the mediasoup C/C++ components the following packages and libraries must be available in the target host:

### All Platforms

* Node.js version >= v16.0.0
* Python version >= 3.7 with PIP
* GNU `make`

<div markdown="1" class="note warn">
The installation path MUST NOT contain whitespaces.
</div>


### Linux, OSX and Any *NIX System

* `gcc` and `g++` >= 8 or `clang` (with C++17 support)
* `cc` and `c++` commands (symlinks) pointing to the corresponding `gcc`/`g++` or `clang`/`clang++` executables

<div markdown="1" class="note">
* On Debian and Ubuntu install the `python3-pip` DEB package, otherwise PIP package manager might be unavailable.
* On Debian and Ubuntu install the `build-essential` DEB package. It includes both `make` and `gcc`/`g++`.
* On YUM based Linux (Red Hat, CentOS) use `yum groupinstall "Development Tools"`.
* On OSX M1 ensure that you have a M1 version of Node.js.
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

* Microsoft Visual Studio environment with MSVC compiler (with C++17 support).

<div markdown="1" class="note">
* GNU `make` can be installed with MSYS from [MinGW](https://sourceforge.net/projects/mingw/) and make sure to append the path of folder containing `make` to the Windows `Path` environment variable (e.g. `C:\MinGW\msys\1.0\bin`).
* Make sure to have **ISRG Root X1** certificate installed, or you will get errors while downloading OpenSSL (whose website is secured with Let's Encrypt), you can import it from <https://letsencrypt.org/certs/isrgrootx1.der> (install to Local computer).
* If you have Python-related errors, search for "App execution aliases" in system settings and disable everything Python-related from there.
</div>
