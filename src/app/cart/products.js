const md5 = require('md5')
const store = require('./store')
const state = require('./state')

const products = loadProducts()

function allProducts() {
  return Array.from(products)
}

function hasProducts() {
  return !!products.size
}

function createProduct(props) {
  products.add(props)
  return props
}

function addProduct(props) {
  const id = props.id
  const name = typeof props.name === 'string' && props.name.trim() || 'unknown product'
  const price = parseNumber(props.price, 0)
  const count = parseNumber(props.count, 1)
  const hash = md5(`${id}|${name}|${price}`)
  const product = findProductByHash(hash) || createProduct({
    id,
    name,
    price,
    count: 0,
    increment: 1,
    hash,
  })
  product.count += count
  product.total = product.count * product.price
  saveProducts()
  return product
}

function increaseProductCount(product, increment) {
  if (!increment) increment = product.increment
  product.count += increment
  product.total = product.count * product.price
  saveProducts()
}

function decreaseProductCount(product, increment) {
  if (!increment) increment = product.increment
  product.count = product.count > increment * 2 ? product.count - increment : increment
  product.total = product.count * product.price
  saveProducts()
}

function removeProduct(product) {
  products.delete(product)
  saveProducts()
}

function findProductByHash(hash) {
  for (const item of products) {
    if (item.hash === hash) {
      return item
    }
  }
}

function productsCount() {
  let n = 0
  for (const item of products) {
    n += item.count
  }
  return n
}

function productsTotal() {
  let x = 0
  for (const item of products) {
    x += item.total
  }
  return x
}

function loadProducts() {
  try {
    const products = store.load('products')
    return Array.isArray(products) && new Set(products) || new Set
  } catch (e) {
    return new Set
  }
}

function saveProducts() {
  store.save('products', allProducts())
}

module.exports = {
  allProducts,
  hasProducts,
  addProduct,
  increaseProductCount,
  decreaseProductCount,
  removeProduct,
  findProductByHash,
  productsCount,
  productsTotal,
}

function parseNumber(input, def) {
  const num = Number(input)
  return Number.isNaN(num) ? def : num
}
