---
title   : Installation
anchors : true
---


# libmediasoupclient v3 Installation


## Requirements

* POSIX or Windows based operating system
* `cmake` >= 3.5
* `gcc` and `g++` >= 4.9 or `clang` (with C++11 support)


## Get libwebrtc

libmediasoupclient makes use of [libwebrtc](https://webrtc.org/native-code). Follow the [official instructions](https://webrtc.org/native-code/development/) to build it and make sure the branch `m73` is checked-out and compiled.

<div markdown="1" class="note">
Future versions of libmediasoupclient will include a more recent version of libwebrtc. For now, `m73` branch is required.
</div>


## Get libmediasoupclient

Get the libmediasoupclient sources via git and check-out the branch `v3`:

```bash
$ git clone https://github.com/versatica/libmediasoupclient.git
$ cd libmediasoupclient/
$ git checkout v3
```

## Building

Within the `libmediasoupclient/` folder:

```bash
$ cmake . -Bbuild \
-DLIBWEBRTC_INCLUDE_PATH:PATH=$PATH_TO_LIBWEBRTC_SOURCES \
-DLIBWEBRTC_BINARY_PATH:PATH=$PATH_TO_LIBWEBRTC_BINARY

# Compile libmediasoupclient.
$ make -C build/ # or: cd build/ && make

# Optionally install it in the system.
$ make install -C build/
# or:
$ cd build/ && make install
```

Depending on the host, it will generate the following static lib and header files:

```
-- Installing: /usr/local/lib/libmediasoupclient.a
-- Up-to-date: /usr/local/include/mediasoupclient/mediasoupclient.hpp
```


#### Building Flags
{: #Building-Flags .code}

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
LIBWEBRTC_INCLUDE_PATH | Path | libwebrtc include path. | Yes |
LIBWEBRTC_BINARY_PATH | Path | libwebrtc binary path. | Yes |
MEDIASOUPCLIENT_LOG_DEV | Bool | Enables `MSC_LOG_DEV` C++ macro. See [Logger](/documentation/v3/libmediasoupclient/api/#Logger). | No | `false`
MEDIASOUPCLIENT_LOG_TRACE | Bool | Enables `MSC_LOG_TRACE` C++ macro. See [Logger](/documentation/v3/libmediasoupclient/api/#Logger). | No | `false`

</div>


## Linkage Considerations

The application is responsible for defining the symbol visibility of the resulting binary. Symbol visibility mismatch among different libraries will generate plenty of linker warnings such us the one below:

```
ld: warning: direct access in function 'webrtc::I010Buffer::Rotate(webrtc::I010BufferInterface const&, webrtc::VideoRotation)'
from file '/Users/jmillan/src/webrtc-checkout/src/out/m73/obj/libwebrtc.a(i010_buffer.o)'
to global weak symbol 'void rtc::webrtc_checks_impl::LogStreamer<>::Call<>(char const*, int, char const*)::t'
from file '../libmediasoupclient.a(PeerConnection.cpp.o)' means the weak symbol cannot be overridden at runtime.
This was likely caused by different translation units being compiled with different visibility settings.
```

In order to avoid such warnings make sure the corresponding visibility compilation flags are provided. For example, if libwebrtc was built with hidden symbol visibility, libmediasoupclient needs to be provided with the correspoinding compilation flag:

```bash
cmake . -Bbuild \
-DLIBWEBRTC_INCLUDE_PATH:PATH=${PATH_TO_LIBWEBRTC_SOURCES} \
-DLIBWEBRTC_BINARY_PATH:PATH=${PATH_TO_LIBWEBRTC_BINARY}
-DCMAKE_CXX_FLAGS="-fvisibility=hidden"
```

## Usage

Once installed include the library into your C++ application:

```c++
#include "libmediasoupclient/mediasoupclient.hpp"
```

And add the libmediasoupclient static library to your C++ project.

The libmediasoupclient API is exposed under the [mediasoupclient](/documentation/v3/libmediasoupclient/api/#mediasoupclient) C++ namespace. The library also exposes the [nlohmann::json](/documentation/v3/libmediasoupclient/api/#nlohmann-json) C++ namespace.
