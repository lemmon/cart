const html = require('bel')
const assert = require('assert')
const css = require('../utils/css')

module.exports = (props) => {
  assert.equal(typeof props, 'object', 'radio: props should be an object')
  assert.equal(typeof props.name, 'string', `radio: name should be a string`)
  assert(typeof props.onchange === 'function' || !props.onchange, `radio: options should be a callback`)
  return html`
    <label class=${css('label', 'row', !props.disabled && 'a-anchor' || 'disabled', props.error && 'error')}>
      <div class=${css('p025')}>
        <div class=${css('radio')}>
          <input
            type="radio"
            name=${props.name}
            class=${css('field')}
            onchange=${e => onchange(e, props)}
            ${props.checked && `checked` || ``}
            ${props.disabled && `disabled` || ``}
          >
          <div class=${css('radio-button', 'field-border')}></div>
        </div>
      </div>
      ${typeof props.caption === 'string' && html`<div class=${css('p025', 'lh')}>${props.caption}</div>` || props.caption}
    </label>
  `
}

function onchange(e, props) {
  if (typeof props.onchange === 'function') props.onchange()
}
