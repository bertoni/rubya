import { shallowMount } from '@vue/test-utils'
import BooleanType from '@/DataStructure/BooleanType.js'
import BooleanForm from '@/templates/Boolean/form.vue'

let wrapper
const name = 'field'
const structure = {
  title: 'Boolean field',
  id: '#field',
  description: 'Some description'
}

describe('BooleanForm.vue', () => {
  it('should have methods', () => {
    expect(typeof BooleanForm.methods).toBe('object')
  })

  it('should have a save method', () => {
    expect(typeof BooleanForm.methods.save).toBe('function')
  })

  it('should have a cancel method', () => {
    expect(typeof BooleanForm.methods.cancel).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(BooleanForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('BooleanForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(BooleanForm, {
      propsData: {
        originalObject: new BooleanType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('BooleanForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit close in cancel method', () => {
    wrapper = shallowMount(BooleanForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, name),
        translate: text => text
      }
    })
    wrapper.vm.cancel()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().close).toBe('object')
  })

  it('should return false in save method with fields required', () => {
    wrapper = shallowMount(BooleanForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, ''),
        translate: text => text
      }
    })
    expect(wrapper.vm.save()).toBeFalsy()
    expect(wrapper.vm.fieldsWithError.name).toBeTruthy()
  })

  it('should $emit change in save method with fields complete', () => {
    wrapper = shallowMount(BooleanForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, name),
        translate: text => text
      }
    })
    wrapper.vm.save()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().change).toBe('object')
    expect(wrapper.emitted().change[0][0].name).toBe(name)
    expect(wrapper.emitted().change[0][0].title).toBe(structure.title)
    expect(wrapper.emitted().change[0][0].id).toBe(structure.id)
    expect(wrapper.emitted().change[0][0].description).toBe(structure.description)
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
  })
})
