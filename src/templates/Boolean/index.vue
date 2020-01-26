<template>
  <div class="child-template boolean-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">boolean</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <FloatingMenu
        :showEdit="true"
        :showAdd="false"
        :showRemove="true"
        @edit="edit"
        @remove="remove" />
    </div>
    <BooleanForm
      v-if="form"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @close="form = false"
      @change="update"
      />
  </div>
</template>

<script>
import BooleanType from '../../DataStructure/BooleanType.js'
import BooleanForm from './form.vue'
import FloatingMenu from '../../components/FloatingMenu.vue'

export default {
  name: 'BooleanTemplate',
  components: {
    BooleanForm,
    FloatingMenu
  },
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    originalObject: {
      type: BooleanType,
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
      this.$emit('change', this.internalData)
    },
    edit () {
      this.form = true
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
