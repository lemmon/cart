const html = require('nanohtml')
const format = require('../utils/format')
const i18n = require('../i18n')

module.exports = (curr, cart) => html`
  <article class="cart__product">
    <figure class="cart__product__figure">
      <a href="#"><svg class="cart__image" viewBox="0 0 1 1"></svg></a>
    </figure>
    <div class="cart__product__info">
      <h1><a class="cart__ul:hover" href="#">${curr.name}</a></h1>
    </div>
    <div class="cart__product__price">
      <div class="cart__product__remove">
        <button class="cart__button cart__product__remove__button" aria-label="Remove Product" onclick=${e => {
          e.preventDefault()
          cart.removeProduct(curr)
          cart.render()
        }}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
          <line x1="7" y1="9" x2="17" y2="9" />
          <line x1="12" y1="11" x2="12" y2="15" />
          <polygon points="9,9 9,17 15,17 15,9" fill="none" />
          <polygon points="10,9 11,7 13,7 14,9" fill="none" />
        </svg></button>
      </div>
      <div class="cart__product__price__total">${format.number(curr.total, 2)}</div>
      ${curr.count > 1 ? html`<div class="cart__product__price__unit">${i18n.t('price.unit', format.number(curr.price, 2))}</div>` : ``}
    </div>
    <div class="cart__product__actions">
      <div class="cart__product__count">
        <button class="cart__button cart__product__count__decrease" aria-label="Decrease Count" onclick=${e => {
          e.preventDefault()
          cart.decreaseProductCount(curr)
          cart.render()
        }}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
          <line x1="7" y1="12" x2="17" y2="12" />
        </svg></button>
        <div class="cart__product__count__value">${format.number(curr.count)}</div>
        <button class="cart__button cart__product__count__increase" aria-label="Increase Count" onclick=${e => {
          e.preventDefault()
          cart.increaseProductCount(curr)
          cart.render()
        }}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
          <line x1="7" y1="12" x2="17" y2="12" />
          <line y1="7" x1="12" y2="17" x2="12" />
        </svg></button>
      </div>
    </div>
  </article>
`
