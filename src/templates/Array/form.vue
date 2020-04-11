<template>
  <div class="form-template">
    <h3>{{ translate('Array') }}</h3>
    <form class="form-object" @submit.prevent="save">
      <fieldset v-if="allowChangeName">
        <label for="name" class="fieldplaceholder">{{ translate('Name') }}</label>
        <input type="text" name="name" id="name" v-model="internalData.name" :class="(fieldsWithError.name ? 'error' : '')" />
      </fieldset>
      <fieldset>
        <label for="description" class="fieldplaceholder">{{ translate('Description') }}</label>
        <textarea name="description" id="description" v-model="internalData.description"></textarea>
      </fieldset>
      <fieldset>
        <label for="id" class="fieldplaceholder">{{ translate('Identification') }}</label>
        <input type="text" name="id" id="id" v-model="internalData.id" />
      </fieldset>
      <fieldset>
        <label for="title" class="fieldplaceholder">{{ translate('Title') }}</label>
        <input type="text" name="title" id="title" v-model="internalData.title" />
      </fieldset>
      <fieldset>
        <label for="additionalItems" class="fieldplaceholder">{{ translate('Allow additional items') }}</label>
        <select name="additionalItems" id="additionalItems" v-model="internalData.additionalItems">
          <option :value="true">{{ translate('Yes') }}</option>
          <option :value="false">{{ translate('No') }}</option>
        </select>
      </fieldset>
      <fieldset>
        <label for="uniqueItems" class="fieldplaceholder">{{ translate('Unique items') }}</label>
        <select name="uniqueItems" id="uniqueItems" v-model="internalData.uniqueItems">
          <option :value="true">{{ translate('Yes') }}</option>
          <option :value="false">{{ translate('No') }}</option>
        </select>
      </fieldset>
      <fieldset>
        <label for="minItems" class="fieldplaceholder">{{ translate('Minimum items') }}</label>
        <input type="number" name="minItems" id="minItems" v-model.number="internalData.minItems" />
      </fieldset>
      <fieldset>
        <label for="maxItems" class="fieldplaceholder">{{ translate('Maximum items') }}</label>
        <input type="number" name="maxItems" id="maxItems" v-model.number="internalData.maxItems" />
      </fieldset>
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">{{ translate('save') }}</button>
      <button class="cancel" @click.prevent="cancel">{{ translate('cancel') }}</button>
    </div>
  </div>
</template>

<script>
import ArrayType from '../../DataStructure/ArrayType.js'

export default {
  name: 'ArrayForm',
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
      this.$emit('change', new ArrayType(this.internalData, this.internalData.name))
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
