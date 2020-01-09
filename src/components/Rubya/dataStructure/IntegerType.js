import BaseType from './BaseType'

class IntegerType extends BaseType {
  type = 'integer'
  multipleOf = null
  minimum = null
  exclusiveMinimum = null
  maximum = null
  exclusiveMaximum = null

  constructor (structure, name) {
    super(structure, name)
    if (structure.multipleOf) {
      this.multipleOf = structure.multipleOf
    }
    if (structure.minimum) {
      this.minimum = structure.minimum
    }
    if (structure.exclusiveMinimum) {
      this.exclusiveMinimum = structure.exclusiveMinimum
    }
    if (structure.maximum) {
      this.maximum = structure.maximum
    }
    if (structure.exclusiveMaximum) {
      this.exclusiveMaximum = structure.exclusiveMaximum
    }
  }

  toJson () {
    let obj = super.toJson()
    obj.type = this.type
    if (typeof this.multipleOf === 'number') obj['multipleOf'] = this.multipleOf
    if (typeof this.minimum === 'number') obj['minimum'] = this.minimum
    if (typeof this.exclusiveMinimum === 'number') obj['exclusiveMinimum'] = this.exclusiveMinimum
    if (typeof this.maximum === 'number') obj['maximum'] = this.maximum
    if (typeof this.exclusiveMaximum === 'number') obj['exclusiveMaximum'] = this.exclusiveMaximum
    return obj
  }
}

export default IntegerType
