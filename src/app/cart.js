const morph = require('nanomorph')
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
  toJSON: () => ({
    products: cart.allProducts(),
    total: cart.productsTotal(),
    count: cart.productsCount(),
  }),
}, products, {
  i18n,
})

module.exports = cart
