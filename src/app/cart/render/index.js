const html = require('bel')
const css = require('../../utils/css')
const {
  hasProducts,
} = require('../products')
const renderEmpty = require('./empty')
const renderProducts = require('./products')

function render() {
  return html`
    <div class="cart">
      ${hasProducts() && renderProducts() || renderEmpty()}
    </div>
  `
}

module.exports = render
