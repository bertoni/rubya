import { shallowMount } from '@vue/test-utils'
import BooleanType from '@/DataStructure/BooleanType.js'
import NewChild from '@/templates/NewChild.vue'

let wrapper

describe('NewChild.vue', () => {
  it('should have methods', () => {
    expect(typeof NewChild.methods).toBe('object')
  })

  it('should have a changeType method', () => {
    expect(typeof NewChild.methods.changeType).toBe('function')
  })

  it('should have a save method', () => {
    expect(typeof NewChild.methods.save).toBe('function')
  })

  it('should have a cancel method', () => {
    expect(typeof NewChild.methods.cancel).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(NewChild, {
      propsData: {
        allowChangeName: true,
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('NewChild')
    expect(wrapper.vm.type).toBe(null)
    expect(wrapper.vm.internalData).toStrictEqual({})
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(NewChild, {
      propsData: {
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('NewChild')
    expect(wrapper.vm.type).toBe(null)
    expect(wrapper.vm.internalData).toStrictEqual({})
  })

  it('should change internalData and type state in changeType method', () => {
    wrapper = shallowMount(NewChild, {
      propsData: {
        allowChangeName: true,
        translate: text => text
      }
    })
    wrapper.vm.changeType('boolean')
    expect(wrapper.vm.type).toBe('boolean')
    expect(wrapper.vm.internalData instanceof BooleanType).toBeTruthy()
  })

  it('should $emit close in cancel method', () => {
    wrapper = shallowMount(NewChild, {
      propsData: {
        allowChangeName: true,
        translate: text => text
      }
    })
    wrapper.vm.changeType('boolean')
    expect(wrapper.vm.type).toBe('boolean')
    expect(wrapper.vm.internalData instanceof BooleanType).toBeTruthy()
    wrapper.vm.cancel()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().close).toBe('object')
    expect(wrapper.vm.type).toBe(null)
    expect(wrapper.vm.internalData).toStrictEqual({})
  })

  it('should $emit save in save method', () => {
    wrapper = shallowMount(NewChild, {
      propsData: {
        allowChangeName: true,
        translate: text => text
      }
    })
    wrapper.vm.changeType('boolean')
    expect(wrapper.vm.type).toBe('boolean')
    expect(wrapper.vm.internalData instanceof BooleanType).toBeTruthy()
    let structure = {
      title: 'New Boolean field',
      name: 'bool',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.save(new BooleanType(structure, structure.name))
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().save).toBe('object')
    expect(wrapper.emitted().save[0][0].name).toBe(structure.name)
    expect(wrapper.emitted().save[0][0].title).toBe(structure.title)
    expect(wrapper.emitted().save[0][0].id).toBe(structure.id)
    expect(wrapper.emitted().save[0][0].description).toBe(structure.description)
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().close).toBe('object')
    expect(wrapper.vm.type).toBe(null)
    expect(wrapper.vm.internalData).toStrictEqual({})
  })
})
