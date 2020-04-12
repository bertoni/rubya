<template>
  <div class="child-template array-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">{{ translate('array') }}</span>): <span class="title">{{ internalData.title || translate('No title') }}</span> | <span class="id">{{ internalData.id || translate('No identification') }}</span>
      </p>
      <p>{{ internalData.description || translate('No description') }}</p>
      <p>{{ translate('Additional items') }}: {{ internalData.additionalItems ? translate('Yes') : translate('No') }},
        {{ translate('Unique items') }}: {{ internalData.uniqueItems ? translate('Yes') : translate('No') }},
        {{ translate('Minimum items') }}: {{ showNumber(internalData.minItems) }}, {{ translate('Maximum items') }}: {{ showNumber(internalData.maxItems) }}</p>
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
    <ArrayForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      @close="form = false"
      @change="update"
      />
    <span v-if="haveChildren" v-show="!openedChildren" class="colapsed-children"></span>
    <ul class="children unique" v-if="openedChildren && hasListItems === 'object'">
      <Child
        :originalObject="internalData.items"
        :allowChangeName="false"
        :translate="translate"
        @remove-me="removeChild"
        @change="childUpdated"
        />
    </ul>
    <ul class="children multiple" v-if="openedChildren && hasListItems === 'array'">
      <li v-for="(item, idx) in internalData.items" :key="item.name + '-' + idx">
        <Child
          :originalObject="item"
          :allowChangeName="false"
          :translate="translate"
          @remove-me="removeChild"
          @change="childUpdated"
          />
      </li>
    </ul>
    <NewChild
      v-show="newchild"
      ref="formNewChild"
      :allowChangeName="false"
      :translate="translate"
      @close="newchild = false"
      @save="addChild"
      />
  </div>
</template>

<script>
import ArrayType from '../../DataStructure/ArrayType.js'
import ArrayForm from './form.vue'
import NewChild from '../NewChild.vue'
import Child from '../Child.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'ArrayTemplate',
  components: {
    ArrayForm,
    NewChild,
    Child,
    FloatingMenu
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
      type: ArrayType,
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
      return !!((!Array.isArray(this.internalData.items) && this.internalData.items && Object.keys(this.internalData.items).length) ||
        (Array.isArray(this.internalData.items) && this.internalData.items.length))
    },
    hasListItems: function () {
      if (!Array.isArray(this.internalData.items) && this.internalData.items && Object.keys(this.internalData.items).length) return 'object'
      if (Array.isArray(this.internalData.items) && this.internalData.items.length) return 'array'
      return false
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
      if (Array.isArray(this.internalData.items) && this.internalData.items.length) {
        child.name = this.internalData.items.length
        this.internalData.items.push(child)
        return true
      } else if (Object.keys(this.internalData.items).length) {
        const oldChild = this.internalData.items
        oldChild.name = '0'
        this.internalData.items = []
        this.internalData.items.push(oldChild)
        child.name = this.internalData.items.length.toString()
        this.internalData.items.push(child)
        return true
      }
      this.internalData.items = child
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
      if (Array.isArray(this.internalData.items)) {
        this.internalData.items = this.internalData.items.filter(child => child.name !== removedChild.name)
        if (this.internalData.items.length < 2) {
          this.internalData.items = this.internalData.items[0]
          this.internalData.items.name = ''
        } else {
          this.internalData.items = this.internalData.items.map((child, idx) => {
            child.name = idx.toString()
            return child
          })
        }
      } else {
        this.internalData.items = []
      }
    },
    childUpdated (objectType) {
      if (Array.isArray(this.internalData.items)) {
        this.internalData.items = this.internalData.items.map(child => {
          if (child.name === objectType.name) {
            return objectType
          }
          return child
        })
      } else {
        this.internalData.items = objectType
      }
    },
    remove () {
      this.$emit('remove-me', this.internalData)
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
