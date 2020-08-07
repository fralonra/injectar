# injectar

[![npm version](https://img.shields.io/npm/v/injectar.svg)](https://www.npmjs.com/package/injectar)
[![Build Status](https://travis-ci.com/fralonra/injectar.svg?branch=master)](https://travis-ci.com/fralonra/injectar) [![Greenkeeper badge](https://badges.greenkeeper.io/fralonra/injectar.svg)](https://greenkeeper.io/)

### **Deprecated**: [light-my-request](https://github.com/fastify/light-my-request) is now supporting chainable APIs! Check [here](https://github.com/fastify/light-my-request#method-chaining).

Inject a fake http request to test, debug your server logic with ease. Using [light-my-request](https://github.com/fastify/light-my-request) internally. Provide friendly and chainable APIs based on `light-my-request`.

## Install

```bash
npm install injectar
```

or

```bash
yarn add injectar
```

## Usage

```javascript
const injectar = require('injectar')

function dispatch (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('hello injectar')
}

injectar(dispatch)
  .get('http://example.site/test')
  .end((err, res) => {
    // do something
  })
})

// or using async/await
try {
  await injectar(dispatch)
    .get('http://example.site/test')
    .end()
} catch (err) {
  // handle error
}
```

## API

Check the document for [light-my-request](https://github.com/fastify/light-my-request) for more.

#### constructor (dispatchFunction[, options])

The constructor recieves two arguments: the dispatch function and the options to be passed to the `light-my-request` instance.

#### get
#### post
#### put
#### delete
#### head
#### options
#### patch
#### trace

The above all determine the request method.

#### body

Add body to request. Can be a string, Buffer, Stream or object (will be treated as JSON format).

```javascript
injectar(dispatch)
  .post('http://example.site/test')
  .body({ foo: 'bar' })
  .end((err, res) => {
    // do something
  })
})
```

#### headers

Add request headers.

```javascript
injectar(dispatch)
  .get('http://example.site/test')
  .headers({ foo: 'bar' })
  .end((err, res) => {
    // do something
  })
})
```

#### header

Add a single request header.

```javascript
injectar(dispatch)
  .get('http://example.site/test')
  .header('foo', 'bar')
  .end((err, res) => {
    // do something
  })
})
```

*NOTE*: If followed by a `headers` method, the value provided by `headers` will override the previous set headers, instead of combining them.

#### payload

An alias for `body`.

#### query

Add querystring to url.

```javascript
injectar(dispatch)
  .get('http://example.site/test')
  .query({ foo: 'bar' })
  .end((err, res) => {
    // do something
  })
})
```
