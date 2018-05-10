const guid = require('../utils/guid')
const store = require('./store')

const duties = {}
const captions = {}
const data = load()

module.exports.addDuty = (name, duty) => {
  if (!duties[name]) {
    duties[name] = new Set
  }
  const ELLO = {
    id: duty.id || guid(),
    name: duty.name,
    _price: duty.price,
    price: parsePrice,
    countries: duty.countries,
    toJSON,
  }
  if (data[name] && data[name] === ELLO.id) {
    data[name] = ELLO
  }
  duties[name].add(ELLO)
}

module.exports.addDutyCaption = (name, caption) => {
  captions[name] = caption
}

module.exports.getDutyCaption = (name, caption) => (
  captions[name]
)

module.exports.getDutyTypes = () => (
  Object.keys(duties)
)

module.exports.getDuties = (name, country) => (
  Array.from(duties[name]).filter(item => (
    !country || !item.countries || item.countries.includes(country)
  ))
)

module.exports.setDuty = (name, duty) => {
  data[name] = duties[name] && duties[name].has(duty) && duty
  this.validateDuties()
}

module.exports.validateDuties = () => {
  const country = cart.getShipping().country
  for (const [name, duty] of Object.entries(data)) {
    if (country && duty.countries && !duty.countries.includes(country)) {
      delete data[name]
    }
  }
  save()
}

module.exports.getSelectedDuties = () => (
  data
)

module.exports.getSelectedDuty = (name) => (
  data[name]
)

function findById(name, id) {
  for (let item of duties[name]) {
    if (item.id === id) return item
  }
}

function toJSON() {
  return this.id
}

function parsePrice() {
  return typeof this._price === 'function' && this._price() || this._price
}

function save() {
  store.save('duties', data)
}

function load() {
  const data = store.load('duties') || {}
  return typeof data === 'object' && data || {}
}
