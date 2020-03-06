<template>
  <div class="child-template object-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">object</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Additional properties: {{ internalData.additionalProperties ? 'Yes' : 'No' }}, Minimum properties: {{ showNumber(internalData.minProperties) }}, Maximum properties: {{ showNumber(internalData.maxProperties) }}, Required children: {{ internalData.required || '-' }}</p>
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
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <ArrayTemplate
          v-if="propertie && propertie.type && propertie.type === 'array'"
          :originalObject="propertie"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <StringTemplate
          v-if="propertie && propertie.type && propertie.type === 'string'"
          :originalObject="propertie"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <IntegerTemplate
          v-if="propertie && propertie.type && propertie.type === 'integer'"
          :originalObject="propertie"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <NumberTemplate
          v-if="propertie && propertie.type && propertie.type === 'number'"
          :originalObject="propertie"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <BooleanTemplate
          v-if="propertie && propertie.type && propertie.type === 'boolean'"
          :originalObject="propertie"
          @remove-me="removeChild"
          @change="childUpdated"
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

export default {
  name: 'ObjectTemplate',
  components: {
    ObjectForm: () => import('./form.vue'),
    NewChild: () => import('../NewChild.vue'),
    ObjectTemplate: /* istanbul ignore next */() => import('./index.vue'),
    ArrayTemplate: () => import('../Array/index.vue'),
    StringTemplate: () => import('../String/index.vue'),
    IntegerTemplate: () => import('../Integer/index.vue'),
    NumberTemplate: () => import('../Number/index.vue'),
    BooleanTemplate: () => import('../Boolean/index.vue'),
    FloatingMenu: () => import('../../components/FloatingMenu.vue')
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
    showNumber (number) {
      return (typeof number === 'number') ? number : '-'
    },
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
      this.$emit('remove-me', this.internalData)
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
