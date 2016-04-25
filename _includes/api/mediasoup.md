## mediasoup
{: #mediasoup}

The top-level module.

```javascript
var mediasoup = require('mediasoup');
```


### Properties
{: #mediasoup-properties}

<section markdown='1'>

#### mediasoup.errors
{: #mediasoup-errors .code}

Provides access to the [errors](#errors) module.

#### mediasoup.extra
{: #mediasoup-extra .code}

Provides access to the [extra](#extra) module.

</section>


### Methods
{: #mediasoup-methods}

<section markdown='1'>

#### mediasoup.Server([options])
{: #mediasoup-Server .code}

Creates a [Server](#Server) instance.

`options` is an Object with the following fields:

<div markdown='1' id='mediasoup-Server-options' class='table-wrapper'>

Option                   | Type    | Description   | Default
------------------------ | ------- | ------------- | -------------
`numWorkers`             | Number  | Number of child worker processes. | The number of CPU cores in the host
`logLevel`               | String  | Logging level. Valid values are 'debug', 'warn', 'error'. | 'debug'
`rtcListenIPv4`          | String\|boolean | IPv4 for RTC. Valid values are a IPv4, `true` (auto-detect) and `false` (disabled). | `true`
`rtcListenIPv6`          | String\|boolean | IPv6 for RTC. Valid values are a IPv6, `true` (auto-detect) and `false` (disabled). | `true`
`rtcMinPort`             | Number  | Minimun RTC port. | 10000
`rtcMaxPort`             | Number  | Maximum RTC port. | 59999
`dtlsCertificateFile`    | String  | Path to the DTLS certificate. If unset, a random certificate is generated. | Unset
`dtlsPrivateKeyFile`     | String  | Path to the DTLS private key. If unset, a random certificate is generated. | Unset

</div>

Usage example:

```javascript
var server = mediasoup.Server({
    logLevel            : 'warn',
    rtcListenIPv4       : '1.2.3.4',
    rtcListenIPv6       : false,
    dtlsCertificateFile : '/home/foo/dtls-cert.pem',
    dtlsPrivateKeyFile  : '/home/foo/dtls-key.pem'
  });
```

</section>
