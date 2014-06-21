var util = require('util');
var Transform = require('stream').Transform;
var _ = require("underscore");

function Srough(transform, flush, options) {
  options = _.defaults({objectMode: true}, options || {});
  Transform.call(this, options);
  this.__transform = (transform || defaultTransform).bind(this);
  this.__flush = (flush || defaultFlush).bind(this);
  this.queue = this.push;
}
util.inherits(Srough, Transform);

Srough.prototype._transform = function (chunk, encoding, cb) {
  this.__transform(chunk, cb);
}

Srough.prototype._flush = function (cb) {
  this.__flush(cb);
}

function defaultTransform(data, done) {
  this.push(data);
  done();
}

function defaultFlush(done) {
  done();
}

module.exports = function (write, end) {
  return new Srough(write, end);
}