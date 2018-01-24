const assert = require('assert')
const guid = require('../utils/guid')
const store = require('./store')

const data = loadData()
const methods = new Set()

module.exports.addPaymentMethod = (method) => {
  methods.add({
    id: method.id || guid(),
    name: method.name,
    price: method.price,
    countries: method.countries,
  })
}

module.exports.getPaymentMethods = () => {
  return Array.from(methods)
}

module.exports.setPaymentMethod = (method) => {
  data.method = method && methods.has(method) && method || null
  saveData()
}

module.exports.getSelectedPaymentMethod = () => {
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

function saveData(overwrite) {
  store.save('payment', Object.assign({
    method: data.method && data.method.id,
  }, overwrite))
}

function loadData() {
  const data = store.load('payment') || {}
  return {
    method: typeof data.method === 'string' && data.method || null,
  }
}
