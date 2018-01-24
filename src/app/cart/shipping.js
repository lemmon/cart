const assert = require('assert')
const guid = require('../utils/guid')
const store = require('./store')

const data = loadData()
const addressParams = [
  'name',
  'street',
  'city',
  'zip',
  'country'
]
const methods = new Set()

module.exports.addShippingMethod = (method) => {
  methods.add({
    id: method.id || guid(),
    name: method.name,
    price: method.price,
    countries: method.countries,
  })
}

module.exports.getShippingMethods = () => {
  return Array.from(methods)
}

module.exports.setShippingMethod = (method) => {
  data.method = method && methods.has(method) && method || null
  saveData()
}

module.exports.getSelectedShippingMethod = () => {
  return typeof data.method === 'string' && findMethodById(data.method)
    || typeof data.method === 'object' && methods.has(data.method) && data.method
    || saveData({ method: null }) || null
}

function findMethodById(id) {
  for (const item of methods) {
    if (id === item.id) {
      return item
    }
  }
}

module.exports.setShippingAddress = (address) => {
  assert.equal(typeof address, 'object', 'shipping addres: address should be an object')
  addressParams.forEach(param => {
    if (address[param]) assert.equal(typeof address[param], 'string', `shipping addres: ${param} should be a string`)
  })
  Object.assign(data.address, {
    name: address.name,
    street: address.street,
    city: address.city,
    zip: address.zip,
    country: address.country,
  })
  saveData()
}

module.exports.getShippingAddress = () => {
  return data.address
}

module.exports.getShippingCountry = () => {
  return data.address.country
}

function saveData(overwrite) {
  store.save('shipping', Object.assign({
    address: data.address,
    method: data.method && data.method.id,
  }, overwrite))
}

function loadData() {
  const data = store.load('shipping') || {}
  return {
    address: typeof data.address === 'object' && data.address || {},
    method: typeof data.method === 'string' && data.method || null,
  }
}
