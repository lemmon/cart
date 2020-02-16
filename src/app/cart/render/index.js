const html = require('nanohtml')
const {
  hasProducts,
} = require('../products')
const i18n = require('../i18n')
const state = require('../state')
const renderProducts = require('./products')

const renderEmpty = () => html`
  <div>
    <p>${i18n.t('cart.empty')}</p>
    <p><a
      class="cart__ul"
      href="#"
      onclick=${e => {
        e.preventDefault()
        cart.hide()
      }}
    >${i18n.t('action.close')}</a></p>
  </div>
`

module.exports = () => html`
  <div class="cart ${state.open ? 'cart--open' : 'cart--closed'} ${hasProducts() ? 'cart--products' : 'cart--empty'}">
    <div class="cart__overlay" onclick=${cart.hide}></div>
    <div class="cart__container">${
      hasProducts()
        ? renderProducts()
        : renderEmpty()
    }</div>
  </div>
`
