const html = require('nanohtml')
const format = require('../../utils/format')
const state = require('../state')
const i18n = require('../i18n')
const renderProduct = require('./product')

const handleSubmit = e => {
  e.preventDefault()
  alert('(o)_(o)')
  cart.render()
}

module.exports = (cart) => html`
  <form class="cart__form" method=post onsubmit=${handleSubmit}>
    <div class="cart__products">
      ${cart.allProducts().map(curr => (
        renderProduct(curr, cart)
      ))}
    </div>
    <div class="cart__summary">
      <div class="cart__dl">
        <div class="cart__dt">${i18n.t('caption.total')}</div>
        <div class="cart__dd">${i18n.t('price.currency', format.number(cart.productsTotal(), 2))}</div>
      </div>
      <div>
        <button
          type=submit
          class="cart__button cart__button--primary"
        >${i18n.t('caption.checkout')}</button>
      </div>
    </div>
  </form>
`
