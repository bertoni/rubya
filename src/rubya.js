import Rubya from './index.vue'

export default {
  ...Rubya,
  install: vue => vue.component(Rubya.name, Rubya)
}
