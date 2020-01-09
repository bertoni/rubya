<template>
  <div class="form-template">
    <h3>Number</h3>
    <form class="form-object">
      <input v-if="allowChangeName" type="text" v-model="internalData.name" placeholder="Name" :class="(fieldsWithError.name ? 'error' : '')" />
      <textarea v-model="internalData.description" placeholder="Description"></textarea>
      <input type="text" v-model="internalData.id" placeholder="Identification" />
      <input type="text" v-model="internalData.title" placeholder="Title" />
      <input type="number" v-model="internalData.multipleOf" placeholder="Multiple of" />
      <input type="number" v-model="internalData.minimum" placeholder="Minimum or equal" />
      <input type="number" v-model="internalData.exclusiveMinimum" placeholder="Minimum" />
      <input type="number" v-model="internalData.maximum" placeholder="Maximum or equal" />
      <input type="number" v-model="internalData.exclusiveMaximum" placeholder="Maximum" />
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">save</button>
      <button class="cancel" @click.prevent="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import NumberType from '../../dataStructure/NumberType'

export default {
  name: 'NumberForm',
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    originalObject: {
      type: NumberType,
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
