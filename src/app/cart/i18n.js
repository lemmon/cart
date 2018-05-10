const phrases = require('../i18n/en_US.js')
const data = {
  plural: n => n !== 1 && 1 || 0,
}

module.exports.t = (name, fallback) => (
  phrases[name] || fallback
)

module.exports.plural = (cb) => {
  data.plural = cb
}

module.exports.translate = (newPhrases) => {
  Object.assign(phrases, newPhrases)
}
