import { shallowMount } from '@vue/test-utils'
import ArrayType from '@/DataStructure/ArrayType.js'
import ArrayForm from '@/templates/Array/form.vue'

let wrapper
const name = 'field'
const structure = {
  title: 'Array field',
  id: '#field',
  description: 'Some description',
  additionalItems: false,
  uniqueItems: false,
  minItems: 1,
  maxItems: 5
}

describe('ArrayForm.vue', () => {
  it('should have methods', () => {
    expect(typeof ArrayForm.methods).toBe('object')
  })

  it('should have a save method', () => {
    expect(typeof ArrayForm.methods.save).toBe('function')
  })

  it('should have a cancel method', () => {
    expect(typeof ArrayForm.methods.cancel).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ArrayForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('ArrayForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.additionalItems).toBe(structure.additionalItems)
    expect(wrapper.vm.internalData.uniqueItems).toBe(structure.uniqueItems)
    expect(wrapper.vm.internalData.minItems).toBe(structure.minItems)
    expect(wrapper.vm.internalData.maxItems).toBe(structure.maxItems)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(ArrayForm, {
      propsData: {
        originalObject: new ArrayType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('ArrayForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.additionalItems).toBe(structure.additionalItems)
    expect(wrapper.vm.internalData.uniqueItems).toBe(structure.uniqueItems)
    expect(wrapper.vm.internalData.minItems).toBe(structure.minItems)
    expect(wrapper.vm.internalData.maxItems).toBe(structure.maxItems)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit close in cancel method', () => {
    wrapper = shallowMount(ArrayForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name),
        translate: text => text
      }
    })
    wrapper.vm.cancel()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().close).toBe('object')
  })

  it('should return false in save method with fields required', () => {
    wrapper = shallowMount(ArrayForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, ''),
        translate: text => text
      }
    })
    expect(wrapper.vm.save()).toBeFalsy()
    expect(wrapper.vm.fieldsWithError.name).toBeTruthy()
  })

  it('should $emit change in save method with fields complete', () => {
    wrapper = shallowMount(ArrayForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name),
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
    expect(wrapper.emitted().change[0][0].additionalItems).toBe(structure.additionalItems)
    expect(wrapper.emitted().change[0][0].uniqueItems).toBe(structure.uniqueItems)
    expect(wrapper.emitted().change[0][0].minItems).toBe(structure.minItems)
    expect(wrapper.emitted().change[0][0].maxItems).toBe(structure.maxItems)
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
  })
})
