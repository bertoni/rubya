<template>
  <div>
    <h1>Rubya</h1>
    <p>Project destined to create json schema of visual form in vue.js</p>
    <p>You can try usage the interface below.</p>
    <a id="generate" href="#" @click.prevent="printSchema">Generate Json Schema</a>
    <form id="generated-schema">
      <label>Json Schema:</label>
      <textarea disabled="disabled">{{ generatedSchema }}</textarea>
    </form>
    <Rubya
      id="rubya"
      ref="Rubya"
      :schema="schema"
      @updated-schema="updatedSchema" />
<!--    <a @click.prevent="printSchema" href="#">Gerar Json Schema</a>-->
<!--    <Rubya-->
<!--      ref="Rubya"-->
<!--      :schema="schema"-->
<!--      @updated-schema="updatedSchema"-->
<!--    />-->
  </div>
</template>

<script>
  import Rubya from '../src/index.vue'
  export default {
    name: 'App',
    components: {
      Rubya
    },
    data () {
      return {
        generatedSchema: '',
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
        }
      }
    },
    methods: {
      printSchema () {
        this.$refs.Rubya.getJsonSchema()
      },
      updatedSchema (schema) {
        this.schema = schema
        this.generatedSchema = JSON.stringify(schema, null, 2)
      }
    },
    mounted () {
      this.printSchema()
    }
  }
</script>

<style src="./style.css"></style>
<style>
  h1 { margin-top: 0; }
  #generate { position: fixed; top: 10px; right: 10px; }
  #rubya { float: left; width: 48%; }
  #generated-schema { float: right; width: 48%; height: 100%; }
  #generated-schema textarea { width: 99%; height: 95%; }
</style>
