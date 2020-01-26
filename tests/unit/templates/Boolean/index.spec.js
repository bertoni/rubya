import { shallowMount } from '@vue/test-utils'
import BooleanType from '@/DataStructure/BooleanType.js'
import BooleanTemplate from '@/templates/Boolean/index.vue'

let wrapper
const name = 'field'
const structure = {
  title: 'Boolean field',
  id: '#field',
  description: 'Some description'
}

describe('BooleanTemplate.vue', () => {
  it('should have methods', () => {
    expect(typeof BooleanTemplate.methods).toBe('object')
  })

  it('should have an update method', () => {
    expect(typeof BooleanTemplate.methods.update).toBe('function')
  })

  it('should have an edit method', () => {
    expect(typeof BooleanTemplate.methods.edit).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof BooleanTemplate.methods.remove).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(BooleanTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('BooleanTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(BooleanTemplate, {
      propsData: {
        originalObject: new BooleanType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('BooleanTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit remove-me in remove method', () => {
    wrapper = shallowMount(BooleanTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, name)
      }
    })
    wrapper.vm.remove()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['remove-me']).toBe('object')
  })

  it('should change form state in edit method', () => {
    wrapper = shallowMount(BooleanTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
  })

  it('should change form and internalData state in update method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper = shallowMount(BooleanTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
    wrapper.vm.update(new BooleanType(newStructure, newStructure.name))
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.id).toBe(newStructure.id)
    expect(wrapper.vm.internalData.description).toBe(newStructure.description)
    expect(wrapper.vm.internalData.name).toBe(newStructure.name)
  })
})
