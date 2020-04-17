<template>
  <div>
    <ObjectTemplate
      v-if="internalData && internalData.type && internalData.type === 'object'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      :hideTitle="hideTitle"
      :hideIdentification="hideIdentification"
      :hideDescription="hideDescription"
      :hideRules="hideRules"
      @remove-me="remove"
      @change="update"
    />
    <ArrayTemplate
      v-if="internalData && internalData.type && internalData.type === 'array'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      :hideTitle="hideTitle"
      :hideIdentification="hideIdentification"
      :hideDescription="hideDescription"
      :hideRules="hideRules"
      @remove-me="remove"
      @change="update"
    />
    <StringTemplate
      v-if="internalData && internalData.type && internalData.type === 'string'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      :hideTitle="hideTitle"
      :hideIdentification="hideIdentification"
      :hideDescription="hideDescription"
      :hideRules="hideRules"
      @remove-me="remove"
      @change="update"
    />
    <IntegerTemplate
      v-if="internalData && internalData.type && internalData.type === 'integer'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      :hideTitle="hideTitle"
      :hideIdentification="hideIdentification"
      :hideDescription="hideDescription"
      :hideRules="hideRules"
      @remove-me="remove"
      @change="update"
    />
    <NumberTemplate
      v-if="internalData && internalData.type && internalData.type === 'number'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      :hideTitle="hideTitle"
      :hideIdentification="hideIdentification"
      :hideDescription="hideDescription"
      :hideRules="hideRules"
      @remove-me="remove"
      @change="update"
    />
    <BooleanTemplate
      v-if="internalData && internalData.type && internalData.type === 'boolean'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      :translate="translate"
      :hideTitle="hideTitle"
      :hideIdentification="hideIdentification"
      :hideDescription="hideDescription"
      @remove-me="remove"
      @change="update"
    />
  </div>
</template>

<script>
export default {
  name: 'ChildTemplate',
  components: {
    ArrayTemplate: () => import('./Array/index.vue'),
    BooleanTemplate: () => import('./Boolean/index.vue'),
    IntegerTemplate: () => import('./Integer/index.vue'),
    NumberTemplate: () => import('./Number/index.vue'),
    ObjectTemplate: () => import('./Object/index.vue'),
    StringTemplate: () => import('./String/index.vue')
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
    hideRules: {
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
      type: Object,
      required: true
    }
  },
  data () {
    return {
      internalData: {}
    }
  },
  methods: {
    remove () {
      this.$emit('remove-me', this.internalData)
    },
    update (newData) {
      this.$emit('change', { old: this.internalData, new: newData })
    }
  },
  watch: {
    originalObject (val) {
      this.internalData = val
    }
  },
  mounted () {
    this.internalData = this.originalObject
  }
}
</script>
