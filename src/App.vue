<template>
  <div id="app">
    <a @click.prevent="printSchema" href="#">Gerar Json Schema</a>
    <Rubya
      ref="Rubya"
      :schema="schema"
      @updatedSchema="updatedSchema"
      />
  </div>
</template>

<script>
import Rubya from './components/Rubya'

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
        'title': '',
        'description': '',
        'type': 'object',
        'required': [],
        'properties': {
          'name': {
            'type': 'string',
            'minLength': 10,
            'maxLength': 20,
            'pattern': '/[0-9]/',
            'format': 'date'
          },
          'salário': {
            'type': 'integer',
            'multipleOf': 2,
            'exclusiveMinimum': 1,
            'exclusiveMaximum': 10
          },
          'filhos': {
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
          'endereco': {
            'type': 'object',
            'properties': {
              'rua': {
                'type': 'string'
              }
            }
          }
        }
      }
    }
  },
  methods: {
    printSchema () {
      this.$refs.Rubya.getJsonSchema()
    },
    updatedSchema (schema) {
      console.log(JSON.stringify(schema, null, 2))
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
