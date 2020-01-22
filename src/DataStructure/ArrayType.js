import BaseType from './BaseType.js'

function ArrayType (structure, name) {
  BaseType.call(this, structure, name)
  this.type = 'array'
  this.items = structure.items || []
  this.additionalItems = structure.additionalItems || false
  this.uniqueItems = structure.uniqueItems || false
  this.minItems = structure.minItems || null
  this.maxItems = structure.maxItems || null
}

ArrayType.prototype.toJson = function () {
  let obj = BaseType.prototype.toJson.call(this)
  obj.type = this.type
  if (Array.isArray(this.items)) {
    obj.items = []
    for (let idx in this.items) {
      obj.items.push(this.items[idx].toJson())
    }
  } else {
    obj.items = this.items.toJson()
  }
  if (typeof this.additionalItems === 'boolean') obj.additionalItems = this.additionalItems
  if (typeof this.uniqueItems === 'boolean') obj.uniqueItems = this.uniqueItems
  if (typeof this.minItems === 'number') obj.minItems = this.minItems
  if (typeof this.maxItems === 'number') obj.maxItems = this.maxItems
  return obj
}

ArrayType.prototype.constructor = ArrayType

export default ArrayType
