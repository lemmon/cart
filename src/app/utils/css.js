const css = (...arr) => arr.filter( c => !!c ).map( css.className ).join(' ')
const prefix = `cart`

css.className = (name) => name === true && prefix || `${prefix}--${name}`

css.selector = (name) => `.${css.className(name)}`

module.exports = css
