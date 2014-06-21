srough
======

Like [through](https://github.com/dominictarr/through) for async streams.

In 90% of the cases you should use [through](https://github.com/dominictarr/through).
Use `srough` only when you're stream is `async`.

The main idea is that streams are sync units that can perform async operations.

Data objects should be processed and written downstream in the same order they arrived from upstream.

Let's say we have a Transform stream that receives URL's from upstream and writes the response headers downstream.

Now, let's suppose that the urls are being written in the following order:

1.  `slowserver.com`
2.  `fastserver.com`

Downstream, should receive the `response headers` in the same order exactly. If we'll use [through](https://github.com/dominictarr/through)
the URLs would be processed concurrently and the response would be written downstream in a random order.

Eventually, `srough` is exactly the same thing as [through](https://github.com/dominictarr/through), just with `sync` callback.

## Usage

```js
var srough = require("srough");

var stream = srough(function write(data, done) {
                 somethingAsync(data, function (err, res) {
                    this.queue(res) //data *must* not be null
                    done(); // After you call this callback, will process next...
                 });
               },
               function end (done) { //optional
                 this.queue(null);
                 done();
               });
```

Basically same API as [through](https://github.com/dominictarr/through) just with a synchronization callback.