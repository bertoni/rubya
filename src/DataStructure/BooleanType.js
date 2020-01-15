import BaseType from './BaseType.js'

function BooleanType (structure, name) {
  BaseType.call(this, structure, name)
  this.type = 'boolean'
}

BooleanType.prototype.toJson = function () {
  let obj = BaseType.prototype.toJson.call(this)
  obj.type = this.type
  return obj
}

BooleanType.prototype.constructor = BooleanType

export default BooleanType
