[![browser support](https://ci.testling.com/tonistiigi/uint8.png)](https://ci.testling.com/tonistiigi/uint8)

##Uint8

Convert between [Uint8Array](https://developer.mozilla.org/en-US/docs/JavaScript/Typed_arrays/Uint8Array) and [Buffer](http://nodejs.org/api/buffer.html) without memory copy in [Browserify](https://github.com/substack/node-browserify).

**Only for browserify. Do not use this module for Node.js code. Some basic stuff work but not all. Array to Buffer conversion is fast in Node so this module isn't really necessary there.**

### Installation

```
npm install uint8
```

### Usage

```
var uint8 = require('uint8')
```

## API

### uint8.uint8ToBuffer(uint8Array)

Convert Uint8Array to Buffer.
Also accepts ArrayBuffer and ArrayBufferView subclasses.

### uint8.bufferToUint8(buffer)

Convert Buffer to Uint8Array.
Fast route only possible if original buffer(or its parent) was created from with `uint8ToBuffer()` function. Otherwise will fallback to memory copy.
