const html = require('nanohtml')
const css = require('../utils/css')

module.exports = caption => caption && html`
  <div class=${css('ac', 'row', 'items-center', 'heading', 'gray')}>
    <div class=${css('p05', 'span1', 'div')}></div>
    <div class=${css('p05')}>${caption}</div>
    <div class=${css('p05', 'span1', 'div')}></div>
  </div>
` || ``
