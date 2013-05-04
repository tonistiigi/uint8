var test = require('tape')
var uint8 = require('../')

var buffer = require('buffer').Buffer

test('simple to buffer', function(t) {
  t.plan(5)
  var a = new Uint8Array(12)
  a[0] = 1
  a[1] = 2
  var b = uint8.uint8ToBuffer(a)
  t.ok(b instanceof Buffer, 'Result is buffer')
  t.ok(Buffer.isBuffer(b), 'Result is buffer')
  t.equal(a.length, b.length)
  t.equal(a[0], b.readUInt8(0))
  t.equal(a[1], b.readUInt8(1))
  t.end()
})