<template>
  <div class="actions">
    <button class="main"><label></label></button>
    <ul>
      <li v-if="showEdit" @click.prevent="edit"><button class="edit"><label></label></button></li>
      <li v-if="showAdd" @click.prevent="add"><button class="new"><label></label></button></li>
      <li v-if="showRemove" @click.prevent="remove"><button class="remove"><label></label></button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FloatingMenu',
  props: {
    showEdit: {
      type: Boolean,
      default: () => true
    },
    showAdd: {
      type: Boolean,
      default: () => true
    },
    showRemove: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    edit () {
      this.$emit('edit')
    },
    add () {
      this.$emit('add')
    },
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped>
.actions {
  position: absolute;
  top: 10px;
  left: -41px;
  height: 32px;
  min-width: 32px;
}
.actions button {
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  background-color: #efefef;
  border: none;
  color: white;
}
.actions button.main {
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transition: .2s ease-out;
  -moz-transition: .2s ease-out;
  transition: .2s ease-out;
  z-index: 2;
}
.actions button.main label {
  cursor: pointer;
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 0 0 4px;
  padding: 0;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZmlsbD0id2hpdGUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4wIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjUiIHI9IjIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjE5IiByPSIyIi8+PC9zdmc+Cg==);
  background-position: center center;
  background-repeat: no-repeat;
}
.actions ul {
  position: absolute;
  display: flex;
  left: 35px;
  top: 0;
  min-width: 32px;
  min-height: 32px;
  padding: 0;
  margin: 0;
  list-style: none;
  -webkit-transition: .2s ease-out;
  -moz-transition: .2s ease-out;
  transition: .2s ease-out;
  z-index: 1;
}
.actions ul li {
  visibility: hidden;
  position: relative;
  opacity: 0;
  -webkit-transition: .3s ease-out;
  -moz-transition: .3s ease-out;
  transition: .3s ease-out;
  z-index: 1;
}
.actions ul li button {
  position: relative;
  background-color: darkgrey;
  -webkit-transition: .2s ease-out;
  -moz-transition: .2s ease-out;
  transition: .2s ease-out;
}
.actions button.main:active,
.actions button.main:focus {
  outline: none;
  background-color: #ece1e1;
}
.actions button.main:active label,
.actions button.main:focus label {
  width: 17px;
  height: 25px;
  margin: 0 0 0 8px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uR3JhcGhpYy1TdHlsZXtmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDoycHg7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZS8+PHBvbHlsaW5lIGNsYXNzPSJHcmFwaGljLVN0eWxlIiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgaWQ9Il9QYXRoXyIgcG9pbnRzPSI3LjY2IDMuNDEgMTYuMzQgMTIuMSA3Ljg2IDIwLjU5Ii8+PC9zdmc+Cg==);
}
.actions button.main:active + ul li,
.actions button.main:focus + ul li {
  visibility: visible;
  opacity: 1;
  margin-right: 7px;
  z-index: 3;
}
.actions ul li button label {
  cursor: pointer;
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 0 0 6px;
  padding: 0;
  background-position: center center;
  background-repeat: no-repeat;
}
.actions ul li button.edit label {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSJ3aGl0ZSIgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzg0LjAwMDAwMCwgLTE5Mi4wMDAwMDApIj48cGF0aCBkPSJNMzg1LDIwMy45NTA4MDYgTDM4OSwyMDggTDM4NSwyMDggWiBNMzkyLDE5NiBMMzk2LDIwMCBMMzg5Ljk3ODYzOCwyMDcuMDQ0MTg5IEwzODYsMjAzIFogTTM5NC4wODQ2MTksMTkzLjc4MTQ5NyBDMzk0LjcwOTQ1OCwxOTMuMTU2NjU4IDM5NS45MDkyOSwxOTMuMzQzNDI2IDM5Ni43NjQ1MTgsMTk0LjE5ODY1NCBMMzk3LjUzODc4MiwxOTQuOTcyOTE4IEMzOTguMzk0MDExLDE5NS44MjgxNDcgMzk4LjU4MDc3OCwxOTcuMDI3OTc5IDM5Ny45NTU5NCwxOTcuNjUyODE3IEwzOTYuNzIwMzk0LDE5OC44ODgzNjMgTDM5Mi44NDkwNzQsMTk1LjAxNzA0MyBaIE0zOTQuMDg0NjE5LDE5My43ODE0OTciIGlkPSJUcmlhbmdsZSAzMTMiLz48L2c+PC9nPjwvc3ZnPgo=);
}
.actions ul li button.remove label {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSJ3aGl0ZSIgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzM2LjAwMDAwMCwgLTE5Mi4wMDAwMDApIj48cGF0aCBkPSJNMzQ3Ljk5OTk1OSwxOTUgTDM1MCwxOTUgTDM1MCwxOTYgTDM0OSwxOTYgTDM0OSwyMDcuMDAxNDk4IEMzNDksMjA3LjU1MjUxMSAzNDguNTU0MjY1LDIwOCAzNDguMDA0NDIzLDIwOCBMMzM4Ljk5NTU3NywyMDggQzMzOC40NDQ4MzcsMjA4IDMzOCwyMDcuNTUyOTU1IDMzOCwyMDcuMDAxNDk4IEwzMzgsMTk2IEwzMzcsMTk2IEwzMzcsMTk1IEwzMzguOTk1NTc3LDE5NSBMMzM5LjAwMDA0MiwxOTUgTDMzOSwxOTQuOTkwNjMxIEwzMzksMTkzLjAwOTM2OSBDMzM5LDE5Mi40NDMzNTMgMzM5LjQ0NjYxNiwxOTIgMzM5Ljk5NzU0NSwxOTIgTDM0Ny4wMDI0NTUsMTkyIEMzNDcuNTUzNjg5LDE5MiAzNDgsMTkyLjQ1MTkxIDM0OCwxOTMuMDA5MzY5IEwzNDgsMTk0Ljk5MDYzMSBaIE0zNDAsMTk0IEwzNDAsMTk1IEwzNDcsMTk1IEwzNDcsMTk0IEMzNDcsMTkzLjQ0NzcxNSAzNDYuNTUyMjg1LDE5MyAzNDYsMTkzIEwzNDEsMTkzIEMzNDAuNDQ3NzE1LDE5MyAzNDAsMTkzLjQ0NzcxNSAzNDAsMTk0IFogTTMzOSwxOTYgTDMzOSwyMDcgTDM0OCwyMDcgTDM0OCwxOTYgWiBNMzQxLDE5NyBMMzQyLDE5NyBMMzQyLDIwNiBMMzQxLDIwNiBaIE0zNDMsMTk3IEwzNDQsMTk3IEwzNDQsMjA2IEwzNDMsMjA2IFogTTM0NSwxOTcgTDM0NSwyMDYgTDM0NiwyMDYgTDM0NiwxOTcgTDM0NSwxOTcgWiBNMzQ1LDE5NyIgaWQ9IlJlY3RhbmdsZSAxNTkiLz48L2c+PC9nPjwvc3ZnPgo=);
}
.actions ul li button.new label {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSJ3aGl0ZSIgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjcyLjAwMDAwMCwgLTE0NC4wMDAwMDApIj48cGF0aCBkPSJNNjc4LDE0NCBMNjgyLDE0NCBMNjgyLDE1MCBMNjg4LDE1MCBMNjg4LDE1NCBMNjgyLDE1NCBMNjgyLDE2MCBMNjc4LDE2MCBMNjc4LDE1NCBMNjcyLDE1NCBMNjcyLDE1MCBMNjc4LDE1MCBaIE02NzgsMTQ0IiBpZD0iUmVjdGFuZ2xlIDIwNCIvPjwvZz48L2c+PC9zdmc+Cg==);
}
.actions ul li button.edit:hover {
  background-color: #6eb4fd;
}
.actions ul li button.remove:hover {
  background-color: #fd6e6e;
}
.actions ul li button.new:hover {
  background-color: #6efda7;
}
</style>
