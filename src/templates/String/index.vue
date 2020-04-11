<template>
  <div class="child-template string-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">{{ translate('string') }}</span>): <span class="title">{{ internalData.title || translate('No title') }}</span> | <span class="id">{{ internalData.id || translate('No identification') }}</span>
      </p>
      <p>{{ internalData.description || translate('No description') }}</p>
      <p>{{ translate('Minimum length') }}: {{ showNumber(internalData.minLength) }}, {{ translate('Maximum length') }}: {{ showNumber(internalData.maxLength) }},
        {{ translate('Pattern') }}: {{ internalData.pattern || '-' }}, {{ translate('Format') }}: {{ internalData.format || '-' }}</p>
      <FloatingMenu
        :showEdit="true"
        :showAdd="false"
        :showRemove="true"
        @edit="edit"
        @remove="remove" />
    </div>
    <StringForm
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
import StringType from '../../DataStructure/StringType.js'
import StringForm from './form.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'StringTemplate',
  components: {
    StringForm,
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
      type: StringType,
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
