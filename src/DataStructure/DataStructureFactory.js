import ObjectType from './ObjectType.js'
import StringType from './StringType.js'
import IntegerType from './IntegerType.js'
import NumberType from './NumberType.js'
import BooleanType from './BooleanType.js'
import ArrayType from './ArrayType.js'

/* istanbul ignore next */
function DataStructureFactory () {}

DataStructureFactory.create = function (structure, name) {
  if (structure.type === 'object') {
    let objectType = new ObjectType(structure, name)
    if (structure.properties && structure.properties instanceof Object && Object.keys(structure.properties).length) {
      objectType.properties = []
      for (let idx in structure.properties) {
        let child = this.create(structure.properties[idx], idx)
        if (!(child instanceof Error)) {
          objectType.properties.push(child)
        }
      }
    }
    return objectType
  }

  if (structure.type === 'array') {
    let arrayType = new ArrayType(structure, name)
    if (structure.items) {
      if (Array.isArray(structure.items) && structure.items.length) {
        arrayType.items = []
        for (let idx in structure.items) {
          let child = this.create(structure.items[idx], idx.toString())
          if (!(child instanceof Error)) {
            arrayType.items.push(child)
          }
        }
      } else if (structure.items instanceof Object && Object.keys(structure.items).length) {
        let child = this.create(structure.items, null)
        if (!(child instanceof Error)) {
          arrayType.items = child
        }
      }
    }
    return arrayType
  }

  if (structure.type === 'string') {
    return new StringType(structure, name)
  }

  if (structure.type === 'integer') {
    return new IntegerType(structure, name)
  }

  if (structure.type === 'number') {
    return new NumberType(structure, name)
  }

  if (structure.type === 'boolean') {
    return new BooleanType(structure, name)
  }

  return Error('type not recognized')
}

export default DataStructureFactory
