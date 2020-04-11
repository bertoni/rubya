<template>
  <div class="child-template integer-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">{{ translate('integer') }}</span>): <span class="title">{{ internalData.title || translate('No title') }}</span> | <span class="id">{{ internalData.id || translate('No identification') }}</span>
      </p>
      <p>{{ internalData.description || translate('No description') }}</p>
      <p>{{ translate('Multiple of') }}: {{ showNumber(internalData.multipleOf) }}, {{ translate('Minimum or equal') }}: {{ showNumber(internalData.minimum) }},
        {{ translate('Minimum') }}: {{ showNumber(internalData.exclusiveMinimum) }}, {{ translate('Maximum or equal') }}: {{ showNumber(internalData.maximum) }},
        {{ translate('Maximum') }}: {{ showNumber(internalData.exclusiveMaximum) }}</p>
      <FloatingMenu
        :showEdit="true"
        :showAdd="false"
        :showRemove="true"
        @edit="edit"
        @remove="remove" />
    </div>
    <IntegerForm
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
import IntegerType from '../../DataStructure/IntegerType.js'
import IntegerForm from './form.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'IntegerTemplate',
  components: {
    IntegerForm,
    FloatingMenu
  },
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    translate: {
      type: Function,
      required: true
    },
    originalObject: {
      type: IntegerType,
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
