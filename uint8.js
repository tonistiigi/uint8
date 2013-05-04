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

  copy.__proto__ = Object.create(buffer.SlowBuffer.prototype)
  // todo: no __proto__ in IE10. workaround?

  return new buffer.Buffer(copy, copy.length, 0)
}

exports.bufferToUint8 = function(buffer) {

}
