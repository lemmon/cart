const assert = require('assert')
const morph = require('nanomorph')
const bus = require('../bus')
const products = require('./products')
const countries = require('./countries')
const shipping = require('./shipping')
const duties = require('./duties')
const summary = require('./summary')
const i18n = require('./i18n')
const render = require('./render')
const state = require('./state')

const cart = Object.assign({
  init: () => {
    cart.DOM = render()
    document.body.appendChild(cart.DOM)
  },
  render: () => {
    morph(cart.DOM, render())
  },
  show: () => {
    state.open = true
    cart.render()
  },
  hide: () => {
    state.open = false
    state.validated = false
    cart.render()
  },
  open: () => {
    return state.open
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
}, products, countries, shipping, duties, summary, {
  i18n,
})

module.exports = cart
