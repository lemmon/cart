const bus = {
  numberFormat: (num, dec = 0) => num.toFixed(dec),
  unitFormat: (price) => `${price} each`,
}

module.exports = bus
