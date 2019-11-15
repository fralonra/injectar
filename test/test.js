const t = require('tap')
const test = t.test

const injectar = require('../src')

const testUrl = 'http://example.com:8080/hello'

const httpMethods = [
  'delete',
  'get',
  'head',
  'options',
  'patch',
  'post',
  'put',
  'trace'
]

test('http methods', (t) => {
  t.plan(16)

  function dispatch (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end(req.method)
  }

  httpMethods.forEach(method => {
    injectar(dispatch)
      [method](testUrl)
      .end((err, res) => {
        t.error(err)
        t.equal(res.body, method.toUpperCase())
      })
  })
})

test('body: string', (t) => {
  t.plan(2)

  function dispatch (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })
    req.pipe(res)
  }

  injectar(dispatch)
    .get(testUrl)
    .body('body')
    .end((err, res) => {
      t.error(err)
      t.equal(res.body, 'body')
    })
})

test('headers', (t) => {
  t.plan(2)

  function dispatch (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end(req.headers.foo)
  }

  injectar(dispatch)
    .get(testUrl)
    .headers({ foo: 'bar' })
    .end((err, res) => {
      t.error(err)
      t.equal(res.payload, 'bar')
    })
})

test('header', (t) => {
  t.plan(2)

  function dispatch (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end(req.headers.foo)
  }

  injectar(dispatch)
    .get(testUrl)
    .header('foo', 'bar')
    .end((err, res) => {
      t.error(err)
      t.equal(res.payload, 'bar')
    })
})

test('headers and header combination', (t) => {
  t.plan(3)

  function dispatch (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end(JSON.stringify(req.headers))
  }

  injectar(dispatch)
    .get(testUrl)
    .headers({ foo: 'bar' })
    .header('test', '123')
    .end((err, res) => {
      t.error(err)
      const payload = JSON.parse(res.payload)
      t.equal(payload.foo, 'bar')
      t.equal(payload.test, '123')
    })
})

test('payload', (t) => {
  t.plan(2)

  function dispatch (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })
    req.pipe(res)
  }

  injectar(dispatch)
    .get(testUrl)
    .payload('payload')
    .end((err, res) => {
      t.error(err)
      t.equal(res.payload, 'payload')
    })
})

test('query', (t) => {
  t.plan(2)

  function dispatch (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end(req.url)
  }

  injectar(dispatch)
    .get(testUrl)
    .query({ foo: 'bar' })
    .end((err, res) => {
      t.error(err)
      t.equal(res.payload, '/hello?foo=bar')
    })
})
