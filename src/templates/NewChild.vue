<template>
  <div class="new-child">
    <form class="options">
      <label><input ref="booleanElement" type="radio" name="type" value="boolean" @change="changeType('boolean')" /> {{ translate('Boolean') }}</label>
      <label><input ref="stringElement" type="radio" name="type" value="string" @change="changeType('string')" /> {{ translate('String') }}</label>
      <label><input ref="integerElement" type="radio" name="type" value="integer" @change="changeType('integer')" /> {{ translate('Integer') }}</label>
      <label><input ref="numberElement" type="radio" name="type" value="number" @change="changeType('number')" /> {{ translate('Number') }}</label>
      <label><input ref="objectElement" type="radio" name="type" value="object" @change="changeType('object')" /> {{ translate('Object') }}</label>
      <label><input ref="arrayElement" type="radio" name="type" value="array" @change="changeType('array')" /> {{ translate('Array') }}</label>
    </form>
    <BooleanForm
      v-if="type === 'boolean'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="cancel"
      @change="save"
      />
    <StringForm
      v-if="type === 'string'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="cancel"
      @change="save"
      />
    <IntegerForm
      v-if="type === 'integer'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="cancel"
      @change="save"
      />
    <NumberForm
      v-if="type === 'number'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="cancel"
      @change="save"
      />
    <ObjectForm
      v-if="type === 'object'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="cancel"
      @change="save"
      />
    <ArrayForm
      v-if="type === 'array'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="cancel"
      @change="save"
      />
  </div>
</template>

<script>
import DataStructureFactory from '../DataStructure/DataStructureFactory.js'
import BooleanForm from './Boolean/form.vue'
import StringForm from './String/form.vue'
import IntegerForm from './Integer/form.vue'
import NumberForm from './Number/form.vue'
import ObjectForm from './Object/form.vue'
import ArrayForm from './Array/form.vue'

export default {
  name: 'NewChild',
  components: {
    BooleanForm,
    StringForm,
    IntegerForm,
    NumberForm,
    ObjectForm,
    ArrayForm
  },
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    translate: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      type: null,
      internalData: {}
    }
  },
  methods: {
    changeType (type) {
      this.internalData = DataStructureFactory.create({ 'type': type }, null)
      this.type = type
    },
    save (newData) {
      this.$emit('save', DataStructureFactory.create(newData, newData.name))
      this.cancel()
    },
    cancel () {
      this.type = null
      this.internalData = {}
      this.$refs.booleanElement.checked = false
      this.$refs.stringElement.checked = false
      this.$refs.integerElement.checked = false
      this.$refs.numberElement.checked = false
      this.$refs.objectElement.checked = false
      this.$refs.arrayElement.checked = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.new-child {
  border: 1px solid #c1c1c1;
  padding: 5px 15px;
}
form.options {
  margin: 12px 0 30px;
}
form.options label {
  margin-right: 15px;
}
</style>
