<template>
  <div class="child-template boolean-template">
    <div v-if="!form">
      <p>
        <span class="name">{{ internalData.name }}</span> (<span class="type">{{ translate('boolean') }}</span>)<span v-if="!hideTitle || !hideIdentification">: </span>
        <span v-if="!hideTitle" class="title">{{ internalData.title || translate('No title') }}</span> <span v-if="!hideTitle && !hideIdentification">|</span> <span v-if="!hideIdentification" class="id">{{ internalData.id || translate('No identification') }}</span>
      </p>
      <p v-if="!hideDescription">{{ internalData.description || 'No description' }}</p>
      <FloatingMenu
        :translate="translate"
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
      :translate="translate"
      :hideTitle="hideTitle"
      :hideIdentification="hideIdentification"
      :hideDescription="hideDescription"
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
    hideTitle: {
      type: Boolean,
      default: () => false
    },
    hideIdentification: {
      type: Boolean,
      default: () => false
    },
    hideDescription: {
      type: Boolean,
      default: () => false
    },
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    translate: {
      type: Function,
      required: true
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
