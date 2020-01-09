import BaseType from './BaseType'

class StringType extends BaseType {
  type = 'string'
  minLength = null
  maxLength = null
  pattern = null
  format = null

  constructor (structure, name) {
    super(structure, name)
    if (structure.minLength) {
      this.minLength = structure.minLength
    }
    if (structure.maxLength) {
      this.maxLength = structure.maxLength
    }
    if (structure.pattern) {
      this.pattern = structure.pattern
    }
    if (structure.format) {
      this.format = structure.format
    }
  }

  toJson () {
    let obj = super.toJson()
    obj.type = this.type
    if (typeof this.minLength === 'number') obj['minLength'] = this.minLength
    if (typeof this.maxLength === 'number') obj['maxLength'] = this.maxLength
    if (typeof this.pattern === 'string') obj['pattern'] = this.pattern
    if (typeof this.format === 'string') obj['format'] = this.format
    return obj
  }
}

export default StringType
