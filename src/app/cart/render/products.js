const html = require('nanohtml')
const bus = require('../../bus')
const css = require('../../utils/css')
const select = require('../../forms/select')
const state = require('../state')
const renderProduct = require('./product')
const renderDuty = require('./duty')

module.exports = () => html`
  <div class=${css('col', 'p05')}>
    <div class=${css('span1', 'p025')}>
      ${cart.allProducts().map(renderProduct)}
    </div>
    <div class=${css('row', 'justify-between', 'bold')}>
      <div class=${css('p05')}>Products Total</div>
      <div class=${css('p05')}>${bus.numberFormat(cart.productsTotal(), 2)}</div>
    </div>
    <div class="${css('p05')}">
      <button class=${css('button')}>Checkout</button>
    </div>
    <div class="${css('p025')}">
      ${select({
        placeholder: `Country`,
        options: cart.allCountries(),
        value: cart.getShipping().country,
        disabled: !!state.working,
        error: state.validated && !cart.getShipping().country,
        onchange: (country) => {
          cart.setShipping(Object.assign(cart.getShipping(), {
            country,
          }))
          cart.render()
        },
      })}
    </div>
    ${cart.getDutyTypes().map(name => html`
      <div class=${css('p025')}>
        ${renderDuty(name)}
      </div>
    `)}
    <div class=${css('row', 'justify-between', 'bold')}>
      <div class=${css('p05')}>Grand Total</div>
      <div class=${css('p05')}>${bus.numberFormat(cart.grandTotal(), 2)}</div>
    </div>
    <div class="${css('p05')}">
      <button
        ${state.working && `disabled` || ``}
        ${state.working && `data-loading` || ``}
        class=${css('button', 'button-primary')}
        onclick=${placeOrder}
      >Place Order</button>
    </div>
  </div>
`

function placeOrder() {
  const data = {
    products: cart.allProducts(),
    //shippingAddress: cart.getShippingAddress(),
    //shippingMethod: cart.getSelectedShippingMethod(),
    //paymentMethod: cart.getSelectedPaymentMethod(),
  }
  state.valid = data.shippingAddress && data.shippingMethod && data.paymentMethod && true || false
  state.validated = true
  if (state.valid) {
    state.working = true
    setTimeout(() => {
      state.working = false
      cart.render()
    }, 500)
    state.validated = false
  }
  cart.render()
}

}
