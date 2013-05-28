var buffer = require('buffer')

exports.uint8ToBuffer = function(array) {
  var copy
  if (array instanceof ArrayBuffer) {
    copy = new Uint8Array(array, 0, array.byteLength)
  }
  if (array.buffer instanceof ArrayBuffer) {
    copy = new Uint8Array(array.buffer, array.byteOffset, array.byteLength)
  }
  else {
    throw(new Error('Unsupported input for conversion. Only Uint8Array and ' +
                    'ArrayBuffer instances are allowed'))
  }

  copy.__proto__.__proto__ = Object.create(buffer.SlowBuffer.prototype)
  // todo: no __proto__ in IE10. workaround?

  return new buffer.Buffer(copy, copy.length, 0)
}

exports.bufferToUint8 = function(buffer) {
  // Fast reference.
  if (buffer.parent.buffer) {
    return new Uint8Array(buffer.parent.buffer, buffer.offset + buffer.parent.byteOffset, buffer.length)
  }
  // Memory copy.
  var array = new Uint8Array(buffer.length)
  // todo: test performace. for cycle is probably faster
  array.set(Array.prototype.slice.call(buffer.parent, buffer.offset,
    buffer.offset + buffer.length))
  return array
}

require('./fastcopy')