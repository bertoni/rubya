function BaseType (structure, name) {
  this.name = name || ''
  this.title = structure.title || ''
  this.id = structure.id || ''
  this.description = structure.description || ''
}

BaseType.prototype.toJson = function () {
  let obj = {}
  if (this.id) obj['$id'] = this.id
  if (this.title) obj['title'] = this.title
  if (this.description) obj['description'] = this.description
  return obj
}

export default BaseType
