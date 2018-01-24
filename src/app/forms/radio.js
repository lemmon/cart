const html = require('bel')
const assert = require('assert')
const css = require('../utils/css')

module.exports = (props) => {
  assert.equal(typeof props, 'object', 'radio: props should be an object')
  assert.equal(typeof props.name, 'string', `radio: name should be a string`)
  assert.equal(typeof props.checked, 'function', `radio: checked should be a function`)
  assert(typeof props.onchange === 'function' || !props.onchange, `radio: options should be a callback`)
  return html`
    <div class=${css('radio')}>
      <input
        type="radio"
        name=${props.name}
        class=${css('field')}
        onchange=${e => onchange(e, props)}
        ${props.checked() && `checked` || ``}
      >
      <div class=${css('radio-button', 'field-border')}></div>
    </div>
  `
}

function onchange(e, props) {
  if (typeof props.onchange === 'function') props.onchange()
}

/*
function el(target) {
  return target.closest(css.class('radio'))
}
*/
