---
title   : Installation
anchors : true
---


# libmediasoupclient v3 Installation

libmediasoupclient makes use of [WebRTC Native Code](https://webrtc.org/native-code). libwebrtc must be downloaded and compiled in the system. Follow the [official instructions](https://webrtc.org/native-code/development/) and make sure branch `remotes/branch-heads/m73` is checked-out and compiled.

Download the sources and compile the library:

```bash
$ git clone https://github.com/versatica/libmediasoupclient.git

$ cd libmediasoupclient/
$ git checkout v3

$ cmake . -Bbuild \
-DLIBWEBRTC_INCLUDE_PATH:PATH=$PATH_TO_LIBWEBRTC_SOURCES \
-DLIBWEBRTC_BINARY_PATH:PATH=$PATH_TO_LIBWEBRTC_BINARY

# Compile.
$ make -C build/ # or: cd build/ && make

# Optionally install.
$ make install -C build/ # or: cd build/ && make install
```


## Usage

Once installed:

```c++
#include "libmediasoupclient/mediasoupclient.hpp"
```

The libmediasoupclient API is exposed under the `mediasoupclient` C++ namespace.

libmediasoupclient integrates the [JSON for Modern C++](https://github.com/nlohmann/json/) library.
