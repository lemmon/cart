const guid = require('../utils/guid')
const store = require('./store')
const {
  validateDuties,
} = require('./duties')

const data = load()
const params = [
  'name',
  'street',
  'city',
  'zip',
  'country'
]

module.exports.setShipping = (data) => {
  Object.assign(data, {
    name: data.name,
    street: data.street,
    city: data.city,
    zip: data.zip,
    country: data.country,
  })
  validateDuties()
  save()
}

module.exports.getShipping = () => (
  data
)

function save() {
  store.save('shipping', data)
}

function load() {
  const data = store.load('shipping') || {}
  return typeof data === 'object' && data || {}
}
