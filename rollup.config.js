// Rollup plugins
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.browser, format: 'umd', name: 'mapboxUtils' },
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  sourceMap: 'inline',
  plugins: [
    postcss({
      extensions: ['.css']
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
