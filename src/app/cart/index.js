const assert = require('assert')
const morph = require('nanomorph')
const bus = require('../bus')
const products = require('./products')
const i18n = require('./i18n')
const render = require('./render')
const state = require('./state')

const cart = Object.assign({
  init: () => {
    cart.DOM = render(cart)
    document.body.appendChild(cart.DOM)
  },
  render: () => {
    morph(cart.DOM, render(cart))
  },
  show: () => {
    state.open = true
    cart.render()
  },
  hide: () => {
    state.open = false
    cart.render()
  },
  on: (name, cb) => {
    assert.equal(typeof name, 'string', 'event name should be a string')
    assert.equal(typeof cb, 'function', 'callback should be a function')
    bus[name] = cb
  },
  use: (cb) => {
    assert.equal(typeof cb, 'function', 'callback should be a function')
    cb()
  },
}, products, {
  i18n,
})

module.exports = cart
