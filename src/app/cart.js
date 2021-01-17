import morph from 'nanomorph'
import products from './products'
import i18n from './i18n'
import render from './render'
import state from './state'

const cart = {
  init: () => {
    cart.DOM = render(cart, state)
    document.body.appendChild(cart.DOM)
  },
  render: () => {
    morph(cart.DOM, render(cart, state))
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
  i18n,
  ...products,
}

export default cart
