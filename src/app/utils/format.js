import { t } from '../i18n'

export function number(num, dec = 0) {
  return num
    .toFixed(dec)
    .replace('.', t('number.decimalPoint'))
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + t('number.thousandsSeparator'))
}
