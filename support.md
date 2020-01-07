---
title   : Support
anchors : true
---


# Support

mediasoup is an Open Source project supported on a best effort basis. Before asking any questions, please check the [documentation](/documentation/) and the [F.A.Q.](/faq/) (the response may be there).


### Questions and Doubts

<div markdown="1" class="computer-icon-text-columns">
<div markdown="1" class="icon">

![](/images/icon-help.svg){: .left.logo }

</div>
<div markdown="1" class="text">

Use the **[mediasoup Discourse Group][mediasoup-discourse-group]** for questions and doubts regarding mediasoup and its ecosystem.

You can also check for historical discussions in the [mediasoup Google Group][mediasoup-google-group] (previously used as mediasoup support forum).

</div>
</div>


### Bug Reports and Feature Requests

<div markdown="1" class="computer-icon-text-columns">
<div markdown="1" class="icon">

![](/images/icon-bug.svg){: .left.logo }

</div>
<div markdown="1" class="text">

If you find an issue or bug in the software, or want to propose a new feature or improvement, do not hesitate to report it in the corresponding issue tracker:

* **[mediasoup issue tracker][mediasoup-github-issues]**
* **[mediasoup-client issue tracker][mediasoup-client-github-issues]**
* **[libmediasoupclient issue tracker][libmediasoupclient-github-issues]**

</div>
</div>

<div markdown="1" class="note warn">
Please do **NOT** open an issue in GitHub for questions or doubts. Use the **[mediasoup Discourse Group][mediasoup-discourse-group]** instead.
</div>

#### Crashes in mediasoup (get a core dump)

If you get a crash in mediasoup server, this is, if you get an error log as follows:

```
2020-01-06T16:02:57.965Z mediasoup:ERROR:Worker worker process died unexpectedly [pid:22, code:null, signal:SIGABRT]
```

or if the [worker.on("died")](/documentation/v3/mediasoup/api/#worker-on-died) event fires, this is a bug in mediasoup that should not happen.

If so, please report the issue in [GitHub][mediasoup-github-issues] and also enable core dumps in your host. If you run mediasoup in Linux, do it as follows **before** running your mediasoup application again:

```bash
$ mkdir /tmp/cores
$ chmod 777 /tmp/cores
$ echo "/tmp/cores/core.%e.sig%s.%p" > /proc/sys/kernel/core_pattern
$ ulimit -c unlimited
```

Then run your mediasoup application. If the crash happens again you should get a core dump in the `/tmp/cores` folder. Please attach it into the issue reported in GitHub.




[mediasoup-discourse-group]:https://mediasoup.discourse.group
[mediasoup-google-group]: https://groups.google.com/forum/#!forum/mediasoup
[mediasoup-github-issues]: https://github.com/versatica/mediasoup/issues
[mediasoup-client-github-issues]: https://github.com/versatica/mediasoup-client/issues
[libmediasoupclient-github-issues]: https://github.com/versatica/libmediasoupclient/issues
