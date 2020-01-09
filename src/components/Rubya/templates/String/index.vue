<template>
  <div class="child-template string-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">string</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Minimum length: {{ internalData.minLength || '-' }}, Maximum length: {{ internalData.maxLength || '-' }}, Pattern: {{ internalData.pattern || '-' }}, Format: {{ internalData.format || '-' }}</p>
      <div class="actions">
        <button class="edit" @click.prevent="edit"><img src="@/assets/ico-edit.svg" /></button>
        <button class="remove" @click.prevent="remove"><img src="@/assets/ico-trash.svg" /></button>
      </div>
    </div>
    <StringForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @close="form = false"
      @change="update"
      />
  </div>
</template>

<script>
import StringType from '../../dataStructure/StringType'
import StringForm from './form'

export default {
  name: 'StringTemplate',
  components: {
    StringForm
  },
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
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
    update (newData) {
      this.internalData = newData
      this.form = false
    },
    edit () {
      this.form = true
    },
    remove () {
      this.$emit('removeMe', this.internalData)
    }
  },
  mounted () {
    this.internalData = this.originalObject
  }
}
</script>
