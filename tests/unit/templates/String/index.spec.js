import { shallowMount } from '@vue/test-utils'
import StringType from '@/DataStructure/StringType.js'
import StringTemplate from '@/templates/String/index.vue'

let wrapper
const name = 'field'
const structure = {
  title: 'String field',
  id: '#field',
  description: 'Some description',
  minLength: 2,
  maxLength: 10,
  pattern: '/[0-9]/',
  format: 'date'
}

describe('StringTemplate.vue', () => {
  it('should have methods', () => {
    expect(typeof StringTemplate.methods).toBe('object')
  })

  it('should have an update method', () => {
    expect(typeof StringTemplate.methods.update).toBe('function')
  })

  it('should have an edit method', () => {
    expect(typeof StringTemplate.methods.edit).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof StringTemplate.methods.remove).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(StringTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('StringTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.minLength).toBe(structure.minLength)
    expect(wrapper.vm.internalData.maxLength).toBe(structure.maxLength)
    expect(wrapper.vm.internalData.pattern).toBe(structure.pattern)
    expect(wrapper.vm.internalData.format).toBe(structure.format)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(StringTemplate, {
      propsData: {
        originalObject: new StringType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('StringTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.minLength).toBe(structure.minLength)
    expect(wrapper.vm.internalData.maxLength).toBe(structure.maxLength)
    expect(wrapper.vm.internalData.pattern).toBe(structure.pattern)
    expect(wrapper.vm.internalData.format).toBe(structure.format)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit remove-me in remove method', () => {
    wrapper = shallowMount(StringTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, name)
      }
    })
    wrapper.vm.remove()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['remove-me']).toBe('object')
  })

  it('should change form state in edit method', () => {
    wrapper = shallowMount(StringTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
  })

  it('should change form and internalData state in update method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New String field',
      id: '#newfield',
      description: 'Some new description',
      minLength: 1,
      maxLength: 20,
      pattern: '/[a-z]/',
      format: 'email'
    }
    wrapper = shallowMount(StringTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
    wrapper.vm.update(new StringType(newStructure, newStructure.name))
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.id).toBe(newStructure.id)
    expect(wrapper.vm.internalData.description).toBe(newStructure.description)
    expect(wrapper.vm.internalData.minLength).toBe(newStructure.minLength)
    expect(wrapper.vm.internalData.maxLength).toBe(newStructure.maxLength)
    expect(wrapper.vm.internalData.pattern).toBe(newStructure.pattern)
    expect(wrapper.vm.internalData.format).toBe(newStructure.format)
    expect(wrapper.vm.internalData.name).toBe(newStructure.name)
  })
})
