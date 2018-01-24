const prefix = 'cart'
const store = localStorage

module.exports.load = (name) => {
  try {
    return JSON.parse(store.getItem(`${prefix}.${name}`))
  } catch (e) {
    return null
  }
}

module.exports.save = (name, data) => {
  store.setItem(`${prefix}.${name}`, JSON.stringify(data))
}
