<template>
  <div class="child-template object-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">object</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Additional properties: {{ internalData.additionalProperties ? 'Yes' : 'No' }}, Minimum properties: {{ internalData.minProperties || '-' }}, Maximum properties: {{ internalData.maxProperties || '-' }}, Required children: {{ internalData.required || '-' }}</p>
      <FloatingMenu
        :showEdit="true"
        :showAdd="true"
        :showRemove="true"
        @edit="edit"
        @add="newChild"
        @remove="remove" />
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
          @change="childUpdated"
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
import ObjectType from '../../DataStructure/ObjectType.js'
import ObjectForm from './form.vue'
import NewChild from '../NewChild.vue'
import ObjectTemplate from './index.vue'
import ArrayTemplate from '../Array/index.vue'
import StringTemplate from '../String/index.vue'
import IntegerTemplate from '../Integer/index.vue'
import NumberTemplate from '../Number/index.vue'
import BooleanTemplate from '../Boolean/index.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

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
    BooleanTemplate,
    FloatingMenu
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
      this.$emit('change', this.internalData)
    },
    edit () {
      this.form = true
    },
    addChild (child) {
      this.internalData.properties.push(child)
    },
    newChild () {
      this.newchild = true
      setTimeout(/* istanbul ignore next */() => {
        window.scroll({
          top: (this.$refs.formNewChild.$el.getBoundingClientRect().top + window.scrollY),
          left: 0,
          behavior: 'smooth'
        })
      }, 100)
    },
    removeChild (removedChild) {
      this.internalData.properties = this.internalData.properties.filter(child => child.name !== removedChild.name)
      this.internalData.required = this.internalData.required.filter(child => child !== removedChild.name)
    },
    remove () {
      this.$emit('removeMe', this.internalData)
    },
    childUpdated (objectType) {
      this.internalData.properties = this.internalData.properties.map(child => {
        if (child.name === objectType.name) return objectType
        return child
      })
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
