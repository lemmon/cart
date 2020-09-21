const state = require('../state')

module.exports.handleCheckout = (cart) => {
  console.log(cart.toJSON())
  state.sending = true
  cart.render()
  setTimeout(() => {
    state.sending = false
    cart.render()
  }, 3000)
}
