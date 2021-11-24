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
* GNU `make`

### Linux, OSX and any *NIX system

* `gcc` and `g++` >= 4.9 or `clang` (with C++11 support)
* `cc` and `c++` commands (symlinks) pointing to the corresponding `gcc`/`g++` or `clang`/`clang++` executables.

<div markdown="1" class="note">
* On Debian and Ubuntu install the `python3-pip` DEB package, otherwise PIP package manager might be unavailable.
* On Debian and Ubuntu install the `build-essential` DEB package. It includes both `make` and `gcc`/`g++`.
* On YUM based Linux (Red Hat, CentOS) use `yum groupinstall "Development Tools"`.
* On OSX M1 ensure that you have a M1 version of `node`.
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

* Microsoft Visual Studio environment with MSVC compiler (with C++11 support).

<div markdown="1" class="note">
* GNU `make` can be installed with MSYS from [MinGW](https://sourceforge.net/projects/mingw/) and make sure to append the path of folder containing `make` to the Windows `Path` environment variable (e.g. `C:\MinGW\msys\1.0\bin`).
* Configure Microsoft Visual Studio environment using **Command Prompt** (instructions given for MSVS 2017 v15.2 or newer).
  * Find `vsvars64.bat` that corresponds to the version you want, for instance:
    ```
    "%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -find VC\Auxiliary\Build\vcvars64.bat
    ```
  * Set up the environment using output from the previous command:
    ```
    "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat"
    ```
* **Or** configure Microsoft Visual Studio environment using **PowerShell** (instructions given for MSVS 2017 v15.2 or newer).
  * Find `vsvars64.bat` that corresponds to the version you want, for instance:
    ```
    & "C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe" -latest -find VC\Auxiliary\Build\vcvars64.bat
    ```
  * Set up the environment using output from the previous command:
    ```
    cmd /c "call `"C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars64.bat`" && set > %temp%/vcvars.txt"

    Get-Content "$env:temp\vcvars.txt" | Foreach-Object {
      if ($_ -match "^(.*?)=(.*)$") {
        Set-Content "env:\$($matches[1])" $matches[2]
      }
    }
    ```
* Make sure to have **ISRG Root X1** certificate installed, or you will get errors while downloading OpenSSL (whose website is secured with Let's Encrypt), you can import it from <https://letsencrypt.org/certs/isrgrootx1.der> (install to Local computer).
* If you have Python-related errors, search for "App execution aliases" in system settings and disable everything Python-related from there.
</div>


## Usage

Within your Node.js application:

```javascript
const mediasoup = require("mediasoup");
```
