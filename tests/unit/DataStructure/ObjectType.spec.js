import ObjectType from '@/DataStructure/ObjectType.js'
import BooleanType from '@/DataStructure/BooleanType.js'

describe('ObjectType.js', () => {
  it('should construct object correctly', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 10
    }
    const objectType = new ObjectType(structure, 'field')
    expect(objectType.name).toEqual('field')
    expect(objectType.type).toEqual('object')
    expect(objectType.title).toEqual(structure.title)
    expect(objectType.id).toEqual(structure.id)
    expect(objectType.description).toEqual(structure.description)
    expect(objectType.properties).toEqual([])
    expect(objectType.required).toEqual(structure.required)
    expect(objectType.additionalProperties).toEqual(structure.additionalProperties)
    expect(objectType.minProperties).toEqual(structure.minProperties)
    expect(objectType.maxProperties).toEqual(structure.maxProperties)
  })

  it('should construct object correctly with empty parameters', () => {
    const objectType = new ObjectType({})
    expect(objectType.name).toEqual('')
    expect(objectType.type).toEqual('object')
    expect(objectType.title).toEqual('')
    expect(objectType.id).toEqual('')
    expect(objectType.description).toEqual('')
    expect(objectType.properties).toEqual([])
    expect(objectType.required).toEqual([])
    expect(objectType.additionalProperties).toEqual(false)
    expect(objectType.minProperties).toEqual(null)
    expect(objectType.maxProperties).toEqual(null)
  })

  it('should return json', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 10
    }
    const objectType = new ObjectType(structure, 'field')
    const json = objectType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'object',
      'title': structure.title,
      'description': structure.description,
      'properties': {},
      'required': structure.required,
      'additionalProperties': structure.additionalProperties,
      'minProperties': structure.minProperties,
      'maxProperties': structure.maxProperties
    })
  })

  it('should return json with child properties', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 10
    }
    const objectType = new ObjectType(structure, 'field')
    const booleanType = new BooleanType({}, 'field')
    objectType.properties.push(booleanType)
    const json = objectType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'object',
      'title': structure.title,
      'description': structure.description,
      'properties': {
        'field': {
          'type': 'boolean'
        }
      },
      'required': structure.required,
      'additionalProperties': structure.additionalProperties,
      'minProperties': structure.minProperties,
      'maxProperties': structure.maxProperties
    })
  })

  it('should return json without empty fields', () => {
    const structure = {
      additionalProperties: 'abc'
    }
    const objectType = new ObjectType(structure, 'field')
    const json = objectType.toJson()
    expect(json).toEqual({
      'type': 'object',
      'properties': {},
      'required': []
    })
  })
})
