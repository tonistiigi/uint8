var test = require('tape')
var uint8 = require('../')

var Buffer = require('buffer').Buffer

var a, b

test('simple to buffer', function(t) {
  t.plan(5)
  a = new Uint8Array(12)
  a[0] = 1
  a[1] = 2
  b = uint8.uint8ToBuffer(a)
  t.ok(b instanceof Buffer, 'Result is buffer')
  t.ok(Buffer.isBuffer(b), 'Result is buffer')
  t.equal(a.length, b.length)
  t.equal(a[0], b.readUInt8(0))
  t.equal(a[1], b.readUInt8(1))
  t.end()
})

test('same memory usage', function(t) {
  t.plan(2)
  b.writeUInt8(3, 2)
  a[3] = 4
  t.equal(a[2], 3)
  t.equal(b.readUInt8(3), 4)
  t.end()
})

test('common buffer methods', function(t) {
  t.plan(4)
  var c = new Int32Array(a.buffer, a.byteOffset, a.byteLength / Int32Array.BYTES_PER_ELEMENT)
  b.writeInt32LE(1e9, 4)
  t.equal(b.readInt32LE(4), 1e9)
  t.equal(c[1], 1e9)
  c[2] = 2e9
  t.equal(c[2], 2e9)
  t.equal(b.readInt32LE(8), 2e9)
  t.end()
})