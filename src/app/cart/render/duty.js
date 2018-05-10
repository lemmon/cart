const html = require('nanohtml')
const bus = require('../../bus')
const css = require('../../utils/css')
const radio = require('../../forms/radio')
const state = require('../state')
const {
  getDuties,
  getSelectedDuty,
  setDuty,
} = require('../duties')

const renderDuty = (props) => (
  props.options.map(item => radio({
    name: props.name,
    caption: html`
      <div class=${css('span1', 'row', 'justify-between')}>
        <div class=${css('p025', 'lh')}><span class=${css(!props.disabled && 'a-ul')}>${item.name}</span></div>
        <div class=${css('p025', 'lh')}>${bus.numberFormat(item.price(), 2)}</div>
      </div>
    `,
    checked: props.selected === item.id,
    error: props.error,
    disabled: props.disabled,
    onchange: () => props.onchange(item),
  }))
)

module.exports = (name) => {
  const duty = getSelectedDuty(name)
  return renderDuty({
    name,
    options: getDuties(name, cart.getShipping().country),
    selected: duty && duty.id,
    disabled: !!state.working,
    error: state.validated && !duty,
    onchange: item => {
      setDuty(name, item)
      cart.render()
    },
  })
}
