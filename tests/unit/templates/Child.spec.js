import { shallowMount } from '@vue/test-utils'
import ArrayType from '@/DataStructure/ArrayType.js'
import BooleanType from '@/DataStructure/BooleanType.js'
import IntegerType from '@/DataStructure/IntegerType.js'
import NumberType from '@/DataStructure/NumberType.js'
import ObjectType from '@/DataStructure/ObjectType.js'
import StringType from '@/DataStructure/StringType.js'
import Child from '@/templates/Child.vue'

let wrapper
let structure = { title: 'Object field' }
let name = 'object'

describe('Child.vue', () => {
  it('should have methods', () => {
    expect(typeof Child.methods).toBe('object')
  })

  it('should have a remove method', () => {
    expect(typeof Child.methods.remove).toBe('function')
  })

  it('should have an update method', () => {
    expect(typeof Child.methods.update).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('ChildTemplate')
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with default values', () => {
    wrapper = shallowMount(Child, {
      propsData: {
        originalObject: new ObjectType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('ChildTemplate')
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should renders correctly component with ArrayObject', () => {
    const newStructure = { title: 'Array field' }
    const newName = 'array'
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(newStructure, newName)
      }
    })
    expect(wrapper.name()).toBe('ChildTemplate')
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.name).toBe(newName)
  })

  it('should renders correctly component with BooleanObject', () => {
    const newStructure = { title: 'Boolean field' }
    const newName = 'boolean'
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new BooleanType(newStructure, newName)
      }
    })
    expect(wrapper.name()).toBe('ChildTemplate')
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.name).toBe(newName)
  })

  it('should renders correctly component with IntegerObject', () => {
    const newStructure = { title: 'Integer field' }
    const newName = 'integer'
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new IntegerType(newStructure, newName)
      }
    })
    expect(wrapper.name()).toBe('ChildTemplate')
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.name).toBe(newName)
  })

  it('should renders correctly component with NumberObject', () => {
    const newStructure = { title: 'Number field' }
    const newName = 'number'
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new NumberType(newStructure, newName)
      }
    })
    expect(wrapper.name()).toBe('ChildTemplate')
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.name).toBe(newName)
  })

  it('should renders correctly component with StringObject', () => {
    const newStructure = { title: 'String field' }
    const newName = 'string'
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new StringType(newStructure, newName)
      }
    })
    expect(wrapper.name()).toBe('ChildTemplate')
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.name).toBe(newName)
  })

  it('should $emit remove-me in remove method', () => {
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name)
      }
    })
    wrapper.vm.remove()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['remove-me']).toBe('object')
  })

  it('should $emit change in update method', () => {
    wrapper = shallowMount(Child, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name)
      }
    })
    const newStructure = { title: 'new Object field' }
    const newName = 'new_object'
    const obj = new ObjectType(newStructure, newName)
    wrapper.vm.update(obj)
    expect(typeof wrapper.emitted()).toBe('object')
    expect(wrapper.emitted()['change'][0][0]).toBe(obj)
  })
})
