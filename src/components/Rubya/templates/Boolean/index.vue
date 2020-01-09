<template>
  <div class="child-template boolean-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">boolean</span>): <span class="title">{{ internalData.title || 'No title' }}</span> | <span class="id">{{ internalData.id || 'No identification' }}</span>
      </p>
      <p>{{ internalData.description || 'No description' }}</p>
      <div class="actions">
        <button class="edit" @click.prevent="edit"><img src="@/assets/ico-edit.svg" /></button>
        <button class="remove" @click.prevent="remove"><img src="@/assets/ico-trash.svg" /></button>
      </div>
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
import BooleanType from '../../dataStructure/BooleanType'
import BooleanForm from './form'

export default {
  name: 'BooleanTemplate',
  components: {
    BooleanForm
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
