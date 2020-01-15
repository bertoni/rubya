import IntegerType from './IntegerType.js'

function NumberType (structure, name) {
  IntegerType.call(this, structure, name)
  this.type = 'number'
}

NumberType.prototype.toJson = function () {
  let obj = IntegerType.prototype.toJson.call(this)
  obj.type = this.type
  return obj
}

NumberType.prototype.constructor = NumberType

export default NumberType
