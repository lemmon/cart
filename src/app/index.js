const cart = require('./cart')

window.cart = cart

window.addEventListener('click', e => {
  if (!e.target || !e.target.classList.contains('showcart')) {
    return
  }
  e.preventDefault()
  cart.show()
})

window.addEventListener('submit', e => {
  if (!e.target || !e.target.classList.contains('addtocart')) {
    return
  }
  e.preventDefault()
  const formData = new FormData(e.target)
  cart.addProduct({
    name: formData.get('name'),
    price: formData.get('price'),
  })
  cart.show()
})

document.addEventListener('DOMContentLoaded', () => {
  cart.init()
}, false)
