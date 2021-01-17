const svgNS = 'http://www.w3.org/2000/svg'

export default (node, props, ...children) => {
  // props
  const { class: $class, style: $style, ...$props } = props || {}
  // create element
  const el =
    typeof node !== 'string'
      ? node($props)
      : svgTags.includes(node)
      ? document.createElementNS(svgNS, node)
      : document.createElement(node)
  if (!el) return
  // class
  if ($class) {
    el.classList.add(
      ...(Array.isArray($class)
        ? $class.filter((x) => !!x)
        : $class.trim().split(/\s+/))
    )
  }
  // style
  if (typeof $style === 'string') {
    el.style = $style
  } else if ($style) {
    Object.assign(el.style, $style)
  }
  // props
  if ($props) {
    Object.entries($props).forEach(([key, val]) => {
      if (key.charAt(0) === '$') {
        el[key.substr(1)] = val
      } else if (key.substr(0, 2) === 'on') {
        el[key] = val
      } else if (typeof val === 'boolean') {
        el.toggleAttribute(key, val)
      } else if (val && typeof val !== 'object' && typeof val !== 'function') {
        el.setAttribute(key, val)
      }
    })
  }
  // children
  children.flat().forEach((child) => {
    if (!child && typeof child !== 'number') return
    el.appendChild(
      typeof child === 'object' ? child : document.createTextNode(child)
    )
  })
  // return element
  return el
}

const svgTags = [
  'svg',
  'altGlyph',
  'altGlyphDef',
  'altGlyphItem',
  'animate',
  'animateColor',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'color-profile',
  'cursor',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'font',
  'font-face',
  'font-face-format',
  'font-face-name',
  'font-face-src',
  'font-face-uri',
  'foreignObject',
  'g',
  'glyph',
  'glyphRef',
  'hkern',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'missing-glyph',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'set',
  'stop',
  'switch',
  'symbol',
  'text',
  'textPath',
  'title',
  'tref',
  'tspan',
  'use',
  'view',
  'vkern',
]
