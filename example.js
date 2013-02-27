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
