[![browser support](https://ci.testling.com/tonistiigi/uint8.png)](https://ci.testling.com/tonistiigi/uint8)

##Uint8

Convert between [Uint8Array](https://developer.mozilla.org/en-US/docs/JavaScript/Typed_arrays/Uint8Array) and [Buffer](http://nodejs.org/api/buffer.html) without memory copy in [Browserify](https://github.com/substack/node-browserify).

*WIP*

## API

### uint8.uint8ToBuffer(uint8Array)

Convert Uint8Array to Buffer.
Also accepts ArrayBuffer and ArrayBufferView subclasses.

### uint8.bufferToUint8(buffer)

Convert Buffer to Uint8Array.
Fast route only possible if original buffer(or its parent) was created from with `uint8ToBuffer()` function. Otherwise will fallback to memory copy.
