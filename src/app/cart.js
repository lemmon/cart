import products from './products'
import i18n from './i18n'
import state from './state'

const props = {}

const cart = {
  init: () => {
    if (props.CART) {
      console.warn('console already initialized')
      return
    }
    props.CART = document.body.appendChild(<cart-main />)
  },
  render: () => {
    props.CART.render()
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
