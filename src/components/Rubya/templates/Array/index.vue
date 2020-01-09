<template>
  <div class="child-template array-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">array</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Additional items: {{ internalData.additionalItems ? 'Yes' : 'No' }}, Unique items: {{ internalData.uniqueItems ? 'Yes' : 'No' }}, Minimum items: {{ internalData.minItems || '-' }}, Maximum items: {{ internalData.maxItems || '-' }}</p>
      <div class="actions">
        <button class="edit" @click.prevent="edit"><img src="@/assets/ico-edit.svg" /></button>
        <button class="new" @click.prevent="newChild"><img src="@/assets/ico-plus.svg" /></button>
        <button class="remove" @click.prevent="remove"><img src="@/assets/ico-trash.svg" /></button>
      </div>
    </div>
    <ArrayForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @close="form = false"
      @change="update"
      />
    <ul class="children unique" v-if="!Array.isArray(internalData.items) && internalData.items && Object.keys(internalData.items).length">
      <ObjectTemplate
        v-if="internalData.items.type && internalData.items.type === 'object'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @removeMe="removeChild"
        />
      <ArrayTemplate
        v-if="internalData.items.type && internalData.items.type === 'array'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @removeMe="removeChild"
        />
      <StringTemplate
        v-if="internalData.items.type && internalData.items.type === 'string'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @removeMe="removeChild"
        />
      <IntegerTemplate
        v-if="internalData.items.type && internalData.items.type === 'integer'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @removeMe="removeChild"
        />
      <NumberTemplate
        v-if="internalData.items.type && internalData.items.type === 'number'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @removeMe="removeChild"
        />
      <BooleanTemplate
        v-if="internalData.items.type && internalData.items.type === 'boolean'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @removeMe="removeChild"
        />
    </ul>
    <ul class="children multiple" v-if="Array.isArray(internalData.items) && internalData.items.length">
      <li v-for="(item, idx) in internalData.items" :key="item.name + '-' + idx">
        <ObjectTemplate
          v-if="item && item.type && item.type === 'object'"
          :originalObject="item"
          :allowChangeName="false"
          @removeMe="removeChild"
          />
        <ArrayTemplate
          v-if="item && item.type && item.type === 'array'"
          :originalObject="item"
          :allowChangeName="false"
          @removeMe="removeChild"
          />
        <StringTemplate
          v-if="item && item.type && item.type === 'string'"
          :originalObject="item"
          :allowChangeName="false"
          @removeMe="removeChild"
          />
        <IntegerTemplate
          v-if="item && item.type && item.type === 'integer'"
          :originalObject="item"
          :allowChangeName="false"
          @removeMe="removeChild"
          />
        <NumberTemplate
          v-if="item && item.type && item.type === 'number'"
          :originalObject="item"
          :allowChangeName="false"
          @removeMe="removeChild"
          />
        <BooleanTemplate
          v-if="item && item.type && item.type === 'boolean'"
          :originalObject="item"
          :allowChangeName="false"
          @removeMe="removeChild"
          />
      </li>
    </ul>
    <NewChild
      v-show="newchild"
      ref="formNewChild"
      :allowChangeName="false"
      @close="newchild = false"
      @save="addChild"
      />
  </div>
</template>

<script>
import ArrayType from '../../dataStructure/ArrayType'
import ArrayForm from './form'
import NewChild from '../NewChild'
import ObjectTemplate from '../Object'
import ArrayTemplate from './'
import StringTemplate from '../String'
import IntegerTemplate from '../Integer'
import NumberTemplate from '../Number'
import BooleanTemplate from '../Boolean'

export default {
  name: 'ArrayTemplate',
  components: {
    ArrayForm,
    NewChild,
    ObjectTemplate,
    ArrayTemplate,
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
      type: ArrayType,
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
      if (Array.isArray(this.internalData.items) && this.internalData.items.length) {
        child.name = this.internalData.items.length
        this.internalData.items.push(child)
      } else if (Object.keys(this.internalData.items).length) {
        let oldChild = {...this.internalData.items}
        oldChild.name = 0
        this.internalData.items = []
        this.internalData.items.push(oldChild)
        child.name = this.internalData.items.length
        this.internalData.items.push(child)
      } else {
        this.internalData.items = child
      }
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
      this.internalData.items = this.internalData.items.filter(child => child.name !== removedChild.name)
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
ul.children {
  list-style: none;
  padding: 0;
}
ul.children li {
  margin: 6px 0;
}
</style>
