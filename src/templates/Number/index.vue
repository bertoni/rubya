<template>
  <div class="child-template number-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">{{ translate('number') }}</span>)<span v-if="!hideTitle || !hideIdentification">: </span>
        <span v-if="!hideTitle" class="title">{{ internalData.title || translate('No title') }}</span> <span v-if="!hideTitle && !hideIdentification">|</span> <span v-if="!hideIdentification" class="id">{{ internalData.id || translate('No identification') }}</span>
      </p>
      <p v-if="!hideDescription">{{ internalData.description || 'No description' }}</p>
      <p v-if="!hideRules">{{ translate('Multiple of') }}: {{ showNumber(internalData.multipleOf) }}, {{ translate('Minimum or equal') }}: {{ showNumber(internalData.minimum) }},
        {{ translate('Minimum') }}: {{ showNumber(internalData.exclusiveMinimum) }}, {{ translate('Maximum or equal') }}: {{ showNumber(internalData.maximum) }},
        {{ translate('Maximum') }}: {{ showNumber(internalData.exclusiveMaximum) }}</p>
      <FloatingMenu
        :translate="translate"
        :showEdit="true"
        :showAdd="false"
        :showRemove="true"
        @edit="edit"
        @remove="remove" />
    </div>
    <NumberForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="form = false"
      @change="update"
      />
  </div>
</template>

<script>
import NumberType from '../../DataStructure/NumberType.js'
import NumberForm from './form.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'NumberTemplate',
  components: {
    NumberForm,
    FloatingMenu
  },
  props: {
    hideTitle: {
      type: Boolean,
      default: () => false
    },
    hideIdentification: {
      type: Boolean,
      default: () => false
    },
    hideDescription: {
      type: Boolean,
      default: () => false
    },
    hideRules: {
      type: Boolean,
      default: () => false
    },
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    translate: {
      type: Function,
      required: true
    },
    originalObject: {
      type: NumberType,
      required: true
    }
  },
  data () {
    return {
      form: false,
      internalData: {}
    }
  },
  methods: {
    showNumber (number) {
      return (typeof number === 'number') ? number : '-'
    },
    update (newData) {
      this.internalData = newData
      this.form = false
      this.$emit('change', this.internalData)
    },
    edit () {
      this.form = true
    },
    remove () {
      this.$emit('remove-me', this.internalData)
    }
  },
  mounted () {
    this.internalData = this.originalObject
  }
}
</script>
