import ArrayType from '@/DataStructure/ArrayType.js'
import BooleanType from '@/DataStructure/BooleanType.js'

describe('ArrayType.js', () => {
  it('should construct object correctly', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const arrayType = new ArrayType(structure, 'field')
    expect(arrayType.name).toEqual('field')
    expect(arrayType.type).toEqual('array')
    expect(arrayType.title).toEqual(structure.title)
    expect(arrayType.id).toEqual(structure.id)
    expect(arrayType.description).toEqual(structure.description)
    expect(arrayType.items).toEqual([])
    expect(arrayType.additionalItems).toEqual(structure.additionalItems)
    expect(arrayType.uniqueItems).toEqual(structure.uniqueItems)
    expect(arrayType.minItems).toEqual(structure.minItems)
    expect(arrayType.maxItems).toEqual(structure.maxItems)
  })

  it('should construct object correctly with empty parameters', () => {
    const arrayType = new ArrayType({})
    expect(arrayType.name).toEqual('')
    expect(arrayType.type).toEqual('array')
    expect(arrayType.title).toEqual('')
    expect(arrayType.id).toEqual('')
    expect(arrayType.description).toEqual('')
    expect(arrayType.items).toEqual([])
    expect(arrayType.additionalItems).toEqual(false)
    expect(arrayType.uniqueItems).toEqual(false)
    expect(arrayType.minItems).toEqual(null)
    expect(arrayType.maxItems).toEqual(null)
  })

  it('should return json', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const arrayType = new ArrayType(structure, 'field')
    const json = arrayType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'array',
      'title': structure.title,
      'description': structure.description,
      'items': [],
      'additionalItems': structure.additionalItems,
      'uniqueItems': structure.uniqueItems,
      'minItems': structure.minItems,
      'maxItems': structure.maxItems
    })
  })

  it('should return json with child items in array', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const arrayType = new ArrayType(structure, 'field')
    const booleanType = new BooleanType({}, '0')
    arrayType.items.push(booleanType)
    const json = arrayType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'array',
      'title': structure.title,
      'description': structure.description,
      'items': [
        {
          'type': 'boolean'
        }
      ],
      'additionalItems': structure.additionalItems,
      'uniqueItems': structure.uniqueItems,
      'minItems': structure.minItems,
      'maxItems': structure.maxItems
    })
  })

  it('should return json with child items in object', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const arrayType = new ArrayType(structure, 'field')
    const booleanType = new BooleanType({}, '0')
    arrayType.items = booleanType
    const json = arrayType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'array',
      'title': structure.title,
      'description': structure.description,
      'items': {
        'type': 'boolean'
      },
      'additionalItems': structure.additionalItems,
      'uniqueItems': structure.uniqueItems,
      'minItems': structure.minItems,
      'maxItems': structure.maxItems
    })
  })

  it('should return json without empty fields', () => {
    const structure = {
      additionalItems: 'abc',
      uniqueItems: 'abc'
    }
    const arrayType = new ArrayType(structure, 'field')
    const json = arrayType.toJson()
    expect(json).toEqual({
      'type': 'array',
      'items': []
    })
  })
})
