var stream  = require("stream"),
    util    = require("util");

var HiccupBuffer = module.exports = function HiccupBuffer(size, delay, jitter) {
  stream.Transform.call(this);
  this._size    = size    || 4;
  this._delay   = delay   || 500;
  this._jitter  = jitter  || 0.5;
};
util.inherits(HiccupBuffer, stream.Transform);

HiccupBuffer.prototype._transform = function _transform(chunk, output, done) {
  var len     = chunk.length,
      offset  = 0;

  var hiccup = function hiccup() {
    setTimeout(function() {
      var size = this.size();

      if (offset+size > len) {
        output(chunk.slice(offset, len));
        done();
      }
      else {
        output(chunk.slice(offset, offset+=size));
        hiccup();
      }
    }.bind(this), this.delay());
  }.bind(this);

  hiccup();
};

HiccupBuffer.prototype.size = function size() {
  return this._random(this._size);
};

HiccupBuffer.prototype.delay = function delay() {
  return this._random(this._delay);
};

HiccupBuffer.prototype._random = function _random(n) {
  return Math.round(Math.random() * n * (1+this._jitter)) + n*this._jitter;
};
