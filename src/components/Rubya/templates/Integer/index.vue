<template>
  <div class="child-template integer-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">integer</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Multiple of: {{ internalData.multipleOf || '-' }}, Minimum or equal: {{ internalData.minimum || '-' }}, Minimum: {{ internalData.exclusiveMinimum || '-' }}, Maximum or equal: {{ internalData.maximum || '-' }}, Maximum: {{ internalData.exclusiveMaximum || '-' }}</p>
      <div class="actions">
        <button class="edit" @click.prevent="edit"><img src="@/assets/ico-edit.svg" /></button>
        <button class="remove" @click.prevent="remove"><img src="@/assets/ico-trash.svg" /></button>
      </div>
    </div>
    <IntegerForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @close="form = false"
      @change="update"
      />
  </div>
</template>

<script>
import IntegerType from '../../dataStructure/IntegerType'
import IntegerForm from './form'

export default {
  name: 'IntegerTemplate',
  components: {
    IntegerForm
  },
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
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
