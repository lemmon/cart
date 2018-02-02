const html = require('bel')
const bus = require('../../bus')
const css = require('../../utils/css')
const select = require('../../forms/select')
const radio = require('../../forms/radio')
const renderProduct = require('./product')

const state = {}

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
    <div class="${css('p05')}">
      ${select({
        placeholder: `Country`,
        options: cart.allCountries(),
        value: cart.getShippingAddress().country,
        disabled: !!state.working,
        error: state.validated && !cart.getShippingAddress().country,
        onchange: (value) => {
          cart.setShippingAddress(Object.assign(cart.getShippingAddress(), {
            country: value,
          }))
          cart.setShippingMethod(false)
          cart.setPaymentMethod(false)
          cart.render()
        },
      })}
    </div>
    <div class=${css('p025')}>
      ${renderMethods({
        name: 'shippingMethod',
        methods: cart.getShippingMethods(),
        selected: cart.getSelectedShippingMethod(),
        disabled: !!state.working,
        error: state.validated && !cart.getSelectedShippingMethod(),
        onchange: (item) => {
          cart.setShippingMethod(item)
          cart.render()
        },
      })}
    </div>
    <div class=${css('p025')}>
      ${renderMethods({
        name: 'paymentMethod',
        methods: cart.getPaymentMethods(),
        selected: cart.getSelectedPaymentMethod(),
        disabled: !!state.working,
        error: state.validated && !cart.getSelectedPaymentMethod(),
        onchange: (item) => {
          cart.setPaymentMethod(item)
          cart.render()
        },
      })}
    </div>
    <div class=${css('row', 'justify-between', 'bold')}>
      <div class=${css('p05')}>Grand Total</div>
      <div class=${css('p05')}>${bus.numberFormat(cart.grandTotal(), 2)}</div>
    </div>
    <div class="${css('p05')}">
      <button ${state.working && `disabled` || ``} ${state.working && `data-loading` || ``} class=${css('button', 'button-primary')} onclick=${placeOrder}>Place Order</button>
    </div>
  </div>
`

function placeOrder() {
  const data = {
    products: cart.allProducts(),
    shippingAddress: cart.getShippingAddress(),
    shippingMethod: cart.getSelectedShippingMethod(),
    paymentMethod: cart.getSelectedPaymentMethod(),
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

function renderMethods(props) {
  return props.methods.map(item => radio({
    name: props.name,
    caption: html`
      <div class=${css('span1', 'row', 'justify-between')}>
        <div class=${css('p025', 'lh')}><span class=${css(!props.disabled && 'a-ul')}>${item.name}</span></div>
        <div class=${css('p025', 'lh')}>${bus.numberFormat(item.price, 2)}</div>
      </div>
    `,
    checked: props.selected && props.selected.id === item.id,
    error: props.error,
    disabled: props.disabled,
    onchange: () => props.onchange(item),
  }))
}
