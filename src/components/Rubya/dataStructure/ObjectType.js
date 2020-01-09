import BaseType from './BaseType'

class ObjectType extends BaseType {
  type = 'object'
  properties = []
  required = []
  additionalProperties = false
  minProperties = null
  maxProperties = null

  constructor (structure, name) {
    super(structure, name)
    if (structure.required) {
      this.required = structure.required
    }
    if (structure.additionalProperties) {
      this.additionalProperties = structure.additionalProperties
    }
    if (structure.minProperties) {
      this.minProperties = structure.minProperties
    }
    if (structure.maxProperties) {
      this.maxProperties = structure.maxProperties
    }
  }

  toJson () {
    let obj = super.toJson()
    obj.type = this.type
    obj.properties = {}
    for (let idx in this.properties) {
      obj.properties[this.properties[idx]['name']] = this.properties[idx].toJson()
    }
    obj.required = this.required
    if (typeof this.additionalProperties === 'boolean') obj.additionalProperties = this.additionalProperties
    if (typeof this.minProperties === 'number') obj.minProperties = this.minProperties
    if (typeof this.maxProperties === 'number') obj.maxProperties = this.maxProperties
    return obj
  }
}

export default ObjectType
