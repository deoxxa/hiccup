Hiccup
======

Create streams that simulate slow behavior

Example
-------

```js
var stream = require("stream"),
    hiccup = require("./lib/hiccup");

// create writable
var writable = new stream.Writable();
writable._write = function _write(chunk, done) {
  console.log(chunk, chunk.toString());
  done();
};

// create slow buffer
var slow = new hiccup.Buffer(4);
slow.pipe(writable);

// send some data, albeit slowly
slow.write(new Buffer("hi, naomik."));
slow.write(new Buffer("my name is slow."));
slow.write(new Buffer("you talk quickly"));
slow.write(new Buffer("quicklier* (sorry)"));
slow.write(new Buffer("than me."));
```

Output
------

```
<Buffer 68 69 2c 20 6e 61 6f> 'hi, nao'
<Buffer 6d 69 6b 2e> 'mik.'
<Buffer 6d 79 20 6e> 'my n'
<Buffer 61 6d 65> 'ame'
<Buffer 20 69 73 20> ' is '
<Buffer 73 6c 6f 77> 'slow'
<Buffer 2e> '.'
<Buffer 79 6f 75 20 74> 'you t'
<Buffer 61 6c> 'al'
<Buffer 6b 20 71 75 69 63> 'k quic'
<Buffer 6b 6c 79> 'kly'
<Buffer 71 75 69 63 6b 6c 69> 'quickli'
<Buffer 65 72 2a 20 28> 'er* ('
<Buffer 73 6f 72 72 79 29> 'sorry)'
<Buffer 74 68 61 6e 20> 'than '
<Buffer 6d 65 2e> 'me.'
```