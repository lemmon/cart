const html = require('nanohtml')
const bus = require('../../bus')
const css = require('../../utils/css')
const heading = require('../../partials/heading')
const select = require('../../forms/select')
const state = require('../state')
const i18n = require('../i18n')
const renderDuty = require('./duty')

module.exports = () => html`
  <div class=${css('col', 'p05')}>
    <div class="${css('p05')}">
      <button
        class=${css('button', 'button-faded')}
        onclick=${(e) => {
          e.preventDefault()
          state.step--
          cart.render()
        }}
      >${i18n.t('action.back')}</button>
    </div>
    <div class="${css('span1')}">
      ${heading(i18n.t('caption.address'))}
      <div class="${css('p025')}">
        ${select({
          placeholder: i18n.t('caption.country'),
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
        <div>
          ${heading(i18n.t(`duty.${name}`))}
          <div class=${css('p025')}>
            ${renderDuty(name)}
          </div>
        </div>
      `)}
    </div>
    ${heading(i18n.t('caption.summary'))}
    <div class=${css('row', 'justify-between', 'bold', 'mb05')}>
      <div class=${css('p05')}>${i18n.t('caption.order.total')}</div>
      <div class=${css('p05')}>${bus.numberFormat(cart.grandTotal(), 2)}</div>
    </div>
    <div class="${css('p05')}">
      <button
        ${state.working && `disabled` || ``}
        ${state.working && `data-loading` || ``}
        class=${css('button', 'button-primary')}
        onclick=${placeOrder}
      >${i18n.t('action.order.place')}</button>
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
    dispatch('order', data).then(() => {
      state.working = false
      cart.render()
    })
    state.validated = false
  }
  cart.render()
}

function dispatch(name, data) {
  return fetch('order.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ name, data }),
    credentials: 'include',
  }).then(res => (
    res.json()
  )).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
}
