const html = require('nanohtml')
const css = require('../utils/css')

module.exports = caption => html`
  <div class=${css('ac', 'row', 'items-center', 'heading', 'gray')}>
    <div class=${css('p05', 'span1', 'div')}></div>
    <div class=${css('p05')}>${caption || html`\u00B7`}</div>
    <div class=${css('p05', 'span1', 'div')}></div>
  </div>
`
