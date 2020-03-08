import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

export default {
  input: 'src/plugin.js',
  // inlineDynamicImports: true,
  output: {
    name: 'Rubya',
    exports: 'named',
    sourcemap: false
  },
  external: [
    'vue',
    'core-js'
  ],
  plugins: [
    commonjs({
      sourceMap: false,
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      runtimeHelpers: true
    }),
    buble({ objectAssign: true })
  ]
}
