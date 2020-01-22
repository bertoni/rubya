import BaseType from './BaseType.js'

function ObjectType (structure, name) {
  BaseType.call(this, structure, name)
  this.type = 'object'
  this.properties = Array.isArray(structure.properties) ? structure.properties : []
  this.required = structure.required || []
  this.additionalProperties = structure.additionalProperties || false
  this.minProperties = structure.minProperties || null
  this.maxProperties = structure.maxProperties || null
}

ObjectType.prototype.toJson = function () {
  let obj = BaseType.prototype.toJson.call(this)
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

ObjectType.prototype.constructor = ObjectType

export default ObjectType
