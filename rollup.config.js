import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
// import resolve from 'rollup-plugin-node-resolve'
// import babel from 'rollup-plugin-babel'
// import image from 'rollup-plugin-image'

export default {
  input: 'src/plugin.js',
  output: {
    name: 'Rubya',
    exports: 'named',
    sourcemap: false
  },
  plugins: [
    // resolve({ extensions: ['.js'] }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    // babel(),
    buble({ objectAssign: true })
    // image()
  ]
}
