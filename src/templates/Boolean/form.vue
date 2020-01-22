<template>
  <div class="form-template">
    <h3>Boolean</h3>
    <form class="form-object">
      <input v-if="allowChangeName" type="text" v-model="internalData.name" placeholder="Name" :class="(fieldsWithError.name ? 'error' : '')" />
      <textarea v-model="internalData.description" placeholder="Description"></textarea>
      <input type="text" v-model="internalData.id" placeholder="Identification" />
      <input type="text" v-model="internalData.title" placeholder="Title" />
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">save</button>
      <button class="cancel" @click.prevent="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import BooleanType from '../../DataStructure/BooleanType.js'

export default {
  name: 'BooleanForm',
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    originalObject: {
      type: BooleanType,
      required: true
    }
  },
  data () {
    return {
      fieldsWithError: {
        name: false
      },
      internalData: {}
    }
  },
  methods: {
    save () {
      for (let idx in this.fieldsWithError) {
        this.fieldsWithError[idx] = false
      }
      if (this.allowChangeName && !this.internalData.name.length) {
        this.fieldsWithError.name = true
        return false
      }
      this.$emit('change', new BooleanType(this.internalData, this.internalData.name))
    },
    cancel () {
      this.$emit('close')
    }
  },
  mounted () {
    this.internalData = { ...this.originalObject }
  }
}
</script>
