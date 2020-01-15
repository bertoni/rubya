import IntegerType from '@/DataStructure/IntegerType.js'

describe('IntegerType.js', () => {
  it('should construct object correctly', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      multipleOf: 2,
      minimum: 2,
      exclusiveMinimum: 2,
      maximum: 10,
      exclusiveMaximum: 10
    }
    const integerType = new IntegerType(structure, 'field')
    expect(integerType.name).toEqual('field')
    expect(integerType.type).toEqual('integer')
    expect(integerType.title).toEqual(structure.title)
    expect(integerType.id).toEqual(structure.id)
    expect(integerType.description).toEqual(structure.description)
    expect(integerType.multipleOf).toEqual(structure.multipleOf)
    expect(integerType.minimum).toEqual(structure.minimum)
    expect(integerType.exclusiveMinimum).toEqual(structure.exclusiveMinimum)
    expect(integerType.maximum).toEqual(structure.maximum)
    expect(integerType.exclusiveMaximum).toEqual(structure.exclusiveMaximum)
  })

  it('should construct object correctly with empty parameters', () => {
    const integerType = new IntegerType({})
    expect(integerType.name).toEqual('')
    expect(integerType.type).toEqual('integer')
    expect(integerType.title).toEqual('')
    expect(integerType.id).toEqual('')
    expect(integerType.description).toEqual('')
    expect(integerType.multipleOf).toEqual(null)
    expect(integerType.minimum).toEqual(null)
    expect(integerType.exclusiveMinimum).toEqual(null)
    expect(integerType.maximum).toEqual(null)
    expect(integerType.exclusiveMaximum).toEqual(null)
  })

  it('should return json', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      multipleOf: 2,
      minimum: 2,
      exclusiveMinimum: 2,
      maximum: 10,
      exclusiveMaximum: 10
    }
    const integerType = new IntegerType(structure, 'field')
    const json = integerType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'integer',
      'title': structure.title,
      'description': structure.description,
      'multipleOf': structure.multipleOf,
      'minimum': structure.minimum,
      'exclusiveMinimum': structure.exclusiveMinimum,
      'maximum': structure.maximum,
      'exclusiveMaximum': structure.exclusiveMaximum
    })
  })

  it('should return json without empty fields', () => {
    const structure = {}
    const integerType = new IntegerType(structure, 'field')
    const json = integerType.toJson()
    expect(json).toEqual({
      'type': 'integer'
    })
  })
})
