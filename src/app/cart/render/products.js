const html = require('bel')
const bus = require('../../bus')
const css = require('../../utils/css')
const select = require('../../forms/select')
const radio = require('../../forms/radio')
const renderProduct = require('./product')

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
        onchange: (value) => {
          cart.setShippingAddress(Object.assign(cart.getShippingAddress(), {
            country: value,
          }))
          cart.render()
        },
      })}
    </div>
    <div class=${css('p025')}>
      ${renderShippingMethods()}
    </div>
    <div class=${css('p025')}>
      ${renderPaymentMethods()}
    </div>
    <div class=${css('row', 'justify-between', 'bold')}>
      <div class=${css('p05')}>Grand Total</div>
      <div class=${css('p05')}>${bus.numberFormat(cart.grandTotal(), 2)}</div>
    </div>
    <div class="${css('p05')}">
      <button class=${css('button', 'button-primary')}>Place Order</button>
    </div>
  </div>
`

function renderShippingMethods() {
  const method = cart.getSelectedShippingMethod()
  return cart.getShippingMethods().map(item => html`
    <div class=${css('row', 'justify-between')}>
      <label class=${css('span1', 'row', 'anchor')}>
        <div class=${css('p025')}>${radio({
          name: 'shippingMethod',
          checked: () => method && method.id === item.id,
          onchange: () => {
            cart.setShippingMethod(item)
            cart.render()
          },
        })}</div>
        <div class=${css('p025', 'lh')}><span class=${css('anchor-ul')}>${item.name}</span></div>
      </label>
      <div class=${css('p025', 'lh')}>${bus.numberFormat(item.price, 2)}</div>
    </div>
  `)
}

function renderPaymentMethods() {
  const method = cart.getSelectedPaymentMethod()
  return cart.getPaymentMethods().map(item => html`
    <div class=${css('row', 'justify-between')}>
      <label class=${css('span1', 'row', 'anchor')}>
        <div class=${css('p025')}>${radio({
          name: 'paymentMethod',
          checked: () => method && method.id === item.id,
          onchange: () => {
            cart.setPaymentMethod(item)
            cart.render()
          },
        })}</div>
        <div class=${css('p025', 'lh')}><span class=${css('anchor-ul')}>${item.name}</span></div>
      </label>
      <div class=${css('p025', 'lh')}>${bus.numberFormat(item.price, 2)}</div>
    </div>
  `)
}
