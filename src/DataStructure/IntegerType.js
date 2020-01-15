import BaseType from './BaseType.js'

function IntegerType (structure, name) {
  BaseType.call(this, structure, name)
  this.type = 'integer'
  this.multipleOf = structure.multipleOf || null
  this.minimum = structure.minimum || null
  this.exclusiveMinimum = structure.exclusiveMinimum || null
  this.maximum = structure.maximum || null
  this.exclusiveMaximum = structure.exclusiveMaximum || null
}

IntegerType.prototype.toJson = function () {
  let obj = BaseType.prototype.toJson.call(this)
  obj.type = this.type
  if (typeof this.multipleOf === 'number') obj['multipleOf'] = this.multipleOf
  if (typeof this.minimum === 'number') obj['minimum'] = this.minimum
  if (typeof this.exclusiveMinimum === 'number') obj['exclusiveMinimum'] = this.exclusiveMinimum
  if (typeof this.maximum === 'number') obj['maximum'] = this.maximum
  if (typeof this.exclusiveMaximum === 'number') obj['exclusiveMaximum'] = this.exclusiveMaximum
  return obj
}

IntegerType.prototype.constructor = IntegerType

export default IntegerType
