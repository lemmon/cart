const html = require('nanohtml')
const format = require('../../utils/format')
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
      <div class="cart__product__price__total">${i18n.t('price.currency', format.number(curr.total, 2))}</div>
      ${curr.count > 1 ? html`<div class="cart__product__price__unit">${i18n.t('price.unit', format.number(curr.price, 2))}</div>` : ``}
    </div>
    <div class="cart__product__count">
      <a class="cart__product__count__decrease" href="#" onclick=${e => {
        e.preventDefault()
        cart.decreaseProductCount(curr)
        cart.render()
      }}>-</a>
      <div class="cart__product__count__value">${format.number(curr.count)}</div>
      <a class="cart__product__count__increase" href="#" onclick=${e => {
        e.preventDefault()
        cart.increaseProductCount(curr)
        cart.render()
      }}>+</a>
    </div>
    <div class="cart__product__remove">
      <button class="cart__button cart__product__remove__button" onclick=${e => {
        e.preventDefault()
        cart.removeProduct(curr)
        cart.render()
      }}>\u00D7</button>
    </div>
  </article>
`
