module.exports.handleCheckout = (cart, state) => {
  console.log(cart.toJSON())
  state.sending = true
  cart.render()
  setTimeout(() => {
    state.sending = false
    cart.render()
  }, 3000)
}
