const html = require('nanohtml')
const css = require('../../utils/css')
const {
  hasProducts,
} = require('../products')
const state = require('../state')
const renderEmpty = require('./empty')
const renderProducts = require('./products')
const renderOrder = require('./order')

module.exports = () => html`
  <div class=${css(true, state.open && `open`)}>
    <div class=${css('overlay')} onclick=${cart.hide}></div>
    <div class=${css('container', 'col')}>${hasProducts() && html`
      <div class=${css('slider', 'step' + state.step)}>
        ${renderProducts()}
        ${renderOrder()}
      </div>
    ` || renderEmpty()}</div>
  </div>
`
