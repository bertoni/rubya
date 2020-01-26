import { shallowMount } from '@vue/test-utils'
import ArrayType from '@/DataStructure/ArrayType.js'
import BooleanType from '@/DataStructure/BooleanType.js'
import ArrayTemplate from '@/templates/Array/index.vue'

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

describe('ArrayTemplate.vue', () => {
  it('should have methods', () => {
    expect(typeof ArrayTemplate.methods).toBe('object')
  })

  it('should have an update method', () => {
    expect(typeof ArrayTemplate.methods.update).toBe('function')
  })

  it('should have an edit method', () => {
    expect(typeof ArrayTemplate.methods.edit).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof ArrayTemplate.methods.remove).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('ArrayTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.newchild).toBeFalsy()
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
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.name()).toBe('ArrayTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.newchild).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.additionalItems).toBe(structure.additionalItems)
    expect(wrapper.vm.internalData.uniqueItems).toBe(structure.uniqueItems)
    expect(wrapper.vm.internalData.minItems).toBe(structure.minItems)
    expect(wrapper.vm.internalData.maxItems).toBe(structure.maxItems)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit remove-me in remove method', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    wrapper.vm.remove()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['remove-me']).toBe('object')
  })

  it('should change form state in edit method', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
  })

  it('should change form and internalData state in update method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New Array field',
      id: '#newfield',
      description: 'Some new description',
      additionalItems: true,
      uniqueItems: true,
      minItems: 2,
      maxItems: 3
    }
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
    wrapper.vm.update(new ArrayType(newStructure, newStructure.name))
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.id).toBe(newStructure.id)
    expect(wrapper.vm.internalData.description).toBe(newStructure.description)
    expect(wrapper.vm.internalData.additionalItems).toBe(newStructure.additionalItems)
    expect(wrapper.vm.internalData.uniqueItems).toBe(newStructure.uniqueItems)
    expect(wrapper.vm.internalData.minItems).toBe(newStructure.minItems)
    expect(wrapper.vm.internalData.maxItems).toBe(newStructure.maxItems)
    expect(wrapper.vm.internalData.name).toBe(newStructure.name)
  })

  it('should remove item in removeChild method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New Array field',
      id: '#newfield',
      description: 'Some new description',
      items: [],
      additionalItems: true,
      uniqueItems: true,
      minItems: 2,
      maxItems: 3
    }
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    let boolean01 = new BooleanType({
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }, '0')
    let boolean02 = new BooleanType({
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }, '1')
    let boolean03 = new BooleanType({
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }, '2')
    let arrayType = new ArrayType(newStructure, newStructure.name)
    arrayType.items.push(boolean01)
    arrayType.items.push(boolean02)
    arrayType.items.push(boolean03)
    wrapper.vm.update(arrayType)
    expect(wrapper.vm.internalData.items.length).toBe(3)
    wrapper.vm.removeChild(boolean01)
    expect(wrapper.vm.internalData.items.length).toBe(2)
    wrapper.vm.removeChild(boolean02)
    expect(wrapper.vm.internalData.items.name).toBe(boolean03.name)
    wrapper.vm.removeChild(boolean03)
    expect(wrapper.vm.internalData.items.length).toBe(0)
  })

  it('should remove unique object item in removeChild method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New Array field',
      id: '#newfield',
      description: 'Some new description',
      items: [],
      additionalItems: true,
      uniqueItems: true,
      minItems: 2,
      maxItems: 3
    }
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    let boolean01Structure = {
      name: 'newfield',
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }
    let boolean01 = new BooleanType(boolean01Structure, boolean01Structure.name)
    let arrayType = new ArrayType(newStructure, newStructure.name)
    arrayType.items = boolean01
    wrapper.vm.update(arrayType)
    expect(wrapper.vm.internalData.items.name).toBe(boolean01Structure.name)
    wrapper.vm.removeChild(boolean01)
    expect(wrapper.vm.internalData.items.length).toBe(0)
  })

  it('should change newchild state in newChild method', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.vm.newchild).toBeFalsy()
    wrapper.vm.newChild()
    expect(wrapper.vm.newchild).toBeTruthy()
  })

  it('should add new child in addChild method with items empty', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.vm.internalData.items.length).toBe(0)
    let boolean01Structure = {
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new BooleanType(boolean01Structure))
    expect(wrapper.vm.internalData.items instanceof BooleanType).toBeTruthy()
  })

  it('should add new child in addChild method with items with values', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.vm.internalData.items.length).toBe(0)
    const newStructure = {
      name: 'newfield',
      title: 'New Array field',
      id: '#newfield',
      description: 'Some new description',
      items: [],
      additionalItems: true,
      uniqueItems: true,
      minItems: 2,
      maxItems: 3
    }
    let arrayType = new ArrayType(newStructure, newStructure.name)
    let boolean01Structure = {
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }
    let boolean01 = new BooleanType(boolean01Structure)
    arrayType.items.push(boolean01)
    wrapper.vm.update(arrayType)
    let boolean02Structure = {
      title: 'Second Boolean field',
      id: '#secondfield',
      description: 'Some second description'
    }
    wrapper.vm.addChild(new BooleanType(boolean02Structure))
    expect(wrapper.vm.internalData.items.length).toBe(2)
  })

  it('should add new child in addChild method with items with one value', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: false,
        originalObject: new ArrayType(structure, name)
      }
    })
    expect(wrapper.vm.internalData.items.length).toBe(0)
    let boolean01Structure = {
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new BooleanType(boolean01Structure))
    expect(wrapper.vm.internalData.items instanceof BooleanType).toBeTruthy()
    let boolean02Structure = {
      title: 'Second Boolean field',
      id: '#secondfield',
      description: 'Some second description'
    }
    wrapper.vm.addChild(new BooleanType(boolean02Structure))
    expect(wrapper.vm.internalData.items.length).toBe(2)
  })

  it('should change specific child in childUpdated method', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    let boolean01 = new BooleanType({
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    })
    wrapper.vm.addChild(boolean01)
    wrapper.vm.childUpdated(new BooleanType({
      title: 'New Boolean field',
      id: '#changedfield',
      description: 'Some new description'
    }))
    expect(wrapper.vm.internalData.items.id).toBe('#changedfield')
  })

  it('should change specific child in childUpdated method with more than one child', () => {
    wrapper = shallowMount(ArrayTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ArrayType(structure, name)
      }
    })
    wrapper.vm.addChild(new BooleanType({
      title: 'New Boolean field',
      id: '#onechild',
      description: 'Some new description'
    }))
    wrapper.vm.addChild(new BooleanType({
      title: 'New Boolean field',
      id: '#twochild',
      description: 'Some new description'
    }))
    wrapper.vm.childUpdated(new BooleanType({
      title: 'New Boolean field',
      id: '#changedfield',
      description: 'Some new description'
    }, '1'))
    expect(wrapper.vm.internalData.items[1].id).toBe('#changedfield')
  })
})
