var buffer = require('buffer')
var uint8 = require('./')

var copy_ = buffer.Buffer.prototype.copy

buffer.Buffer.prototype.copy = function(target, target_start, start, end) {
  if (!target.parent.buffer || !this.parent.buffer) {
    return copy_.apply(this, arguments)
  }

  // from toots/buffer-browserify
  var source = this;
  start || (start = 0);
  end || (end = this.length);
  target_start || (target_start = 0);

  if (end < start) throw new Error('sourceEnd < sourceStart');

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length == 0 || source.length == 0) return 0;

  if (target_start < 0 || target_start >= target.length) {
    throw new Error('targetStart out of bounds');
  }

  if (start < 0 || start >= source.length) {
    throw new Error('sourceStart out of bounds');
  }

  if (end < 0 || end > source.length) {
    throw new Error('sourceEnd out of bounds');
  }

  // Are we oob?
  if (end > this.length) {
    end = this.length;
  }

  if (target.length - target_start < end - start) {
    end = target.length - target_start + start;
  }

  var slice = new Uint8Array(this.parent.buffer,
    this.parent.byteOffset + this.offset + start,
    this.parent.byteOffset + this.offset - start + end)
  new Uint8Array(target.parent.buffer).
    set(slice, this.parent.byteOffset + this.offset + target_start)
}


buffer.Buffer.concat = function (list, totalLength) {
  // from toots/buffer-browserify
  if (!Array.isArray(list)) {
    throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
  }

  if (list.length === 0) {
    return new Buffer(0);
  } else if (list.length === 1) {
    return list[0];
  }

  if (typeof totalLength !== 'number') {
    totalLength = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      totalLength += buf.length;
    }
  }

  var buffer = uint8.uint8ToBuffer(new Uint8Array(totalLength));
  var pos = 0;
  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};