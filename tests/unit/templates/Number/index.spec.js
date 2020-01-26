import { shallowMount } from '@vue/test-utils'
import NumberType from '@/DataStructure/NumberType.js'
import NumberTemplate from '@/templates/Number/index.vue'

let wrapper
const name = 'field'
const structure = {
  title: 'Number field',
  id: '#field',
  description: 'Some description',
  multipleOf: 2,
  minimum: 2,
  exclusiveMinimum: 2,
  maximum: 10,
  exclusiveMaximum: 10
}

describe('NumberTemplate.vue', () => {
  it('should have methods', () => {
    expect(typeof NumberTemplate.methods).toBe('object')
  })

  it('should have an update method', () => {
    expect(typeof NumberTemplate.methods.update).toBe('function')
  })

  it('should have an edit method', () => {
    expect(typeof NumberTemplate.methods.edit).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof NumberTemplate.methods.remove).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(NumberTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('NumberTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.multipleOf).toBe(structure.multipleOf)
    expect(wrapper.vm.internalData.minimum).toBe(structure.minimum)
    expect(wrapper.vm.internalData.exclusiveMinimum).toBe(structure.exclusiveMinimum)
    expect(wrapper.vm.internalData.maximum).toBe(structure.maximum)
    expect(wrapper.vm.internalData.exclusiveMaximum).toBe(structure.exclusiveMaximum)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(NumberTemplate, {
      propsData: {
        originalObject: new NumberType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('NumberTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.multipleOf).toBe(structure.multipleOf)
    expect(wrapper.vm.internalData.minimum).toBe(structure.minimum)
    expect(wrapper.vm.internalData.exclusiveMinimum).toBe(structure.exclusiveMinimum)
    expect(wrapper.vm.internalData.maximum).toBe(structure.maximum)
    expect(wrapper.vm.internalData.exclusiveMaximum).toBe(structure.exclusiveMaximum)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit remove-me in remove method', () => {
    wrapper = shallowMount(NumberTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, name)
      }
    })
    wrapper.vm.remove()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['remove-me']).toBe('object')
  })

  it('should change form state in edit method', () => {
    wrapper = shallowMount(NumberTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
  })

  it('should change form and internalData state in update method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New Number field',
      id: '#newfield',
      description: 'Some new description',
      multipleOf: 3,
      minimum: 3,
      exclusiveMinimum: 3,
      maximum: 9,
      exclusiveMaximum: 9
    }
    wrapper = shallowMount(NumberTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
    wrapper.vm.update(new NumberType(newStructure, newStructure.name))
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.id).toBe(newStructure.id)
    expect(wrapper.vm.internalData.description).toBe(newStructure.description)
    expect(wrapper.vm.internalData.multipleOf).toBe(newStructure.multipleOf)
    expect(wrapper.vm.internalData.minimum).toBe(newStructure.minimum)
    expect(wrapper.vm.internalData.exclusiveMinimum).toBe(newStructure.exclusiveMinimum)
    expect(wrapper.vm.internalData.maximum).toBe(newStructure.maximum)
    expect(wrapper.vm.internalData.exclusiveMaximum).toBe(newStructure.exclusiveMaximum)
    expect(wrapper.vm.internalData.name).toBe(newStructure.name)
  })
})
