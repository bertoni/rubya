<template>
  <div class="child-template object-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">{{ translate('object') }}</span>): <span class="title">{{ internalData.title || translate('No title') }}</span> | <span class="id">{{ internalData.id || translate('No identification') }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>{{ translate('Additional properties') }}: {{ internalData.additionalProperties ? translate('Yes') : translate('No') }},
        {{ translate('Minimum properties') }}: {{ showNumber(internalData.minProperties) }}, {{ translate('Maximum properties') }}: {{ showNumber(internalData.maxProperties) }},
        {{ translate('Required children') }}: {{ internalData.required || '-' }}</p>
      <FloatingMenu
        :translate="translate"
        :showEdit="true"
        :showAdd="true"
        :showRemove="true"
        :showOpenHideChildren="haveChildren && true"
        :openedChildren="openedChildren"
        @edit="edit"
        @add="newChild"
        @remove="remove"
        @open-hide-children="openedChildren = !openedChildren" />
    </div>
    <ObjectForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="form = false"
      @change="update"
      />
    <span v-if="haveChildren" v-show="!openedChildren" class="colapsed-children"></span>
    <ul v-show="openedChildren" class="children">
      <li v-for="(propertie, idx) in internalData.properties" :key="propertie.name + '-' + idx">
        <Child
          :originalObject="propertie"
          :translate="translate"
          @remove-me="removeChild"
          @change="childUpdated"
          />
      </li>
    </ul>
    <NewChild
      v-show="newchild"
      ref="formNewChild"
      :allowChangeName="true"
      :translate="translate"
      @close="newchild = false"
      @save="addChild"
      />
  </div>
</template>

<script>
import ObjectType from '../../DataStructure/ObjectType.js'
import ObjectForm from './form.vue'
import NewChild from '../NewChild.vue'
import Child from '../Child.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'ObjectTemplate',
  components: {
    ObjectForm,
    FloatingMenu,
    NewChild,
    Child
  },
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
      form: false,
      newchild: false,
      openedChildren: true,
      internalData: {}
    }
  },
  computed: {
    haveChildren () {
      return this.internalData.properties && this.internalData.properties.length > 0
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
