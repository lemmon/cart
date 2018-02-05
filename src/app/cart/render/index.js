const html = require('bel')
const css = require('../../utils/css')
const {
  hasProducts,
} = require('../products')
const state = require('../state')
const renderEmpty = require('./empty')
const renderProducts = require('./products')

function render() {
  return html`
    <div class=${css(true, state.open && `open`)}>
      <div class=${css('overlay')} onclick=${cart.hide}></div>
      <div class=${css('container')}>${hasProducts() && renderProducts() || renderEmpty()}</div>
    </div>
  `
}

module.exports = render
