import { shallowMount } from '@vue/test-utils'
import StringType from '@/DataStructure/StringType.js'
import StringForm from '@/templates/String/form.vue'

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

describe('StringForm.vue', () => {
  it('should have methods', () => {
    expect(typeof StringForm.methods).toBe('object')
  })

  it('should have a save method', () => {
    expect(typeof StringForm.methods.save).toBe('function')
  })

  it('should have a cancel method', () => {
    expect(typeof StringForm.methods.cancel).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(StringForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('StringForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
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
    wrapper = shallowMount(StringForm, {
      propsData: {
        originalObject: new StringType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('StringForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.minLength).toBe(structure.minLength)
    expect(wrapper.vm.internalData.maxLength).toBe(structure.maxLength)
    expect(wrapper.vm.internalData.pattern).toBe(structure.pattern)
    expect(wrapper.vm.internalData.format).toBe(structure.format)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit close in cancel method', () => {
    wrapper = shallowMount(StringForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, name),
        translate: text => text
      }
    })
    wrapper.vm.cancel()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().close).toBe('object')
  })

  it('should return false in save method with fields required', () => {
    wrapper = shallowMount(StringForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, ''),
        translate: text => text
      }
    })
    expect(wrapper.vm.save()).toBeFalsy()
    expect(wrapper.vm.fieldsWithError.name).toBeTruthy()
  })

  it('should $emit change in save method with fields complete', () => {
    wrapper = shallowMount(StringForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(structure, name),
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
    expect(wrapper.emitted().change[0][0].minLength).toBe(structure.minLength)
    expect(wrapper.emitted().change[0][0].maxLength).toBe(structure.maxLength)
    expect(wrapper.emitted().change[0][0].pattern).toBe(structure.pattern)
    expect(wrapper.emitted().change[0][0].format).toBe(structure.format)
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
  })
})
