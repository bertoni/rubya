import { shallowMount } from '@vue/test-utils'
import NumberType from '@/DataStructure/NumberType.js'
import NumberForm from '@/templates/Number/form.vue'

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

describe('NumberForm.vue', () => {
  it('should have methods', () => {
    expect(typeof NumberForm.methods).toBe('object')
  })

  it('should have a save method', () => {
    expect(typeof NumberForm.methods.save).toBe('function')
  })

  it('should have a cancel method', () => {
    expect(typeof NumberForm.methods.cancel).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(NumberForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('NumberForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
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
    wrapper = shallowMount(NumberForm, {
      propsData: {
        originalObject: new NumberType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('NumberForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
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

  it('should $emit close in cancel method', () => {
    wrapper = shallowMount(NumberForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, name)
      }
    })
    wrapper.vm.cancel()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().close).toBe('object')
  })

  it('should return false in save method with fields required', () => {
    wrapper = shallowMount(NumberForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, '')
      }
    })
    expect(wrapper.vm.save()).toBeFalsy()
    expect(wrapper.vm.fieldsWithError.name).toBeTruthy()
  })

  it('should $emit change in save method with fields complete', () => {
    wrapper = shallowMount(NumberForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(structure, name)
      }
    })
    wrapper.vm.save()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().change).toBe('object')
    expect(wrapper.emitted().change[0][0].name).toBe(name)
    expect(wrapper.emitted().change[0][0].title).toBe(structure.title)
    expect(wrapper.emitted().change[0][0].id).toBe(structure.id)
    expect(wrapper.emitted().change[0][0].description).toBe(structure.description)
    expect(wrapper.emitted().change[0][0].multipleOf).toBe(structure.multipleOf)
    expect(wrapper.emitted().change[0][0].minimum).toBe(structure.minimum)
    expect(wrapper.emitted().change[0][0].exclusiveMinimum).toBe(structure.exclusiveMinimum)
    expect(wrapper.emitted().change[0][0].maximum).toBe(structure.maximum)
    expect(wrapper.emitted().change[0][0].exclusiveMaximum).toBe(structure.exclusiveMaximum)
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
  })
})
