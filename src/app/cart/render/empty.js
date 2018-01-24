const html = require('bel')
const css = require('../../utils/css')

module.exports = () => html`
  <div class=${css('span1', 'col', 'justify-center', 'p1')}>
    <p class=${css('ac')}>shopping cart is empty</p>
  </div>
`
