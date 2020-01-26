<template>
  <div class="child-template number-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">number</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <p>Multiple of: {{ internalData.multipleOf || '-' }}, Minimum or equal: {{ internalData.minimum || '-' }}, Minimum: {{ internalData.exclusiveMinimum || '-' }}, Maximum or equal: {{ internalData.maximum || '-' }}, Maximum: {{ internalData.exclusiveMaximum || '-' }}</p>
      <FloatingMenu
        :showEdit="true"
        :showAdd="false"
        :showRemove="true"
        @edit="edit"
        @remove="remove" />
    </div>
    <NumberForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @close="form = false"
      @change="update"
      />
  </div>
</template>

<script>
import NumberType from '../../DataStructure/NumberType.js'
import NumberForm from './form.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'NumberTemplate',
  components: {
    NumberForm,
    FloatingMenu
  },
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    originalObject: {
      type: NumberType,
      required: true
    }
  },
  data () {
    return {
      form: false,
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
    remove () {
      this.$emit('removeMe', this.internalData)
    }
  },
  mounted () {
    this.internalData = this.originalObject
  }
}
</script>
