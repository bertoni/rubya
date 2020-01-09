<template>
  <ObjectTemplate
    v-if="tree !== null"
    :originalObject="tree"
    :allowChangeName="false"
    @removeMe="removeChild"
    />
</template>

<script>
import DataStructureFactory from './dataStructure/DataStructureFactory'
import ObjectTemplate from './templates/Object'

export default {
  name: 'Rubya',
  components: {
    ObjectTemplate
  },
  props: {
    schema: {
      type: Object,
      default: () => {
        return {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          '$id': 'http://example.com/product.schema.json',
          'title': 'Tree of fields in an object',
          'description': '',
          'type': 'object',
          'properties': {},
          'required': []
        }
      }
    }
  },
  data () {
    return {
      tree: null
    }
  },
  methods: {
    getJsonSchema () {
      this.$emit('updatedSchema', this.tree.toJson())
    },
    generateTreeFromSchema (schema) {
      this.tree = DataStructureFactory.create(schema)
    },
    removeChild (removedChild) {
      this.tree = this.schema
    }
  },
  mounted () {
    this.generateTreeFromSchema(this.schema)
  }
}
</script>

<style>
.child-template {
  position: relative;
  min-height: 58px;
  padding-left: 40px;
}
.child-template p {
  margin: 0;
}
.child-template p span.name {
  font-size: 1.2em;
  font-weight: bold;
}
.child-template p span.type {
  font-size: 0.8em;
  text-decoration: underline;
}
.child-template p span.title {
  font-size: 1em;
}
.child-template p span.id {
  font-size: 0.9em;
  font-style: italic;
}
.child-template .actions {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 58px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.child-template .actions button {
  width: 32px;
  height: 27px;
  cursor: pointer;
  margin: 2px 0;
  border: 0;
  background-color: transparent;
}
.child-template .actions button.edit:hover {
  background-color: #6eb4fd;
}
.child-template .actions button.remove:hover {
  background-color: #fd6e6e;
}
.child-template .actions button.new:hover {
  background-color: #6efda7;
}

.form-template {
  margin: 20px 0;
}
.form-template h3 {
  margin: 0 0 5px;
}
.form-object {
  display: flex;
  flex-wrap: wrap;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: start;
}
.form-object input[type="text"],
.form-object input[type="number"],
.form-object select,
.form-object textarea {
  flex: 1;
  height: 24px;
  min-width: 32%;
  max-width: 32%;
  margin: 3px 0.3%;
  padding: 3px;
  border: 1px solid #e4e4e4;
}
.form-object input[type="text"].error,
.form-object input[type="number"].error,
.form-object select.error,
.form-object textarea.error {
  border-color: red;
}
.form-object textarea {
  min-width: 65.2%;
  max-width: 65.2%;
}
.form-object select {
  min-width: 32.6%;
  max-width: 32.6%;
  height: 32px;
}
.control-form {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
.control-form button {
  margin: 0 5px;
  padding: 4px 10px;
  border: 0;
  color: #fff;
  background-color: red;
  text-transform: uppercase;
  cursor: pointer;
}
.control-form button.save {
  background-color: #61ea58;
}
.control-form button.save:hover {
  background-color: #3ec335;
}
.control-form button.cancel {
  background-color: #c1c1c1;
}
.control-form button.cancel:hover {
  background-color: #9e9898;
}
</style>
