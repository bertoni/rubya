<template>
  <div class="form-template">
    <h3>{{ translate('Number') }}</h3>
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
      <fieldset>
        <label for="multipleOf" class="fieldplaceholder">{{ translate('Multiple of') }}</label>
        <input type="number" name="multipleOf" id="multipleOf" v-model.number="internalData.multipleOf" />
      </fieldset>
      <fieldset>
        <label for="minimum" class="fieldplaceholder">{{ translate('Minimum or equal') }}</label>
        <input type="number" name="minimum" id="minimum" v-model.number="internalData.minimum" />
      </fieldset>
      <fieldset>
        <label for="exclusiveMinimum" class="fieldplaceholder">{{ translate('Minimum') }}</label>
        <input type="number" name="exclusiveMinimum" id="exclusiveMinimum" v-model.number="internalData.exclusiveMinimum" />
      </fieldset>
      <fieldset>
        <label for="maximum" class="fieldplaceholder">{{ translate('Maximum or equal') }}</label>
        <input type="number" name="maximum" id="maximum" v-model.number="internalData.maximum" />
      </fieldset>
      <fieldset>
        <label for="exclusiveMaximum" class="fieldplaceholder">{{ translate('Maximum') }}</label>
        <input type="number" name="exclusiveMaximum" id="exclusiveMaximum" v-model.number="internalData.exclusiveMaximum" />
      </fieldset>
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">{{ translate('save') }}</button>
      <button class="cancel" @click.prevent="cancel">{{ translate('cancel') }}</button>
    </div>
  </div>
</template>

<script>
import NumberType from '../../DataStructure/NumberType.js'

export default {
  name: 'NumberForm',
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
      this.$emit('change', new NumberType(this.internalData, this.internalData.name))
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
