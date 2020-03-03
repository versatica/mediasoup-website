---
title   : Installation
anchors : true
---


# libmediasoupclient v3 Installation


## Requirements

* POSIX or Windows based operating system
* `cmake` >= 3.5
* `gcc` and `g++` >= 4.9 or `clang` (with C++11 support)


## Build libwebrtc

libmediasoupclient makes use of [libwebrtc](https://webrtc.org/native-code). Follow the [official instructions](https://webrtc.org/native-code/development/) to build it and make sure the branch `m79` is checked-out and compiled.

<div markdown="1" class="note">
Future versions of libmediasoupclient will include a more recent version of libwebrtc. For now, supported bersions are `m73` and `m74` branch.
</div>


## Build libmediasoupclient

Get the libmediasoupclient sources via git and check-out the branch `v3`:

```bash
$ git clone https://github.com/versatica/libmediasoupclient.git
$ cd libmediasoupclient/
$ git checkout v3
```

Within the `libmediasoupclient/` folder:

```bash
$ cmake . -Bbuild \
  -DLIBWEBRTC_INCLUDE_PATH:PATH=${PATH_TO_LIBWEBRTC_SOURCES} \
  -DLIBWEBRTC_BINARY_PATH:PATH=${PATH_TO_LIBWEBRTC_BINARY}

$ make -C build/
```

Optionally install the library in the system:

```bash
$ make install -C build/
```

Depending on the host, it will generate the following static library and header files:

```
-- Installing: /usr/local/lib/libmediasoupclient.a
-- Up-to-date: /usr/local/include/mediasoupclient/mediasoupclient.hpp
```

#### Building Flags
{: #Building-Flags}

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
LIBWEBRTC_INCLUDE_PATH | Path | Path to libwebrtc sources (the `src` folder). | Yes |
LIBWEBRTC_BINARY_PATH | Path | Path to the libwebrtc static library. | Yes |
MEDIASOUPCLIENT_LOG_DEV | Bool | Enable `MSC_LOG_DEV` C++ macro. See [Logger](/documentation/v3/libmediasoupclient/api/#Logger). | No | `false`
MEDIASOUPCLIENT_LOG_TRACE | Bool | Enable `MSC_LOG_TRACE` C++ macro. See [Logger](/documentation/v3/libmediasoupclient/api/#Logger). | No | `false`
MEDIASOUPCLIENT_BUILD_TESTS | Bool | Run the unit tests. | No | No |
CMAKE_CXX_FLAGS | String | C++ flags (see "Linkage Considerations" section below). | No |

</div>

#### Linkage Considerations (1)

The application is responsible for defining the symbol visibility of the resulting binary. Symbol visibility mismatch among different libraries will generate plenty of linker warnings such us the one below:

```
ld: warning: direct access in function 'webrtc::I010Buffer::Rotate(webrtc::I010BufferInterface const&, webrtc::VideoRotation)'
from file '/home/foo/src/webrtc-checkout/src/out/mybuild-m74/obj/libwebrtc.a(i010_buffer.o)'
to global weak symbol 'void rtc::webrtc_checks_impl::LogStreamer<>::Call<>(char const*, int, char const*)::t'
from file '../libmediasoupclient.a(PeerConnection.cpp.o)' means the weak symbol cannot be overridden at runtime.
This was likely caused by different translation units being compiled with different visibility settings.
```

In order to avoid such warnings make sure the corresponding visibility compilation flags are provided. For example, if libwebrtc was built with hidden symbol visibility, libmediasoupclient needs to be provided with the correspoinding compilation flag:

```bash
cmake . -Bbuild \
  -DLIBWEBRTC_INCLUDE_PATH:PATH=${PATH_TO_LIBWEBRTC_SOURCES} \
  -DLIBWEBRTC_BINARY_PATH:PATH=${PATH_TO_LIBWEBRTC_BINARY} \
  -DCMAKE_CXX_FLAGS="-fvisibility=hidden"
```

#### Linkage Considerations (2)

Linkage errors may happen if libwebrtc and libmediasoupclient are not compiled with the same C++ standard library.

Build libwebrtc with the 'use_custom_libcxx=false' `gn gen` argument to force it use of the system libstdc++.

## Build Example

* Build libwebrtc. Common steps:

```bash
$ cd /home/foo/src
$ mkdir webrtc-checkout
$ cd webrtc-checkout
$ fetch --nohooks webrtc
$ gclient sync
$ cd src
$ git checkout -b m74 refs/remotes/branch-heads/m74
$ gclient sync
```

* In OSX 10.14.16 this works:

```bash
$ gn gen out/mybuild-m74 --args='is_debug=false is_component_build=false is_clang=true rtc_include_tests=false rtc_use_h264=true rtc_enable_protobuf=false use_rtti=true mac_deployment_target="10.11" use_custom_libcxx=false'
```

* In Linux Debian Stretch with GCC 6.3 this works:

```bash
$ gn gen out/mybuild-m74 --args='is_debug=false is_component_build=false is_clang=false rtc_include_tests=false rtc_use_h264=true rtc_enable_protobuf=false use_rtti=true use_custom_libcxx=false treat_warnings_as_errors=false use_ozone=true'
```

* Then build it:

```bash
$ ninja -C out/mybuild-m74
```

* Then build libmediasoupclient:

```bash
$ cd /home/foo/src/libmediasoupclient

$ cmake . -Bbuild \
  -DLIBWEBRTC_INCLUDE_PATH:PATH=/home/foo/src/webrtc-checkout/src \
  -DLIBWEBRTC_BINARY_PATH:PATH=/home/foo/src/webrtc-checkout/src/out/mybuild-m74/obj

$ make -C build/
```

<div markdown="1" class="note">
Please, check the [official instructions](https://webrtc.org/native-code/development/) to build libwebrtc and do **NOT** take this example as a reference.
</div>


## Usage

Once installed include the libmediasoupclient library into your C++ application:

```c++
#include "libmediasoupclient/mediasoupclient.hpp"
```

And add the libmediasoupclient static library to your C++ project.

The libmediasoupclient API is exposed under the [mediasoupclient](/documentation/v3/libmediasoupclient/api/#mediasoupclient) C++ namespace. The library also exposes the [nlohmann::json](/documentation/v3/libmediasoupclient/api/#nlohmann-json) C++ namespace.

<div markdown="1" class="note">
The C++ application should also include the required libwebrtc headers.
</div>

