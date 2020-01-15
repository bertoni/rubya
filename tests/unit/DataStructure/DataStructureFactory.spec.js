import DataStructureFactory from '@/DataStructure/DataStructureFactory.js'
import BooleanType from '@/DataStructure/BooleanType.js'
import IntegerType from '@/DataStructure/IntegerType.js'
import NumberType from '@/DataStructure/NumberType.js'
import StringType from '@/DataStructure/StringType.js'
import ArrayType from '@/DataStructure/ArrayType.js'
import ObjectType from '@/DataStructure/ObjectType.js'

describe('DataStructureFactory.js', () => {
  it('should create a BooleanType', () => {
    const structure = {
      title: 'a title',
      type: 'boolean',
      id: '$123',
      description: 'Some description'
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const booleanType = new BooleanType(structure, 'field')
    expect(tree.type).toEqual(booleanType.type)
    expect(tree.name).toEqual(booleanType.name)
    expect(tree.title).toEqual(booleanType.title)
    expect(tree.id).toEqual(booleanType.id)
    expect(tree.description).toEqual(booleanType.description)
  })

  it('should create a IntegerType', () => {
    const structure = {
      title: 'a title',
      type: 'integer',
      id: '$123',
      description: 'Some description',
      multipleOf: 2,
      minimum: 2,
      exclusiveMinimum: 2,
      maximum: 10,
      exclusiveMaximum: 10
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const integerType = new IntegerType(structure, 'field')
    expect(tree.type).toEqual(integerType.type)
    expect(tree.name).toEqual(integerType.name)
    expect(tree.title).toEqual(integerType.title)
    expect(tree.id).toEqual(integerType.id)
    expect(tree.description).toEqual(integerType.description)
    expect(tree.multipleOf).toEqual(integerType.multipleOf)
    expect(tree.minimum).toEqual(integerType.minimum)
    expect(tree.exclusiveMinimum).toEqual(integerType.exclusiveMinimum)
    expect(tree.maximum).toEqual(integerType.maximum)
    expect(tree.exclusiveMaximum).toEqual(integerType.exclusiveMaximum)
  })

  it('should create a NumberType', () => {
    const structure = {
      title: 'a title',
      type: 'number',
      id: '$123',
      description: 'Some description',
      multipleOf: 2,
      minimum: 2,
      exclusiveMinimum: 2,
      maximum: 10,
      exclusiveMaximum: 10
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const numberType = new NumberType(structure, 'field')
    expect(tree.type).toEqual(numberType.type)
    expect(tree.name).toEqual(numberType.name)
    expect(tree.title).toEqual(numberType.title)
    expect(tree.id).toEqual(numberType.id)
    expect(tree.description).toEqual(numberType.description)
    expect(tree.multipleOf).toEqual(numberType.multipleOf)
    expect(tree.minimum).toEqual(numberType.minimum)
    expect(tree.exclusiveMinimum).toEqual(numberType.exclusiveMinimum)
    expect(tree.maximum).toEqual(numberType.maximum)
    expect(tree.exclusiveMaximum).toEqual(numberType.exclusiveMaximum)
  })

  it('should create a StringType', () => {
    const structure = {
      title: 'a title',
      type: 'string',
      id: '$123',
      description: 'Some description',
      minLength: 1,
      maxLength: 100,
      pattern: '/[0-9]/',
      format: 'date'
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const stringType = new StringType(structure, 'field')
    expect(tree.type).toEqual(stringType.type)
    expect(tree.name).toEqual(stringType.name)
    expect(tree.title).toEqual(stringType.title)
    expect(tree.id).toEqual(stringType.id)
    expect(tree.description).toEqual(stringType.description)
    expect(tree.minLength).toEqual(stringType.minLength)
    expect(tree.maxLength).toEqual(stringType.maxLength)
    expect(tree.pattern).toEqual(stringType.pattern)
    expect(tree.format).toEqual(stringType.format)
  })

  it('should create a ArrayType', () => {
    const structure = {
      title: 'a title',
      type: 'array',
      id: '$123',
      description: 'Some description',
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const arrayType = new ArrayType(structure, 'field')
    expect(tree.type).toEqual(arrayType.type)
    expect(tree.name).toEqual(arrayType.name)
    expect(tree.title).toEqual(arrayType.title)
    expect(tree.id).toEqual(arrayType.id)
    expect(tree.items).toEqual(arrayType.items)
    expect(tree.description).toEqual(arrayType.description)
    expect(tree.additionalItems).toEqual(arrayType.additionalItems)
    expect(tree.uniqueItems).toEqual(arrayType.uniqueItems)
    expect(tree.minItems).toEqual(arrayType.minItems)
    expect(tree.maxItems).toEqual(arrayType.maxItems)
  })

  it('should create a ArrayType with items in array', () => {
    const structure = {
      title: 'a title',
      type: 'array',
      id: '$123',
      description: 'Some description',
      items: [
        {
          type: 'boolean'
        }
      ],
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const arrayType = new ArrayType(structure, 'field')
    expect(tree.type).toEqual(arrayType.type)
    expect(tree.name).toEqual(arrayType.name)
    expect(tree.title).toEqual(arrayType.title)
    expect(tree.id).toEqual(arrayType.id)
    expect(tree.items[0].type).toEqual('boolean')
    expect(tree.items[0].name).toEqual('0')
    expect(tree.description).toEqual(arrayType.description)
    expect(tree.additionalItems).toEqual(arrayType.additionalItems)
    expect(tree.uniqueItems).toEqual(arrayType.uniqueItems)
    expect(tree.minItems).toEqual(arrayType.minItems)
    expect(tree.maxItems).toEqual(arrayType.maxItems)
  })

  it('should create a ArrayType with wrong items in array', () => {
    const structure = {
      title: 'a title',
      type: 'array',
      id: '$123',
      description: 'Some description',
      items: [
        {
          type: 'bla'
        }
      ],
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const arrayType = new ArrayType(structure, 'field')
    expect(tree.type).toEqual(arrayType.type)
    expect(tree.name).toEqual(arrayType.name)
    expect(tree.title).toEqual(arrayType.title)
    expect(tree.id).toEqual(arrayType.id)
    expect(tree.items).toEqual([])
    expect(tree.description).toEqual(arrayType.description)
    expect(tree.additionalItems).toEqual(arrayType.additionalItems)
    expect(tree.uniqueItems).toEqual(arrayType.uniqueItems)
    expect(tree.minItems).toEqual(arrayType.minItems)
    expect(tree.maxItems).toEqual(arrayType.maxItems)
  })

  it('should create a ArrayType with items in object', () => {
    const structure = {
      title: 'a title',
      type: 'array',
      id: '$123',
      description: 'Some description',
      items: {
        type: 'boolean'
      },
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const arrayType = new ArrayType(structure, 'field')
    expect(tree.type).toEqual(arrayType.type)
    expect(tree.name).toEqual(arrayType.name)
    expect(tree.title).toEqual(arrayType.title)
    expect(tree.id).toEqual(arrayType.id)
    expect(tree.items.type).toEqual('boolean')
    expect(tree.description).toEqual(arrayType.description)
    expect(tree.additionalItems).toEqual(arrayType.additionalItems)
    expect(tree.uniqueItems).toEqual(arrayType.uniqueItems)
    expect(tree.minItems).toEqual(arrayType.minItems)
    expect(tree.maxItems).toEqual(arrayType.maxItems)
  })

  it('should create a ArrayType with wrong items in object', () => {
    const structure = {
      title: 'a title',
      type: 'array',
      id: '$123',
      description: 'Some description',
      items: {
        type: 'bla'
      },
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const arrayType = new ArrayType(structure, 'field')
    expect(tree.type).toEqual(arrayType.type)
    expect(tree.name).toEqual(arrayType.name)
    expect(tree.title).toEqual(arrayType.title)
    expect(tree.id).toEqual(arrayType.id)
    expect(tree.items).toEqual([])
    expect(tree.description).toEqual(arrayType.description)
    expect(tree.additionalItems).toEqual(arrayType.additionalItems)
    expect(tree.uniqueItems).toEqual(arrayType.uniqueItems)
    expect(tree.minItems).toEqual(arrayType.minItems)
    expect(tree.maxItems).toEqual(arrayType.maxItems)
  })

  it('should create a ArrayType with empty items in object', () => {
    const structure = {
      title: 'a title',
      type: 'array',
      id: '$123',
      description: 'Some description',
      items: {},
      additionalItems: true,
      uniqueItems: true,
      minItems: 1,
      maxItems: 5
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const arrayType = new ArrayType(structure, 'field')
    expect(tree.type).toEqual(arrayType.type)
    expect(tree.name).toEqual(arrayType.name)
    expect(tree.title).toEqual(arrayType.title)
    expect(tree.id).toEqual(arrayType.id)
    expect(tree.items).toEqual([])
    expect(tree.description).toEqual(arrayType.description)
    expect(tree.additionalItems).toEqual(arrayType.additionalItems)
    expect(tree.uniqueItems).toEqual(arrayType.uniqueItems)
    expect(tree.minItems).toEqual(arrayType.minItems)
    expect(tree.maxItems).toEqual(arrayType.maxItems)
  })

  it('should create a ObjectType', () => {
    const structure = {
      title: 'a title',
      type: 'object',
      id: '$123',
      description: 'Some description',
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 10
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const objectType = new ObjectType(structure, 'field')
    expect(tree.type).toEqual(objectType.type)
    expect(tree.name).toEqual(objectType.name)
    expect(tree.title).toEqual(objectType.title)
    expect(tree.id).toEqual(objectType.id)
    expect(tree.description).toEqual(objectType.description)
    expect(tree.properties).toEqual(objectType.properties)
    expect(tree.required).toEqual(objectType.required)
    expect(tree.additionalProperties).toEqual(objectType.additionalProperties)
    expect(tree.minProperties).toEqual(objectType.minProperties)
    expect(tree.maxProperties).toEqual(objectType.maxProperties)
  })

  it('should create a ObjectType with properties', () => {
    const structure = {
      title: 'a title',
      type: 'object',
      id: '$123',
      description: 'Some description',
      properties: {
        enable: {
          type: 'boolean'
        }
      },
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 10
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const objectType = new ObjectType(structure, 'field')
    expect(tree.type).toEqual(objectType.type)
    expect(tree.name).toEqual(objectType.name)
    expect(tree.title).toEqual(objectType.title)
    expect(tree.id).toEqual(objectType.id)
    expect(tree.description).toEqual(objectType.description)
    expect(tree.properties[0].type).toEqual('boolean')
    expect(tree.properties[0].name).toEqual('enable')
    expect(tree.required).toEqual(objectType.required)
    expect(tree.additionalProperties).toEqual(objectType.additionalProperties)
    expect(tree.minProperties).toEqual(objectType.minProperties)
    expect(tree.maxProperties).toEqual(objectType.maxProperties)
  })

  it('should create a ObjectType with worng properties', () => {
    const structure = {
      title: 'a title',
      type: 'object',
      id: '$123',
      description: 'Some description',
      properties: {
        enable: {
          type: 'bla'
        }
      },
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 10
    }
    const tree = DataStructureFactory.create(structure, 'field')
    const objectType = new ObjectType(structure, 'field')
    expect(tree.type).toEqual(objectType.type)
    expect(tree.name).toEqual(objectType.name)
    expect(tree.title).toEqual(objectType.title)
    expect(tree.id).toEqual(objectType.id)
    expect(tree.description).toEqual(objectType.description)
    expect(tree.properties).toEqual([])
    expect(tree.required).toEqual(objectType.required)
    expect(tree.additionalProperties).toEqual(objectType.additionalProperties)
    expect(tree.minProperties).toEqual(objectType.minProperties)
    expect(tree.maxProperties).toEqual(objectType.maxProperties)
  })

  it('should return Error with wrong type', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description'
    }
    const tree = DataStructureFactory.create(structure, 'field')
    expect(tree).toBeInstanceOf(Error)
    expect(tree.message).toEqual('type not recognized')
  })
})
