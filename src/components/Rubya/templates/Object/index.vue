<template>
  <div class="child-template object-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">object</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Additional properties: {{ internalData.additionalProperties ? 'Yes' : 'No' }}, Minimum properties: {{ internalData.minProperties || '-' }}, Maximum properties: {{ internalData.maxProperties || '-' }}, Required children: {{ internalData.required || '-' }}</p>
      <div class="actions">
        <button class="edit" @click.prevent="edit"><img src="@/assets/ico-edit.svg" /></button>
        <button class="new" @click.prevent="newChild"><img src="@/assets/ico-plus.svg" /></button>
        <button class="remove" @click.prevent="remove"><img src="@/assets/ico-trash.svg" /></button>
      </div>
    </div>
    <ObjectForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @close="form = false"
      @change="update"
      />
    <ul class="children">
      <li v-for="(propertie, idx) in internalData.properties" :key="propertie.name + '-' + idx">
        <ObjectTemplate
          v-if="propertie && propertie.type && propertie.type === 'object'"
          :originalObject="propertie"
          @removeMe="removeChild"
          />
        <ArrayTemplate
          v-if="propertie && propertie.type && propertie.type === 'array'"
          :originalObject="propertie"
          @removeMe="removeChild"
          />
        <StringTemplate
          v-if="propertie && propertie.type && propertie.type === 'string'"
          :originalObject="propertie"
          @removeMe="removeChild"
          />
        <IntegerTemplate
          v-if="propertie && propertie.type && propertie.type === 'integer'"
          :originalObject="propertie"
          @removeMe="removeChild"
          />
        <NumberTemplate
          v-if="propertie && propertie.type && propertie.type === 'number'"
          :originalObject="propertie"
          @removeMe="removeChild"
          />
        <BooleanTemplate
          v-if="propertie && propertie.type && propertie.type === 'boolean'"
          :originalObject="propertie"
          @removeMe="removeChild"
          />
      </li>
    </ul>
    <NewChild
      v-show="newchild"
      ref="formNewChild"
      :allowChangeName="true"
      @close="newchild = false"
      @save="addChild"
      />
  </div>
</template>

<script>
import ObjectType from '../../dataStructure/ObjectType'
import ObjectForm from './form'
import NewChild from '../NewChild'
import ObjectTemplate from './'
import ArrayTemplate from '../Array'
import StringTemplate from '../String'
import IntegerTemplate from '../Integer'
import NumberTemplate from '../Number'
import BooleanTemplate from '../Boolean'

export default {
  name: 'ObjectTemplate',
  components: {
    ObjectForm,
    NewChild,
    ArrayTemplate,
    ObjectTemplate,
    StringTemplate,
    IntegerTemplate,
    NumberTemplate,
    BooleanTemplate
  },
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
      form: false,
      newchild: false,
      internalData: {}
    }
  },
  methods: {
    update (newData) {
      this.internalData = newData
      this.form = false
    },
    edit () {
      this.form = true
    },
    addChild (child) {
      this.internalData.properties.push(child)
    },
    newChild () {
      this.newchild = true
      setTimeout(() => {
        window.scroll({
          top: (this.$refs.formNewChild.$el.getBoundingClientRect().top + window.scrollY),
          left: 0,
          behavior: 'smooth'
        })
      }, 100)
    },
    removeChild (removedChild) {
      this.internalData.properties = this.internalData.properties.filter(child => child.name !== removedChild.name)
    },
    remove () {
      this.$emit('removeMe', this.internalData)
    }
  },
  mounted () {
    this.internalData = this.originalObject
  }
}
</script>

<style scoped>
.object-template {
  text-align: left;
}
ul.children {
  list-style: none;
  padding: 0;
}
ul.children li {
  margin: 6px 0;
}
</style>
