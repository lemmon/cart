const html = require('nanohtml')
const i18n = require('../i18n')
const state = require('../state')
const renderProducts = require('./products')

const renderEmpty = (cart) => html`
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

module.exports = (cart) => html`
  <div class="cart ${state.open ? 'cart--open' : 'cart--closed'} ${cart.hasProducts() ? 'cart--products' : 'cart--empty'}">
    <div class="cart__overlay" onclick=${cart.hide}></div>
    <div class="cart__container">
      <div class="cart__header">
        <div class="cart__close">
          <button class="cart__button cart__close__button" onclick=${e => {
            cart.hide()
          }}>\u00D7</button>
        </div>
        <h1 class="cart__header__title">${i18n.t('caption.basket')}</h1>
      </div>
      <div class="cart__content">${
        cart.hasProducts()
          ? renderProducts(cart)
          : renderEmpty(cart)
      }</div>
    </div>
  </div>
`
