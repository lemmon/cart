const html = require('nanohtml')
const i18n = require('../i18n')
const renderProducts = require('./products')

const renderEmpty = (cart, state) => html`
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

module.exports = (cart, state) => html`
  <div class="cart ${state.open ? 'cart--open' : 'cart--closed'} ${cart.hasProducts() ? 'cart--products' : 'cart--empty'}">
    <div class="cart__overlay" onclick=${cart.hide}></div>
    <div class="cart__container">
      <div class="cart__header">
        <div class="cart__close">
          <button class="cart__button cart__close__button" aria-label="Close" onclick=${e => {
            cart.hide()
          }}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y2="6" x2="18" y1="18" />
          </svg></button>
        </div>
        <h1 class="cart__header__title">${i18n.t('caption.basket')}</h1>
      </div>
      <div class="cart__content">${
        cart.hasProducts()
          ? renderProducts(cart, state)
          : renderEmpty(cart, state)
      }</div>
    </div>
  </div>
`
