<template>
  <div class="child-template array-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">array</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Additional items: {{ internalData.additionalItems ? 'Yes' : 'No' }}, Unique items: {{ internalData.uniqueItems ? 'Yes' : 'No' }}, Minimum items: {{ showNumber(internalData.minItems) }}, Maximum items: {{ showNumber(internalData.maxItems) }}</p>
      <FloatingMenu
        :showEdit="true"
        :showAdd="true"
        :showRemove="true"
        @edit="edit"
        @add="newChild"
        @remove="remove" />
    </div>
    <ArrayForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @close="form = false"
      @change="update"
      />
    <ul class="children unique" v-if="hasListItems === 'object'">
      <ObjectTemplate
        v-if="internalData.items.type && internalData.items.type === 'object'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @remove-me="removeChild"
        @change="childUpdated"
        />
      <ArrayTemplate
        v-if="internalData.items.type && internalData.items.type === 'array'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @remove-me="removeChild"
        @change="childUpdated"
        />
      <StringTemplate
        v-if="internalData.items.type && internalData.items.type === 'string'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @remove-me="removeChild"
        @change="childUpdated"
        />
      <IntegerTemplate
        v-if="internalData.items.type && internalData.items.type === 'integer'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @remove-me="removeChild"
        @change="childUpdated"
        />
      <NumberTemplate
        v-if="internalData.items.type && internalData.items.type === 'number'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @remove-me="removeChild"
        @change="childUpdated"
        />
      <BooleanTemplate
        v-if="internalData.items.type && internalData.items.type === 'boolean'"
        :originalObject="internalData.items"
        :allowChangeName="false"
        @remove-me="removeChild"
        @change="childUpdated"
        />
    </ul>
    <ul class="children multiple" v-if="hasListItems === 'array'">
      <li v-for="(item, idx) in internalData.items" :key="item.name + '-' + idx">
        <ObjectTemplate
          v-if="item && item.type && item.type === 'object'"
          :originalObject="item"
          :allowChangeName="false"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <ArrayTemplate
          v-if="item && item.type && item.type === 'array'"
          :originalObject="item"
          :allowChangeName="false"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <StringTemplate
          v-if="item && item.type && item.type === 'string'"
          :originalObject="item"
          :allowChangeName="false"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <IntegerTemplate
          v-if="item && item.type && item.type === 'integer'"
          :originalObject="item"
          :allowChangeName="false"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <NumberTemplate
          v-if="item && item.type && item.type === 'number'"
          :originalObject="item"
          :allowChangeName="false"
          @remove-me="removeChild"
          @change="childUpdated"
          />
        <BooleanTemplate
          v-if="item && item.type && item.type === 'boolean'"
          :originalObject="item"
          :allowChangeName="false"
          @remove-me="removeChild"
          @change="childUpdated"
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
import ArrayType from '../../DataStructure/ArrayType.js'
import ArrayForm from './form.vue'
import NewChild from '../NewChild.vue'
import StringTemplate from '../String/index.vue'
import IntegerTemplate from '../Integer/index.vue'
import NumberTemplate from '../Number/index.vue'
import BooleanTemplate from '../Boolean/index.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'ArrayTemplate',
  components: {
    ArrayForm,
    NewChild,
    ObjectTemplate: /* istanbul ignore next */() => import('../Object/index.vue'),
    ArrayTemplate: /* istanbul ignore next */() => import('./index.vue'),
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
  computed: {
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
