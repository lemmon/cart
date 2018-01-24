window.addEventListener('submit', e => {
  if (e.target.classList.contains('addtocart')) {
    e.preventDefault()
    const formData = new FormData(e.target)
    cart.addProduct({
      name: formData.get('name'),
      price: formData.get('price'),
    })
    cart.render()
  }
})
document.addEventListener('DOMContentLoaded', () => {
  cart.init()
}, false)

window.cart = require('./cart')
