import { shallowMount } from '@vue/test-utils'
import ObjectType from '@/DataStructure/ObjectType.js'
import BooleanType from '@/DataStructure/BooleanType.js'
import Rubya from '@/index.vue'

let wrapper

describe('index.vue', () => {
  it('should have methods', () => {
    expect(typeof Rubya.methods).toBe('object')
  })

  it('should have a getJsonSchema method', () => {
    expect(typeof Rubya.methods.getJsonSchema).toBe('function')
  })

  it('should have a generateTreeFromSchema method', () => {
    expect(typeof Rubya.methods.generateTreeFromSchema).toBe('function')
  })

  it('should have a removeChild method', () => {
    expect(typeof Rubya.methods.removeChild).toBe('function')
  })

  it('should have a childUpdated method', () => {
    expect(typeof Rubya.methods.childUpdated).toBe('function')
  })

  it('should have a translate method', () => {
    expect(typeof Rubya.methods.translate).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {
        schema: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          '$id': 'http://example.com/product.schema.json',
          'title': 'Object root',
          'description': 'Some description',
          'type': 'object',
          'properties': {},
          'required': []
        }
      }
    })
    expect(wrapper.name()).toBe('Rubya')
    expect(wrapper.vm.tree instanceof ObjectType).toBeTruthy()
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {}
    })
    expect(wrapper.name()).toBe('Rubya')
    expect(wrapper.vm.tree instanceof ObjectType).toBeTruthy()
  })

  it('should renders correctly component with invalid language', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {
        language: 'xp-to'
      }
    })
    expect(wrapper.name()).toBe('Rubya')
    expect(wrapper.vm.tree instanceof ObjectType).toBeTruthy()
  })

  it('should $emit updated-schema in getJsonSchema method', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {}
    })
    wrapper.vm.getJsonSchema()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['updated-schema']).toBe('object')
    expect(typeof wrapper.emitted()['updated-schema'][0]).toBe('object')
  })

  it('should change tree state in removeChild  method', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {}
    })
    expect(wrapper.vm.tree.properties.length).toBe(0)
    wrapper.vm.tree.properties.push(new BooleanType({
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }))
    expect(wrapper.vm.tree.properties.length).toBe(1)
    wrapper.vm.removeChild()
    expect(wrapper.vm.tree.properties.length).toBe(0)
  })

  it('should change tree state in childUpdated method', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {}
    })
    let objectType = new ObjectType({
      title: 'a title',
      id: '$123',
      description: 'Some description',
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 10
    }, 'some_object')
    objectType.properties.push(new BooleanType({
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }))
    expect(wrapper.vm.tree.properties.length).toBe(0)
    wrapper.vm.childUpdated(objectType)
    expect(wrapper.vm.tree.properties.length).toBe(1)
  })

  it('should return translate text in translate method', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {
        i18n: {
          'foo': 'baa'
        }
      }
    })
    expect(wrapper.vm.translate('foo')).toBe('baa')
  })

  it('should return default text in translate method', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {}
    })
    expect(wrapper.vm.translate('foo')).toBe('foo')
  })

  it('should return override text in translate method', () => {
    wrapper = shallowMount(Rubya, {
      propsData: {
        language: 'pt-br',
        i18n: {
          'texto': 'perfect!'
        }
      }
    })
    expect(wrapper.vm.translate('number')).toBe('número')
    expect(wrapper.vm.translate('texto')).toBe('perfect!')
  })
})
