const inject = require('light-my-request')

function build (dispatch, option) {
  return new Injectar(dispatch, option)
}

function Injectar (dispatch, option = {}) {
  this.option = {
    ...option
  }
  this.dispatch = dispatch
}

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

httpMethods.forEach(method => {
  Injectar.prototype[method] = function (url) {
    this.option.url = url
    this.option.method = method.toUpperCase()
    return this
  }
})

const chainMethods = [
  'body',
  'headers',
  'payload',
  'query'
]

chainMethods.forEach(method => {
  Injectar.prototype[method] = function (value) {
    this.option[method] = value
    return this
  }
})

Injectar.prototype.header = function (key, value) {
  if (!this.option.headers) {
    this.option.headers = {}
  }
  this.option.headers[key] = value
  return this
}

Injectar.prototype.end = function (callback) {
  if (typeof callback === 'function') {
    inject(this.dispatch, this.option, callback)
  } else {
    return inject(this.dispatch, this.option)
  }
}

module.exports = build
