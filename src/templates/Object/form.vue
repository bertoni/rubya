<template>
  <div class="form-template">
    <h3>Object</h3>
    <form class="form-object" @submit.prevent="save">
      <fieldset v-if="allowChangeName">
        <label for="name" class="fieldplaceholder">Name</label>
        <input type="text" name="name" id="name" v-model="internalData.name" :class="(fieldsWithError.name ? 'error' : '')" />
      </fieldset>
      <fieldset>
        <label for="description" class="fieldplaceholder">Description</label>
        <textarea v-model="internalData.description" name="description" id="description"></textarea>
      </fieldset>
      <fieldset>
        <label for="identification" class="fieldplaceholder">Identification</label>
        <input type="text" name="identification" id="identification" v-model="internalData.id" />
      </fieldset>
      <fieldset>
        <label for="title" class="fieldplaceholder">Title</label>
        <input type="text" name="title" id="title" v-model="internalData.title" />
      </fieldset>
      <fieldset>
        <label for="additionalProperties" class="fieldplaceholder">Allow additional properties</label>
        <select v-model="internalData.additionalProperties" name="additionalProperties" id="additionalProperties">
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
      </fieldset>
      <fieldset>
        <label for="minProperties" class="fieldplaceholder">Minimum Properties</label>
        <input type="number" name="minProperties" id="minProperties" v-model.number="internalData.minProperties" />
      </fieldset>
      <fieldset>
        <label for="maxProperties" class="fieldplaceholder">Maximum Properties</label>
        <input type="number" name="maxProperties" id="maxProperties" v-model.number="internalData.maxProperties" />
      </fieldset>
      <fieldset v-if="children.length">
        <label class="fieldplaceholder">Required Children: </label>
        <div class="options-group">
          <label v-for="(child, key) in children" :key="'child' + key" class="option">
            <input type="checkbox" v-model="requiredChildren" :value="child" /> {{ child }}
          </label>
        </div>
      </fieldset>
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
      children: [],
      requiredChildren: []
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
