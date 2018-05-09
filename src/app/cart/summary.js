const {
  productsTotal,
} = require('./products')
const {
  getSelectedDuties,
} = require('./duties')

module.exports.grandTotal = () => {
  return productsTotal()
    + Object.values(getSelectedDuties()).reduce((x, item) => (
        x + item.price()
      ), 0)
}
