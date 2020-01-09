<template>
  <div class="form-template">
    <h3>Array</h3>
    <form class="form-object" @submit.prevent="save">
      <input v-if="allowChangeName" type="text" name="name" v-model="internalData.name" placeholder="Name" :class="(fieldsWithError.name ? 'error' : '')" />
      <textarea v-model="internalData.description" placeholder="Description"></textarea>
      <input type="text" name="identification" v-model="internalData.id" placeholder="Identification" />
      <input type="text" name="title" v-model="internalData.title" placeholder="Title" />
      <select v-model="internalData.additionalItems">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <select v-model="internalData.uniqueItems">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <input type="number" v-model="internalData.minItems" placeholder="Minimum items" />
      <input type="number" v-model="internalData.maxItems" placeholder="Maximum items" />
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">save</button>
      <button class="cancel" @click.prevent="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import ArrayType from '../../dataStructure/ArrayType'

export default {
  name: 'ArrayForm',
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    originalObject: {
      type: ArrayType,
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
      this.$emit('change', this.internalData)
    },
    cancel () {
      this.$emit('close')
    }
  },
  mounted () {
    this.internalData = {...this.originalObject}
  }
}
</script>
