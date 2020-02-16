const html = require('nanohtml')
const bus = require('../../bus')
const {
  increaseProductCount,
  decreaseProductCount,
  removeProduct,
} = require('../products')

module.exports = (item) => html`
  <article class="cart__product">
    <figure class="cart__product__figure">
      <a href="#"><svg class="cart__image" viewBox="0 0 1 1"></svg></a>
    </figure>
    <div class="cart__product__info">
      <h1><a class="cart__ul:hover" href="#">${item.name}</a></h1>
    </div>
    <div class="cart__product__price">
      <div class="cart__product__price__total">${bus.numberFormat(item.total, 2)}</div>
      ${item.count > 1 ? html`<div class="cart__product__price__unit">${bus.unitFormat(bus.numberFormat(item.price, 2))}</div>` : ``}
    </div>
    <div class="cart__product__count">
      <a class="cart__product__count__decrease" href="#" onclick=${e => {
        e.preventDefault()
        decreaseProductCount(item)
        cart.render()
      }}>-</a>
      <div class="cart__product__count__value">${bus.numberFormat(item.count)}</div>
      <a class="cart__product__count__increase" href="#" onclick=${e => {
        e.preventDefault()
        increaseProductCount(item)
        cart.render()
      }}>+</a>
    </div>
    <div class="cart__product__remove">
      <button class="cart__button cart__product__remove__button" onclick=${e => {
        e.preventDefault()
        removeProduct(item)
        cart.render()
      }}>\u00D7</button>
    </div>
  </article>
`
