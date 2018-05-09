const html = require('nanohtml')
const assert = require('assert')
const css = require('../utils/css')

module.exports = (props) => {
  assert(Array.isArray(props.options), `select: options should be an array`)
  assert(typeof props.onchange === 'function' || !props.onchange, `select: options should be a callback`)
  const value = props.value
  const selected = props.options.filter( item => item[0] === value )[0]
  return html`
    <div class=${css('select', !props.disabled && `a-anchor` || 'disabled', props.error && 'error')}>
      <select class=${css('field')} ${props.disabled && `disabled`} onchange=${e => onchange(e, props)}>
        <option></option>
        ${props.options.map(([ id, caption ]) => html`
          <option value=${id} ${id == value && `selected` || ``}>${caption}</option>
        `)}
      </select>
      <div class=${css('field-border', 'row')}>
        <div class=${css('span1', 'field-padding', 'pr0')}>
          <div class=${css('select-value')}>${selected && selected[1] || ``}</div>
          <div class=${css('select-placeholder', 'gray')}>${props.placeholder || ``}</div>
        </div>
        <div class=${css('field-padding', 'gray')}>↓</div>
      </div>
    </div>
  `
}

function el(target) {
  return target.closest(css.selector('select'))
}

function onchange(e, props) {
  const value = e.target.value
  const selected = props.options.filter( item => item[0] === value )[0]
  el(e.target).querySelector(css.selector('select-value')).innerHTML = selected && selected[1] || ``
  if (props.onchange) props.onchange(value)
}
