import products from './products'
import i18n from './i18n'
import state from './state'

const my = {}

const cart = {
  init: () => {
    if (my.$cart) {
      console.warn('cart already initialized')
      return
    }
    my.$cart = document.body.appendChild(<cart-main />)
  },
  render: () => {
    my.$cart.render()
  },
  show: () => {
    state.open = true
    my.bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cart.render()
  },
  hide: () => {
    state.open = false
    document.body.style.overflow = my.bodyOverflow
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
