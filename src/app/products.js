import md5 from 'md5'
import { load, save } from './store'

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
  const sku = props.sku
  const name =
    (typeof props.name === 'string' && props.name.trim()) || 'unknown product'
  const price = parseNumber(props.price, 0)
  const count = parseNumber(props.count, 1)
  const variantStr = props.variant
    ?.reduce((acc, { name, value }) => acc.push(`${name}=${value}`) && acc, [])
    .join('&')
  const hash = md5(`${sku || id || name}|${variantStr}|${price}`)
  const product =
    findProductByHash(hash) ||
    createProduct({
      id,
      sku,
      name,
      price,
      variant: props.variant,
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
  product.count =
    product.count > increment * 2 ? product.count - increment : increment
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
    const products = load('products')
    return (Array.isArray(products) && new Set(products)) || new Set()
  } catch (e) {
    return new Set()
  }
}

function saveProducts() {
  save('products', allProducts())
}

export default {
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
