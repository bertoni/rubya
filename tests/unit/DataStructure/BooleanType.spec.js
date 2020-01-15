import BooleanType from '@/DataStructure/BooleanType.js'

describe('BooleanType.js', () => {
  it('should construct object correctly', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description'
    }
    const booleanType = new BooleanType(structure, 'field')
    expect(booleanType.name).toEqual('field')
    expect(booleanType.type).toEqual('boolean')
    expect(booleanType.title).toEqual(structure.title)
    expect(booleanType.id).toEqual(structure.id)
    expect(booleanType.description).toEqual(structure.description)
  })

  it('should construct object correctly with empty parameters', () => {
    const booleanType = new BooleanType({})
    expect(booleanType.name).toEqual('')
    expect(booleanType.type).toEqual('boolean')
    expect(booleanType.title).toEqual('')
    expect(booleanType.id).toEqual('')
    expect(booleanType.description).toEqual('')
  })

  it('should return json', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description'
    }
    const booleanType = new BooleanType(structure, 'field')
    const json = booleanType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'boolean',
      'title': structure.title,
      'description': structure.description
    })
  })

  it('should return json without empty fields', () => {
    const structure = {}
    const booleanType = new BooleanType(structure, 'field')
    const json = booleanType.toJson()
    expect(json).toEqual({
      'type': 'boolean'
    })
  })
})
