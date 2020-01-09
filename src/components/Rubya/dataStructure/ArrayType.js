import BaseType from './BaseType'

class ArrayType extends BaseType {
  type = 'array'
  items = []
  additionalItems = false
  uniqueItems = false
  minItems = null
  maxItems = null

  constructor (structure, name) {
    super(structure, name)
    if (structure.additionalItems) {
      this.additionalItems = structure.additionalItems
    }
    if (structure.uniqueItems) {
      this.uniqueItems = structure.uniqueItems
    }
    if (structure.minItems) {
      this.minItems = structure.minItems
    }
    if (structure.maxItems) {
      this.maxItems = structure.maxItems
    }
  }

  toJson () {
    let obj = super.toJson()
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
}

export default ArrayType
