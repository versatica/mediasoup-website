---
title   : Installation
anchors : true
---


# libmediasoupclient v3 Installation

libmediasoupclient makes use of [WebRTC Native Code](https://webrtc.org/native-code). Follow the [official instructions](https://webrtc.org/native-code/development/) and make sure branch `remotes/branch-heads/m73` is checked-out and compiled.

```bash
# Download libmediasoupclient sources.
$ git clone https://github.com/versatica/libmediasoupclient.git

$ cd libmediasoupclient/
$ git checkout v3

# Build the project.
$ cmake . -Bbuild \
-DLIBWEBRTC_INCLUDE_PATH:PATH=$PATH_TO_LIBWEBRTC_SOURCES \
-DLIBWEBRTC_BINARY_PATH:PATH=$PATH_TO_LIBWEBRTC_BINARY

# Compile.
$ make -C build/ # or: cd build/ && make

# Optionally install.
$ make install -C build/ # or: cd build/ && make install
```

Depending on the host, it will generate the following static lib and header files:

```
-- Installing: /usr/local/lib/libmediasoupclient.a
-- Up-to-date: /usr/local/include/mediasoupclient/mediasoupclient.hpp
```

## Linkage considerations

The application is responsible for defining the symbol visibility of the resulting binary. Symbol visibility mismatch among different libraries will generate plenty of linker warnings such us the one below:

```
ld: warning: direct access in function 'webrtc::I010Buffer::Rotate(webrtc::I010BufferInterface const&, webrtc::VideoRotation)'
from file '/Users/jmillan/src/webrtc-checkout/src/out/m73/obj/libwebrtc.a(i010_buffer.o)'
to global weak symbol 'void rtc::webrtc_checks_impl::LogStreamer<>::Call<>(char const*, int, char const*)::t'
from file '../libmediasoupclient.a(PeerConnection.cpp.o)' means the weak symbol cannot be overridden at runtime.
This was likely caused by different translation units being compiled with different visibility settings.
```

In order to avoid such warnings make sure the corresponding visibility compilation flags are provided. For example, if `libwebrtc` was built with hidden symbol visibility, `libmediasoupclient` needs to be provided with the correspoinding compilation flag:

```bash
cmake . -Bbuild \
-DLIBWEBRTC_INCLUDE_PATH:PATH=${PATH_TO_LIBWEBRTC_SOURCES} \
-DLIBWEBRTC_BINARY_PATH:PATH=${PATH_TO_LIBWEBRTC_BINARY}
-DCMAKE_CXX_FLAGS="-fvisibility=hidden"
```

## Usage

Once installed:

```c++
#include "libmediasoupclient/mediasoupclient.hpp"
```

The libmediasoupclient API is exposed under the `mediasoupclient` C++ namespace.

libmediasoupclient integrates the [JSON for Modern C++](https://github.com/nlohmann/json/) library.
