import BaseType from '@/DataStructure/BaseType.js'

describe('BaseType.js', () => {
  it('should construct object correctly', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description'
    }
    const baseType = new BaseType(structure, 'field')
    expect(baseType.name).toEqual('field')
    expect(baseType.title).toEqual(structure.title)
    expect(baseType.id).toEqual(structure.id)
    expect(baseType.description).toEqual(structure.description)
  })

  it('should construct object correctly with empty parameters', () => {
    const baseType = new BaseType({})
    expect(baseType.name).toEqual('')
    expect(baseType.title).toEqual('')
    expect(baseType.id).toEqual('')
    expect(baseType.description).toEqual('')
  })

  it('should return json', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description'
    }
    const baseType = new BaseType(structure, 'field')
    const json = baseType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'title': structure.title,
      'description': structure.description
    })
  })

  it('should return json without empty fields', () => {
    const structure = {}
    const baseType = new BaseType(structure, 'field')
    const json = baseType.toJson()
    expect(json).toEqual({})
  })
})
