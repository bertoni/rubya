<template>
  <div id="app">
    <a @click.prevent="printSchema" href="#">Generate Json Schema</a>
    <Rubya
      ref="Rubya"
      :schema="schema"
      :language="language"
      :i18n="i18n"
      @updated-schema="updatedSchema"
      />
  </div>
</template>

<script>
import Rubya from './index.vue'

export default {
  name: 'App',
  components: {
    Rubya
  },
  data () {
    return {
      schema: {
        '$schema': 'http://json-schema.org/draft-07/schema#',
        '$id': 'http://example.com/product.schema.json',
        'title': 'Root node of object',
        'description': 'Some description about node',
        'type': 'object',
        'required': [],
        'properties': {
          'date': {
            'type': 'string',
            'title': 'Date',
            'description': 'Date of birthday',
            'minLength': 10,
            'maxLength': 20,
            'pattern': '/[0-9]/',
            'format': 'date'
          },
          'budget': {
            'type': 'integer',
            'multipleOf': 2,
            'exclusiveMinimum': 1,
            'exclusiveMaximum': 10
          },
          'children': {
            'type': 'number',
            'multipleOf': 5,
            'minimum': 5,
            'maximum': 50
          },
          'pcd': {
            'type': 'boolean'
          },
          'list': {
            'type': 'array',
            'items': [
              { 'type': 'boolean' },
              { 'type': 'integer' },
              {
                'type': 'array',
                'items': { 'type': 'string' }
              }
            ]
          },
          'address': {
            'type': 'object',
            'properties': {
              'street': {
                'type': 'string'
              }
            }
          }
        }
      },
      language: 'pt-br',
      i18n: {
        'object': 'objeto!'
      }
    }
  },
  methods: {
    printSchema () {
      this.$refs.Rubya.getJsonSchema()
    },
    updatedSchema (schema) {
      this.schema = schema
      console.log(JSON.stringify(this.schema, null, 2))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
