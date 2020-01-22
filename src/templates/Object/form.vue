<template>
  <div class="form-template">
    <h3>Object</h3>
    <form class="form-object" @submit.prevent="save">
      <input v-if="allowChangeName" type="text" name="name" v-model="internalData.name" placeholder="Name" :class="(fieldsWithError.name ? 'error' : '')" />
      <textarea v-model="internalData.description" placeholder="Description"></textarea>
      <input type="text" name="identification" v-model="internalData.id" placeholder="Identification" />
      <input type="text" name="title" v-model="internalData.title" placeholder="Title" />
      <select v-model="internalData.additionalProperties">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <input type="number" v-model="internalData.minProperties" placeholder="Minimum properties" />
      <input type="number" v-model="internalData.maxProperties" placeholder="Maximum length" />
      <textarea v-model="requiredChildren" placeholder="Required children"></textarea>
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">save</button>
      <button class="cancel" @click.prevent="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import ObjectType from '../../DataStructure/ObjectType.js'

export default {
  name: 'ObjectForm',
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    originalObject: {
      type: ObjectType,
      required: true
    }
  },
  data () {
    return {
      fieldsWithError: {
        name: false
      },
      internalData: {},
      requiredChildren: ''
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
      if (this.requiredChildren.length) {
        this.internalData.required = this.requiredChildren.split(',')
      } else {
        this.internalData.required = []
      }
      this.$emit('change', new ObjectType(this.internalData, this.internalData.name))
    },
    cancel () {
      this.$emit('close')
    }
  },
  mounted () {
    this.internalData = { ...this.originalObject }
    this.requiredChildren = this.internalData.required.join(',')
  }
}
</script>
