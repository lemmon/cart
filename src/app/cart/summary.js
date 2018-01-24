module.exports.grandTotal = () => {
  const [
    products,
    shipping,
    payment,
  ] = [
    cart.productsTotal(),
    cart.getSelectedShippingMethod(),
    cart.getSelectedPaymentMethod(),
  ]
  return products + calc(shipping) + calc(payment)
}

function calc(item) {
  if (!item) {
    return 0
  } else if (typeof item.price === 'number') {
    return item.price
  } else if (typeof item.price === 'function') {
    return item.price()
  }
}
