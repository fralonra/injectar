const inject = require('light-my-request')

function build (dispatch) {
  return new Injectar(dispatch)
}

function Injectar (dispatch) {
  this.option = {}
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

Injectar.prototype.end = function (callback) {
  inject(this.dispatch, this.option, callback)
}

module.exports = build
