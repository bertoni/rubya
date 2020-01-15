import StringType from '@/DataStructure/StringType.js'

describe('StringType.js', () => {
  it('should construct object correctly', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      minLength: 1,
      maxLength: 100,
      pattern: '/[0-9]/',
      format: 'date'
    }
    const stringType = new StringType(structure, 'field')
    expect(stringType.name).toEqual('field')
    expect(stringType.type).toEqual('string')
    expect(stringType.title).toEqual(structure.title)
    expect(stringType.id).toEqual(structure.id)
    expect(stringType.description).toEqual(structure.description)
    expect(stringType.minLength).toEqual(structure.minLength)
    expect(stringType.maxLength).toEqual(structure.maxLength)
    expect(stringType.pattern).toEqual(structure.pattern)
    expect(stringType.format).toEqual(structure.format)
  })

  it('should construct object correctly with empty parameters', () => {
    const stringType = new StringType({})
    expect(stringType.name).toEqual('')
    expect(stringType.type).toEqual('string')
    expect(stringType.title).toEqual('')
    expect(stringType.id).toEqual('')
    expect(stringType.description).toEqual('')
    expect(stringType.minLength).toEqual(null)
    expect(stringType.maxLength).toEqual(null)
    expect(stringType.pattern).toEqual(null)
    expect(stringType.format).toEqual(null)
  })

  it('should return json', () => {
    const structure = {
      title: 'a title',
      id: '$123',
      description: 'Some description',
      minLength: 1,
      maxLength: 100,
      pattern: '/[0-9]/',
      format: 'date'
    }
    const stringType = new StringType(structure, 'field')
    const json = stringType.toJson()
    expect(json).toEqual({
      '$id': structure.id,
      'type': 'string',
      'title': structure.title,
      'description': structure.description,
      'minLength': structure.minLength,
      'maxLength': structure.maxLength,
      'pattern': structure.pattern,
      'format': structure.format
    })
  })

  it('should return json without empty fields', () => {
    const structure = {}
    const stringType = new StringType(structure, 'field')
    const json = stringType.toJson()
    expect(json).toEqual({
      'type': 'string'
    })
  })
})
