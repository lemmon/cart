const i18n = require('../i18n')

module.exports.number = (num, dec = 0) => (
  num
    .toFixed(dec)
    .replace('.', i18n.t('number.decimalPoint'))
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + i18n.t('number.thousandsSeparator'))
)
