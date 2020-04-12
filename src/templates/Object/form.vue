<template>
  <div class="form-template">
    <h3>{{ translate('Object') }}</h3>
    <form class="form-object" @submit.prevent="save">
      <fieldset v-if="allowChangeName">
        <label for="name" class="fieldplaceholder">{{ translate('Name') }}</label>
        <input type="text" name="name" id="name" v-model="internalData.name" :class="(fieldsWithError.name ? 'error' : '')" />
      </fieldset>
      <fieldset>
        <label for="additionalProperties" class="fieldplaceholder">{{ translate('Allow additional properties') }}</label>
        <select v-model="internalData.additionalProperties" name="additionalProperties" id="additionalProperties">
          <option :value="true">{{ translate('Yes') }}</option>
          <option :value="false">{{ translate('No') }}</option>
        </select>
      </fieldset>
      <fieldset>
        <label for="minProperties" class="fieldplaceholder">{{ translate('Minimum Properties') }}</label>
        <input type="number" name="minProperties" id="minProperties" v-model.number="internalData.minProperties" />
      </fieldset>
      <fieldset>
        <label for="maxProperties" class="fieldplaceholder">{{ translate('Maximum Properties') }}</label>
        <input type="number" name="maxProperties" id="maxProperties" v-model.number="internalData.maxProperties" />
      </fieldset>
      <fieldset v-if="children.length" class="double">
        <label class="fieldplaceholder">{{ translate('Required Children') }}: </label>
        <div class="options-group">
          <label v-for="(child, key) in children" :key="'child' + key" class="option">
            <input type="checkbox" v-model="requiredChildren" :value="child" /> {{ child }}
          </label>
        </div>
      </fieldset>
      <fieldset v-show="!showCommonFields">
        <button class="show-common-fields" @click.prevent="showCommonFields = true">{{ translate('show common fields') }}</button>
      </fieldset>
      <fieldset v-show="showCommonFields">
        <label for="title" class="fieldplaceholder">{{ translate('Title') }}</label>
        <input type="text" name="title" id="title" v-model="internalData.title" />
      </fieldset>
      <fieldset v-show="showCommonFields">
        <label for="id" class="fieldplaceholder">{{ translate('Identification') }}</label>
        <input type="text" name="id" id="id" v-model="internalData.id" />
      </fieldset>
      <fieldset v-show="showCommonFields">
        <label for="description" class="fieldplaceholder">{{ translate('Description') }}</label>
        <textarea name="description" id="description" v-model="internalData.description"></textarea>
      </fieldset>
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">{{ translate('save') }}</button>
      <button class="cancel" @click.prevent="cancel">{{ translate('cancel') }}</button>
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
    translate: {
      type: Function,
      required: true
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
      children: [],
      requiredChildren: [],
      showCommonFields: false
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
        this.internalData.required = this.requiredChildren
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
    this.requiredChildren = this.internalData.required
    this.children = this.internalData.properties.map(child => child.name)
  }
}
</script>
