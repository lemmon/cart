const prefix = 'cart'
const store = localStorage

export function load(name) {
  try {
    return JSON.parse(store.getItem(`${prefix}.${name}`))
  } catch (e) {
    return null
  }
}

export function save(name, data) {
  store.setItem(`${prefix}.${name}`, JSON.stringify(data))
}
