import cart from './cart'
import Main from './components/Main'

if (window.cart) {
  console.warn('cart already defined')
} else {
  customElements.define('cart-main', Main)

  window.cart = cart

  window.addEventListener('click', (e) => {
    if (!e.target || !e.target.dataset.cartAction) return
    e.preventDefault()
    switch (e.target.dataset.cartAction) {
      case 'show':
        cart[e.target.dataset.cartAction]()
        return
    }
  })

  window.addEventListener('submit', (e) => {
    if (!e.target || e.target.dataset.cartAction !== 'addtocart') return
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formEntries = Array.from(formData.entries()).sort(([a], [b]) =>
      a < b ? -1 : a > b ? 1 : 0
    )
    const variant = formEntries.reduce((acc, [key, value]) => {
      const name = key.match(/^variant:(\w+)/)?.[1]
      if (name) {
        if (!acc) acc = []
        acc.push({
          name,
          value,
          label:
            form.querySelector(
              `select[name="variant:${name}"] option[value="${value}"]`
            )?.textContent ||
            form
              .querySelector(`input[name="variant:${name}"][value="${value}"]`)
              ?.closest('label')
              ?.textContent.trim(),
        })
      }
      return acc
    }, undefined)
    cart.addProduct({
      id: formData.get('id'),
      sku: formData.get('sku'),
      name: formData.get('name'),
      price: formData.get('price'),
      variant,
    })
    cart.show()
  })

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      cart.init()
    },
    false
  )
}
