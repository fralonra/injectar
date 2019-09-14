const t = require('tap')
const test = t.test

const injectar = require('../src')

const testUrl = 'http://example.com:8080/hello'

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
