const html = require('nanohtml')
const format = require('../utils/format')
const state = require('../state')
const i18n = require('../i18n')
const renderProduct = require('./product')
const {
  handleCheckout,
} = require('../actions/checkout')

module.exports = (cart) => html`
  <form class="cart__form" method=post onsubmit=${e => {
    e.preventDefault()
    handleCheckout(cart)
  }}>
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
          class="cart__button ${state.sending ? 'cart__button--loading' : ''} cart__button--primary"
          disabled=${state.sending}
        >
          <span class="cart__button__label">${i18n.t('caption.checkout')}</span>
          <span class="cart__button__loader"></span>
        </button>
      </div>
    </div>
  </form>
`
