import BaseType from './BaseType'

class BooleanType extends BaseType {
  type = 'boolean'

  toJson () {
    let obj = super.toJson()
    obj.type = this.type
    return obj
  }
}

export default BooleanType
