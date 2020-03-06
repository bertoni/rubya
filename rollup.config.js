import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

export default {
  input: 'src/plugin.js',
  output: {
    name: 'Rubya',
    exports: 'named',
    sourcemap: false
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble({ objectAssign: true })
  ]
}
