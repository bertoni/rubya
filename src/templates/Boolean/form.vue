<template>
  <div class="form-template">
    <h3>{{ translate('Boolean') }}</h3>
    <form class="form-object">
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
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">{{ translate('save') }}</button>
      <button class="cancel" @click.prevent="cancel">{{ translate('cancel') }}</button>
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
    translate: {
      type: Function,
      required: true
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
