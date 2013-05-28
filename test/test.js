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

test('buffer.fill', function(t) {
  t.plan(2)
  b.fill(3)
  t.equal(b.readUInt8(2), 3)
  t.equal(a[5], 3)
  t.end()
})


test('simple from buffer', function(t) {
  t.plan(5)
  var c = uint8.bufferToUint8(b)
  t.ok(c instanceof Uint8Array)
  t.equal(c.length, b.length)
  t.equal(c[4], 3)
  b.writeUInt8(5, 2)
  c[3] = 6
  t.equal(c[2], 5)
  t.equal(b.readUInt8(3), 6)
  t.end()
})

test('from normal buffer(memory copy)', function(t) {
  t.plan(4)
  var b = new Buffer(10)
  b.writeUInt8(2, 0)
  b.writeUInt8(4, 1)
  var c = uint8.bufferToUint8(b)
  t.ok(c instanceof Uint8Array)
  t.equal(c.length, b.length)
  t.equal(c[0], 2)
  t.equal(c[1], 4)
  t.end()
})

test('offsets are handled', function(t) {
  t.plan(13)
  var a1 = new Uint8Array(12)
  var a2 = new Uint8Array(a1.buffer, 4, 8)

  var b1 = uint8.uint8ToBuffer(a2)
  var b2 = b1.slice(4)

  var a3 = uint8.bufferToUint8(b2)

  t.equal(a1.length, 12)
  t.equal(a2.length, 8)
  t.equal(a3.length, 4)
  t.equal(b1.length, 8)
  t.equal(b2.length, 4)

  a1[8] = 7
  t.equal(7, a2[4])
  t.equal(7, b1.readUInt8(4))
  t.equal(7, b2.readUInt8(0))
  t.equal(7, a3[0])

  b2.writeUInt8(8, 1)
  t.equal(8, a1[9])
  t.equal(8, a2[5])
  t.equal(8, b1.readUInt8(5))
  t.equal(8, a3[1])

  t.end()
})

test('Fast path for buffer.copy', function(t) {
  t.plan(10)
  var b1 = uint8.uint8ToBuffer(new Uint8Array([0, 1, 2, 3, 4]))
  var b2 = uint8.uint8ToBuffer(new Uint8Array(5))

  b1.copy(b2, 1, 2, 5)

  t.equal(b2.readUInt8(0), 0)
  t.equal(b2.readUInt8(1), 2)
  t.equal(b2.readUInt8(2), 3)
  t.equal(b2.readUInt8(3), 4)
  t.equal(b2.readUInt8(4), 0)

  // copy-over
  b1.copy(b1, 2)

  t.equal(b1.readUInt8(0), 0)
  t.equal(b1.readUInt8(1), 1)
  t.equal(b1.readUInt8(2), 0)
  t.equal(b1.readUInt8(3), 1)
  t.equal(b1.readUInt8(4), 2)

  t.end()
})

test('Fast path for buffer.copy', function(t) {
  t.plan(7)
  var b1 = uint8.uint8ToBuffer(new Uint8Array([0, 1]))
  var b2 = uint8.uint8ToBuffer(new Uint8Array([2, 3, 4]))

  var b = Buffer.concat([b1, b2])

  t.equal(b.length, 5)
  t.ok(!!b.parent.buffer)
  t.equal(b.readUInt8(0), 0)
  t.equal(b.readUInt8(1), 1)
  t.equal(b.readUInt8(2), 2)
  t.equal(b.readUInt8(3), 3)
  t.equal(b.readUInt8(4), 4)

  t.end()
})

