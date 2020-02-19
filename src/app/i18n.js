const phrases = require('./i18n/en_US.js')

module.exports.t = (name, ...args) => (
  phrases[name].replace(/%(\d+)/g, (str, p1) => (
    args[parseInt(p1) - 1]
  ))
)

module.exports.translate = (newPhrases) => {
  Object.assign(phrases, newPhrases)
}
