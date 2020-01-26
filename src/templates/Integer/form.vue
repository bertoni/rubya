<template>
  <div class="form-template">
    <h3>Integer</h3>
    <form class="form-object">
      <fieldset v-if="allowChangeName">
        <label for="name" class="fieldplaceholder">Name</label>
        <input type="text" name="name" id="name" v-model="internalData.name" :class="(fieldsWithError.name ? 'error' : '')" />
      </fieldset>
      <fieldset>
        <label for="description" class="fieldplaceholder">Description</label>
        <textarea name="description" id="description" v-model="internalData.description"></textarea>
      </fieldset>
      <fieldset>
        <label for="id" class="fieldplaceholder">Identification</label>
        <input type="text" name="id" id="id" v-model="internalData.id" />
      </fieldset>
      <fieldset>
        <label for="title" class="fieldplaceholder">Title</label>
        <input type="text" name="title" id="title" v-model="internalData.title" />
      </fieldset>
      <fieldset>
        <label for="multipleOf" class="fieldplaceholder">Multiple of</label>
        <input type="number" name="multipleOf" id="multipleOf" v-model="internalData.multipleOf" />
      </fieldset>
      <fieldset>
        <label for="minimum" class="fieldplaceholder">Minimum or equal</label>
        <input type="number" name="minimum" id="minimum" v-model="internalData.minimum" />
      </fieldset>
      <fieldset>
        <label for="exclusiveMinimum" class="fieldplaceholder">Minimum</label>
        <input type="number" name="exclusiveMinimum" id="exclusiveMinimum" v-model="internalData.exclusiveMinimum" />
      </fieldset>
      <fieldset>
        <label for="maximum" class="fieldplaceholder">Maximum or equal</label>
        <input type="number" name="maximum" id="maximum" v-model="internalData.maximum" />
      </fieldset>
      <fieldset>
        <label for="exclusiveMaximum" class="fieldplaceholder">Maximum</label>
        <input type="number" name="exclusiveMaximum" id="exclusiveMaximum" v-model="internalData.exclusiveMaximum" />
      </fieldset>
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">save</button>
      <button class="cancel" @click.prevent="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import IntegerType from '../../DataStructure/IntegerType.js'

export default {
  name: 'IntegerForm',
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
      this.$emit('change', new IntegerType(this.internalData, this.internalData.name))
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
