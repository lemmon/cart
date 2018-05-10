const html = require('nanohtml')
const css = require('../utils/css')

module.exports = caption => caption && html`
  <div class=${css('p05', 'ac')}>
    -- ${caption} --
  </div>
` || ``
