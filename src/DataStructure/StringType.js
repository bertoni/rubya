import BaseType from './BaseType.js'

function StringType (structure, name) {
  BaseType.call(this, structure, name)
  this.type = 'string'
  this.minLength = structure.minLength || null
  this.maxLength = structure.maxLength || null
  this.pattern = structure.pattern || null
  this.format = structure.format || null
}

StringType.prototype.toJson = function () {
  let obj = BaseType.prototype.toJson.call(this)
  obj.type = this.type
  if (typeof this.minLength === 'number') obj['minLength'] = this.minLength
  if (typeof this.maxLength === 'number') obj['maxLength'] = this.maxLength
  if (typeof this.pattern === 'string') obj['pattern'] = this.pattern
  if (typeof this.format === 'string') obj['format'] = this.format
  return obj
}

StringType.prototype.constructor = StringType

export default StringType
