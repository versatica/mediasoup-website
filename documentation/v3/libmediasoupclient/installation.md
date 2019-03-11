---
title   : Installation
anchors : true
---


# Installation

```bash
# Download the repository.
git clone https://github.com/jmillan/libmediasoupclient.git
cd libmediasoupclient/

# Build.
cmake . -Bbuild \
-DLIBWEBRTC_INCLUDE_PATH:PATH=${PATH_TO_LIBWEBRTC_SOURCES} \
-DLIBWEBRTC_BINARY_PATH:PATH=${PATH_TO_LIBWEBRTC_BINARY}

# Compile.
make -C build/ # or: cd build/ && make

# Optionally install.
make install -C build/ # or: cd build/ && make install
```

Depending on the host, it will generate the following static lib and header files:

```
-- Installing: /usr/local/lib/libmediasoupclient.a
-- Up-to-date: /usr/local/include/mediasoupclient/mediasoupclient.hpp
```


## Requirements

* [libwebrtc](https://webrtc.org) must be downloaded and compiled in the system. Follow the [official instructions](https://webrtc.org/native-code/development/).
	* Make sure branch `remotes/branch-heads/72` is checked-out and compiled.

## Usage

Once installed (see *Installation* above):

```c++
#include "libmediasoupclient/mediasoupclient.hpp"
```

The **libmediasoupclient** API is exposed under the `mediasoupclient` C++ namespace.

**libmediasoupclient** integrates the [JSON for Modern C++](https://github.com/nlohmann/json/) library.


