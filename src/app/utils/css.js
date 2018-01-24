const css = (...arr) => arr.map(c => 'cart--' + c).join(' ')

css.class = (name) => `.cart--${name}`

module.exports = css
