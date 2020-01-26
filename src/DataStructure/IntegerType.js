import BaseType from './BaseType.js'

function IntegerType (structure, name) {
  BaseType.call(this, structure, name)
  this.type = 'integer'
  this.multipleOf = (typeof structure.multipleOf === 'number') ? structure.multipleOf : null
  this.minimum = (typeof structure.minimum === 'number') ? structure.minimum : null
  this.exclusiveMinimum = (typeof structure.exclusiveMinimum === 'number') ? structure.exclusiveMinimum : null
  this.maximum = (typeof structure.maximum === 'number') ? structure.maximum : null
  this.exclusiveMaximum = (typeof structure.exclusiveMaximum === 'number') ? structure.exclusiveMaximum : null
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
