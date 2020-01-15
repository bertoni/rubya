import { shallowMount } from '@vue/test-utils'
import ObjectType from '@/DataStructure/ObjectType.js'
import ObjectForm from '@/templates/Object/form.vue'

let wrapper
const name = 'field'
const structure = {
  title: 'Object field',
  id: '#field',
  description: 'Some description',
  required: [],
  additionalProperties: false,
  minProperties: 1,
  maxProperties: 10
}

describe('ObjectForm.vue', () => {
  it('should have methods', () => {
    expect(typeof ObjectForm.methods).toBe('object')
  })

  it('should have a save method', () => {
    expect(typeof ObjectForm.methods.save).toBe('function')
  })

  it('should have a cancel method', () => {
    expect(typeof ObjectForm.methods.cancel).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ObjectForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('ObjectForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
    expect(wrapper.vm.requiredChildren).toBe('')
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.required).toBe(structure.required)
    expect(wrapper.vm.internalData.additionalProperties).toBe(structure.additionalProperties)
    expect(wrapper.vm.internalData.minProperties).toBe(structure.minProperties)
    expect(wrapper.vm.internalData.maxProperties).toBe(structure.maxProperties)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(ObjectForm, {
      propsData: {
        originalObject: new ObjectType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('ObjectForm')
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
    expect(wrapper.vm.requiredChildren).toBe('')
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.required).toBe(structure.required)
    expect(wrapper.vm.internalData.additionalProperties).toBe(structure.additionalProperties)
    expect(wrapper.vm.internalData.minProperties).toBe(structure.minProperties)
    expect(wrapper.vm.internalData.maxProperties).toBe(structure.maxProperties)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit close in cancel method', () => {
    wrapper = shallowMount(ObjectForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name)
      }
    })
    wrapper.vm.cancel()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().close).toBe('object')
  })

  it('should return false in save method with fields required', () => {
    wrapper = shallowMount(ObjectForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, '')
      }
    })
    expect(wrapper.vm.save()).toBeFalsy()
    expect(wrapper.vm.fieldsWithError.name).toBeTruthy()
  })

  it('should $emit change in save method with fields complete', () => {
    wrapper = shallowMount(ObjectForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name)
      }
    })
    wrapper.vm.save()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().change).toBe('object')
    expect(wrapper.emitted().change[0][0].name).toBe(name)
    expect(wrapper.emitted().change[0][0].title).toBe(structure.title)
    expect(wrapper.emitted().change[0][0].id).toBe(structure.id)
    expect(wrapper.emitted().change[0][0].description).toBe(structure.description)
    expect(wrapper.emitted().change[0][0].required).toStrictEqual(structure.required)
    expect(wrapper.emitted().change[0][0].additionalProperties).toBe(structure.additionalProperties)
    expect(wrapper.emitted().change[0][0].minProperties).toBe(structure.minProperties)
    expect(wrapper.emitted().change[0][0].maxProperties).toBe(structure.maxProperties)
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
  })

  it('should $emit change in save method with fields complete and required fields', () => {
    wrapper = shallowMount(ObjectForm, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name)
      }
    })
    wrapper.vm.requiredChildren = 'foo,baa'
    wrapper.vm.save()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().change).toBe('object')
    expect(wrapper.emitted().change[0][0].name).toBe(name)
    expect(wrapper.emitted().change[0][0].title).toBe(structure.title)
    expect(wrapper.emitted().change[0][0].id).toBe(structure.id)
    expect(wrapper.emitted().change[0][0].description).toBe(structure.description)
    expect(wrapper.emitted().change[0][0].required).toStrictEqual(['foo', 'baa'])
    expect(wrapper.emitted().change[0][0].additionalProperties).toBe(structure.additionalProperties)
    expect(wrapper.emitted().change[0][0].minProperties).toBe(structure.minProperties)
    expect(wrapper.emitted().change[0][0].maxProperties).toBe(structure.maxProperties)
    expect(wrapper.vm.fieldsWithError.name).toBeFalsy()
  })
})
