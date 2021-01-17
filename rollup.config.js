import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import inject from '@rollup/plugin-inject'

export default {
  input: 'src/app/index.js',
  output: {
    sourcemap: true,
    file: 'develop/cart.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      plugins: [
        ['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }],
      ],
    }),
    commonjs(),
    inject({
      createElement: path.resolve('src/rege/createElement.js'),
    }),
  ],
}
