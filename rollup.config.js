import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import postcssDiscardComments from 'postcss-discard-comments'
import postcssDiscardDuplicates from 'postcss-discard-duplicates'
import cssnano from 'cssnano'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import inject from '@rollup/plugin-inject'

export default {
  input: 'src/app/index.js',
  output: {
    sourcemap: true,
    file: 'public/cart.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    postcss({
      inject: false,
      plugins: [
        postcssImport(),
        postcssPresetEnv({
          stage: 0,
        }),
        postcssDiscardComments(),
        postcssDiscardDuplicates(),
        cssnano({
          autoprefixer: false,
        }),
      ],
    }),
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
