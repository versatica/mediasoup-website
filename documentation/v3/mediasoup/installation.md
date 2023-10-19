---
title   : Installation
anchors : true
---


# mediasoup v3 Installation

Install mediasoup via NPM within your Node.js application:

```bash
$ npm install mediasoup@3
```

During the installation process, the mediasoup NPM package will try to fetch a prebuilt mediasoup-worker binary appropriate for current platform and architecture. If not found, it will locally build the mediasoup-worker binary.

<div markdown="1" class="note">
* If "MEDIASOUP_SKIP_WORKER_PREBUILT_DOWNLOAD" or "MEDIASOUP_LOCAL_DEV" environment variables are set, or if mediasoup package is being installed via `git+ssh` (instead of via `npm`), and if "MEDIASOUP_FORCE_WORKER_PREBUILT_DOWNLOAD" environment variable is not set, the installation process won't attempt to fetch any prebuilt mediasoup-worker binary and it will build it locally instead.

```bash
MEDIASOUP_SKIP_WORKER_PREBUILT_DOWNLOAD="true" npm install mediasoup@3
```

* If "MEDIASOUP_WORKER_BIN" environment variable is set during mediasoup package installation, mediasoup will use the the value of such an environment variable as mediasoup-worker binary and **won't** compile it locally. And if same environment variable is set when running your Node.js app, mediasoup will use it as mediasoup-worker binary (instead of looking for it in the `mediasoup/worker/out/Release` path).

```bash
MEDIASOUP_WORKER_BIN="/home/xxx/src/foo/mediasoup-worker" npm install mediasoup@3
MEDIASOUP_WORKER_BIN="/home/xxx/src/foo/mediasoup-worker" node myapp.js
```
</div>


## Requirements

In order to build the mediasoup C/C++ components the following packages and libraries must be available in the target host:

### All Platforms

* Node.js version >= v16.0.0
* Python version >= 3.7 with PIP

<div markdown="1" class="note">
Python and `make` are just needed in case no prebuilt mediasoup-worker binary was downloaded during the installation process.
</div>

<div markdown="1" class="note warn">
The installation path MUST NOT contain whitespaces.
</div>


### Linux, OSX and *NIX Systems

* `gcc` and `g++` >= 8 or `clang` (with C++17 support)
* `cc` and `c++` commands (symlinks) pointing to the corresponding `gcc`/`g++` or `clang`/`clang++` executables
* GNU `make`

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
* Make sure to have **ISRG Root X1** certificate installed, or you will get errors while downloading OpenSSL (whose website is secured with Let's Encrypt), you can import it from <https://letsencrypt.org/certs/isrgrootx1.der> (install to Local computer).
* If you have Python-related errors, search for "App execution aliases" in system settings and disable everything Python-related from there.
</div>
