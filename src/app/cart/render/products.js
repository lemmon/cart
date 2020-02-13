const html = require('nanohtml')
const bus = require('../../bus')
const css = require('../../utils/css')
const heading = require('../../partials/heading')
const state = require('../state')
const i18n = require('../i18n')
const renderProduct = require('./product')

module.exports = () => html`
  <div class=${css('col')}>
    <div class=${css('span1', 'col', 'p05')}>
      <div class="${css('p05')}">
        <button
          type=button
          class=${css('button', 'button-faded')}
          onclick=${(e) => {
            e.preventDefault()
            cart.hide()
          }}
        >${i18n.t('action.shopping.continue')}</button>
      </div>
      ${heading(i18n.t('caption.products'))}
      <div class=${css('span1', 'p025')}>
        ${cart.allProducts().map(renderProduct)}
      </div>
      ${heading(i18n.t('caption.summary'))}
      <div class=${css('row', 'justify-between', 'bold', 'mb05')}>
        <div class=${css('p05')}>${i18n.t('caption.products.total')}</div>
        <div class=${css('p05')}>${bus.numberFormat(cart.productsTotal(), 2)}</div>
      </div>
      <div class="${css('p05')}">
        <button
          type=submit
          class=${css('button')}
          onclick=${(e) => {
            e.preventDefault()
            cart.render()
          }}
        >${i18n.t('action.checkout')}</button>
      </div>
    </div>
  </div>
`
