<template>
  <ObjectTemplate
    v-if="tree !== null"
    :originalObject="tree"
    :allowChangeName="false"
    @removeMe="removeChild"
    @change="childUpdated"
    />
</template>

<script>
import DataStructureFactory from './DataStructure/DataStructureFactory.js'
import ObjectTemplate from './templates/Object/index.vue'

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
    childUpdated (objectType) {
      this.tree = objectType
    },
    generateTreeFromSchema (schema) {
      this.tree = DataStructureFactory.create(schema)
    },
    removeChild () {
      this.generateTreeFromSchema(this.schema)
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
.child-template div:nth-child(1) {
  position: relative;
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
.form-object fieldset {
  display: flex;
  flex: 1;
  min-height: 48px;
  min-width: 32%;
  max-width: 32%;
  margin: 3px 0.3%;
  padding: 3px;
  border: 0;
  align-items: center;
}
.form-object fieldset label.fieldplaceholder {
  margin-bottom: 2px;
  font-size: 0.8em;
  color: #989898;
}
.form-object fieldset .options-group {
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  align-items: stretch;
}
.form-object fieldset .options-group label.option {
  margin-right: 15px;
  flex-grow: 0;
}
.form-object fieldset .options-group input[type="checkbox"],
.form-object fieldset .options-group input[type="radio"]{
  margin: 0;
}
.form-object fieldset input[type="text"],
.form-object fieldset input[type="number"],
.form-object fieldset select,
.form-object fieldset textarea {
  flex: 1;
  height: 22px;
  width: 98%;
  margin: 0;
  padding: 3px;
  border: 1px solid #e4e4e4;
}
.form-object fieldset select {
  width: 100%;
  height: 28px;
}
.form-object fieldset input[type="text"].error,
.form-object fieldset input[type="number"].error,
.form-object fieldset select.error,
.form-object fieldset textarea.error {
  border-color: red;
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

@media screen and (max-width: 1024px) {
  .form-object fieldset {
    min-width: 48.5%;
    max-width: 48.5%;
  }
}
@media screen and (max-width: 769px) {
  .form-object fieldset {
    min-width: 48%;
    max-width: 48%;
  }
}
@media screen and (max-width: 650px) {
  .form-object fieldset {
    min-width: 99%;
    max-width: 99%;
    margin: 3px 0;
  }
}
</style>
