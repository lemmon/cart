import phrases from './i18n/default.js'

export function t(name, ...args) {
  return phrases[name].replace(/%(\d+)/g, (str, p1) => args[parseInt(p1) - 1])
}

export function translate(newPhrases) {
  Object.assign(phrases, newPhrases)
}

export default {
  t,
  translate,
}
