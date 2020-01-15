<template>
  <ObjectTemplate
    v-if="tree !== null"
    :originalObject="tree"
    :allowChangeName="false"
    @removeMe="removeChild"
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
.child-template .actions button.edit {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zODQuMDAwMDAwLCAtMTkyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0zODUsMjAzLjk1MDgwNiBMMzg5LDIwOCBMMzg1LDIwOCBaIE0zOTIsMTk2IEwzOTYsMjAwIEwzODkuOTc4NjM4LDIwNy4wNDQxODkgTDM4NiwyMDMgWiBNMzk0LjA4NDYxOSwxOTMuNzgxNDk3IEMzOTQuNzA5NDU4LDE5My4xNTY2NTggMzk1LjkwOTI5LDE5My4zNDM0MjYgMzk2Ljc2NDUxOCwxOTQuMTk4NjU0IEwzOTcuNTM4NzgyLDE5NC45NzI5MTggQzM5OC4zOTQwMTEsMTk1LjgyODE0NyAzOTguNTgwNzc4LDE5Ny4wMjc5NzkgMzk3Ljk1NTk0LDE5Ny42NTI4MTcgTDM5Ni43MjAzOTQsMTk4Ljg4ODM2MyBMMzkyLjg0OTA3NCwxOTUuMDE3MDQzIFogTTM5NC4wODQ2MTksMTkzLjc4MTQ5NyIgaWQ9IlRyaWFuZ2xlIDMxMyIvPjwvZz48L2c+PC9zdmc+) center center no-repeat;
}
.child-template .actions button.remove {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzYuMDAwMDAwLCAtMTkyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0zNDcuOTk5OTU5LDE5NSBMMzUwLDE5NSBMMzUwLDE5NiBMMzQ5LDE5NiBMMzQ5LDIwNy4wMDE0OTggQzM0OSwyMDcuNTUyNTExIDM0OC41NTQyNjUsMjA4IDM0OC4wMDQ0MjMsMjA4IEwzMzguOTk1NTc3LDIwOCBDMzM4LjQ0NDgzNywyMDggMzM4LDIwNy41NTI5NTUgMzM4LDIwNy4wMDE0OTggTDMzOCwxOTYgTDMzNywxOTYgTDMzNywxOTUgTDMzOC45OTU1NzcsMTk1IEwzMzkuMDAwMDQyLDE5NSBMMzM5LDE5NC45OTA2MzEgTDMzOSwxOTMuMDA5MzY5IEMzMzksMTkyLjQ0MzM1MyAzMzkuNDQ2NjE2LDE5MiAzMzkuOTk3NTQ1LDE5MiBMMzQ3LjAwMjQ1NSwxOTIgQzM0Ny41NTM2ODksMTkyIDM0OCwxOTIuNDUxOTEgMzQ4LDE5My4wMDkzNjkgTDM0OCwxOTQuOTkwNjMxIFogTTM0MCwxOTQgTDM0MCwxOTUgTDM0NywxOTUgTDM0NywxOTQgQzM0NywxOTMuNDQ3NzE1IDM0Ni41NTIyODUsMTkzIDM0NiwxOTMgTDM0MSwxOTMgQzM0MC40NDc3MTUsMTkzIDM0MCwxOTMuNDQ3NzE1IDM0MCwxOTQgWiBNMzM5LDE5NiBMMzM5LDIwNyBMMzQ4LDIwNyBMMzQ4LDE5NiBaIE0zNDEsMTk3IEwzNDIsMTk3IEwzNDIsMjA2IEwzNDEsMjA2IFogTTM0MywxOTcgTDM0NCwxOTcgTDM0NCwyMDYgTDM0MywyMDYgWiBNMzQ1LDE5NyBMMzQ1LDIwNiBMMzQ2LDIwNiBMMzQ2LDE5NyBMMzQ1LDE5NyBaIE0zNDUsMTk3IiBpZD0iUmVjdGFuZ2xlIDE1OSIvPjwvZz48L2c+PC9zdmc+) center center no-repeat;
}
.child-template .actions button.new {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NzIuMDAwMDAwLCAtMTQ0LjAwMDAwMCkiPjxwYXRoIGQ9Ik02NzgsMTQ0IEw2ODIsMTQ0IEw2ODIsMTUwIEw2ODgsMTUwIEw2ODgsMTU0IEw2ODIsMTU0IEw2ODIsMTYwIEw2NzgsMTYwIEw2NzgsMTU0IEw2NzIsMTU0IEw2NzIsMTUwIEw2NzgsMTUwIFogTTY3OCwxNDQiIGlkPSJSZWN0YW5nbGUgMjA0Ii8+PC9nPjwvZz48L3N2Zz4=) center center no-repeat;
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
