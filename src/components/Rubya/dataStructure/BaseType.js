class BaseType {
  name = ''
  title = ''
  id = ''
  description = ''

  constructor (structure, name) {
    if (name) {
      this.name = name
    }
    if (structure.title) {
      this.title = structure.title
    }
    if (structure.id) {
      this.id = structure.id
    }
    if (structure.description) {
      this.description = structure.description
    }
  }

  toJson () {
    let obj = {}
    if (this.id) obj['$id'] = this.id
    if (this.title) obj['title'] = this.title
    if (this.description) obj['description'] = this.description
    return obj
  }
}

export default BaseType
