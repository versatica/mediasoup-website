## extra
{: #extra}

The `extra` module (exported via `mediasoup.extra`) holds utilities for the application developer.


### Functions
{: #extra-functions}

<section markdown='1'>

#### extra.fingerprintFromSDP(sdpFingerprint)
{: #extra-fingerprintFromSDP .code}

Generates a raw DTLS certificate fingerprint (lowercase without colons).

* `sdpFingerprint` (String): SDP fingerprint (uppercase with colons).

```javascript
var sdpFingerprint = '75:1B:81:93:B7:ED:27:7E:42:BE:D6:C4:8E:F7:04:3A:49:CE:3F:EE';

extra.fingerprintFromSDP(sdpFingerprint);
// => '751b8193b7ed277e42bed6c48ef7043a49ce3fee'
```

#### extra.fingerprintToSDP(rawFingerprint)
{: #extra-fingerprintToSDP .code}

Generates a DTLS certificate fingerprint for SDP usage (uppercase with colons).

* `rawFingerprint` (String): Raw fingerprint (lowercase without colons).

```javascript
var rawFingerprint = '751b8193b7ed277e42bed6c48ef7043a49ce3fee';

extra.fingerprintToSDP(rawFingerprint);
// => '75:1B:81:93:B7:ED:27:7E:42:BE:D6:C4:8E:F7:04:3A:49:CE:3F:EE'
```

</section>
