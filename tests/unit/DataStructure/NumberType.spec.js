import NumberType from '@/DataStructure/NumberType.js'

describe('NumberType.js', () => {
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
    const numberType = new NumberType(structure, 'field')
    expect(numberType.name).toEqual('field')
    expect(numberType.type).toEqual('number')
    expect(numberType.title).toEqual(structure.title)
    expect(numberType.id).toEqual(structure.id)
    expect(numberType.description).toEqual(structure.description)
    expect(numberType.multipleOf).toEqual(structure.multipleOf)
    expect(numberType.minimum).toEqual(structure.minimum)
    expect(numberType.exclusiveMinimum).toEqual(structure.exclusiveMinimum)
    expect(numberType.maximum).toEqual(structure.maximum)
    expect(numberType.exclusiveMaximum).toEqual(structure.exclusiveMaximum)
  })

  it('should construct object correctly with empty parameters', () => {
    const numberType = new NumberType({})
    expect(numberType.name).toEqual('')
    expect(numberType.type).toEqual('number')
    expect(numberType.title).toEqual('')
    expect(numberType.id).toEqual('')
    expect(numberType.description).toEqual('')
    expect(numberType.multipleOf).toEqual(null)
    expect(numberType.minimum).toEqual(null)
    expect(numberType.exclusiveMinimum).toEqual(null)
    expect(numberType.maximum).toEqual(null)
    expect(numberType.exclusiveMaximum).toEqual(null)
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
    const numberType = new NumberType(structure, 'field')
    const json = numberType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'number',
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
    const numberType = new NumberType(structure, 'field')
    const json = numberType.toJson()
    expect(json).toEqual({
      'type': 'number'
    })
  })
})
