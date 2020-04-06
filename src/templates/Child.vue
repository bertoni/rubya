<template>
  <div>
    <ObjectTemplate
      v-if="internalData && internalData.type && internalData.type === 'object'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @remove-me="remove"
      @change="update"
    />
    <ArrayTemplate
      v-if="internalData && internalData.type && internalData.type === 'array'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @remove-me="remove"
      @change="update"
    />
    <StringTemplate
      v-if="internalData && internalData.type && internalData.type === 'string'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @remove-me="remove"
      @change="update"
    />
    <IntegerTemplate
      v-if="internalData && internalData.type && internalData.type === 'integer'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @remove-me="remove"
      @change="update"
    />
    <NumberTemplate
      v-if="internalData && internalData.type && internalData.type === 'number'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
      @remove-me="remove"
      @change="update"
    />
    <BooleanTemplate
      v-if="internalData && internalData.type && internalData.type === 'boolean'"
      :originalObject="internalData"
      :allowChangeName="allowChangeName"
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
    allowChangeName: {
      type: Boolean,
      default: () => true
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
      this.internalData = newData
      this.$emit('change', this.internalData)
    }
  },
  mounted () {
    this.internalData = this.originalObject
  }
}
</script>
