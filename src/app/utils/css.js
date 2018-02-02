const css = (...arr) => arr.filter( c => !!c ).map( css.className ).join(' ')

css.className = (name) => `cart--${name}`

css.selector = (name) => `.${css.className(name)}`

module.exports = css
