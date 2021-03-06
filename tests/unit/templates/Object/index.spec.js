import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import ObjectType from '@/DataStructure/ObjectType.js'
import BooleanType from '@/DataStructure/BooleanType.js'
import NumberType from '@/DataStructure/NumberType.js'
import IntegerType from '@/DataStructure/IntegerType.js'
import StringType from '@/DataStructure/StringType.js'
import ArrayType from '@/DataStructure/ArrayType.js'
import ObjectTemplate from '@/templates/Object/index.vue'

Vue.config.silent = true

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

describe('ObjectTemplate.vue', () => {
  it('should have methods', () => {
    expect(typeof ObjectTemplate.methods).toBe('object')
  })

  it('should have an update method', () => {
    expect(typeof ObjectTemplate.methods.update).toBe('function')
  })

  it('should have an edit method', () => {
    expect(typeof ObjectTemplate.methods.edit).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof ObjectTemplate.methods.remove).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('ObjectTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.newchild).toBeFalsy()
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
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('ObjectTemplate')
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.newchild).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(structure.title)
    expect(wrapper.vm.internalData.id).toBe(structure.id)
    expect(wrapper.vm.internalData.description).toBe(structure.description)
    expect(wrapper.vm.internalData.required).toBe(structure.required)
    expect(wrapper.vm.internalData.additionalProperties).toBe(structure.additionalProperties)
    expect(wrapper.vm.internalData.minProperties).toBe(structure.minProperties)
    expect(wrapper.vm.internalData.maxProperties).toBe(structure.maxProperties)
    expect(wrapper.vm.internalData.name).toBe(name)
  })

  it('should $emit remove-me in remove method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    wrapper.vm.remove()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['remove-me']).toBe('object')
  })

  it('should change form state in edit method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
  })

  it('should change form and internalData state in update method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New Object field',
      id: '#newfield',
      description: 'Some new description',
      required: ['foo'],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 8
    }
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.form).toBeFalsy()
    wrapper.vm.edit()
    expect(wrapper.vm.form).toBeTruthy()
    wrapper.vm.update(new ObjectType(newStructure, newStructure.name))
    expect(wrapper.vm.form).toBeFalsy()
    expect(wrapper.vm.internalData.title).toBe(newStructure.title)
    expect(wrapper.vm.internalData.id).toBe(newStructure.id)
    expect(wrapper.vm.internalData.description).toBe(newStructure.description)
    expect(wrapper.vm.internalData.required).toBe(newStructure.required)
    expect(wrapper.vm.internalData.additionalProperties).toBe(newStructure.additionalProperties)
    expect(wrapper.vm.internalData.minProperties).toBe(newStructure.minProperties)
    expect(wrapper.vm.internalData.maxProperties).toBe(newStructure.maxProperties)
    expect(wrapper.vm.internalData.name).toBe(newStructure.name)
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().change).toBe('object')
  })

  it('should remove item in removeChild method', () => {
    const newStructure = {
      name: 'newfield',
      title: 'New Object field',
      id: '#newfield',
      description: 'Some new description',
      required: ['foo'],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 8
    }
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    let boolean01Structure = {
      name: 'foo',
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }
    let boolean01 = new BooleanType(boolean01Structure, boolean01Structure.name)
    let objectType = new ObjectType(newStructure, newStructure.name)
    objectType.properties.push(boolean01)
    wrapper.vm.update(objectType)
    expect(wrapper.vm.internalData.properties.length).toBe(1)
    wrapper.vm.removeChild(boolean01)
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    expect(wrapper.vm.internalData.required.length).toBe(0)
  })

  it('should change newchild state in newChild method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.newchild).toBeFalsy()
    wrapper.vm.newChild()
    expect(wrapper.vm.newchild).toBeTruthy()
  })

  it('should add new child in addChild method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    let boolean01Structure = {
      title: 'New Boolean field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new BooleanType(boolean01Structure))
    expect(wrapper.vm.internalData.properties.length).toBe(1)
  })

  it('should add new number child in addChild method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    let numberStructure = {
      title: 'New Number field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new NumberType(numberStructure))
    expect(wrapper.vm.internalData.properties.length).toBe(1)
  })

  it('should add new integer child in addChild method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    let integerStructure = {
      title: 'New Integer field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new IntegerType(integerStructure))
    expect(wrapper.vm.internalData.properties.length).toBe(1)
  })

  it('should add new string child in addChild method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    let stringStructure = {
      title: 'New String field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new StringType(stringStructure))
    expect(wrapper.vm.internalData.properties.length).toBe(1)
  })

  it('should add new array child in addChild method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    let arrayStructure = {
      title: 'New Array field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new ArrayType(arrayStructure))
    expect(wrapper.vm.internalData.properties.length).toBe(1)
  })

  it('should add new object child in addChild method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    let objectStructure = {
      title: 'New Object field',
      id: '#newfield',
      description: 'Some new description'
    }
    wrapper.vm.addChild(new ObjectType(objectStructure))
    expect(wrapper.vm.internalData.properties.length).toBe(1)
  })

  it('should change specific child in childUpdated method', () => {
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: new ObjectType(structure, name),
        translate: text => text
      }
    })
    const oldObj = new ObjectType({
      title: 'Other Object field',
      id: '#otherfield',
      description: 'Some description',
      required: [],
      additionalProperties: true,
      minProperties: 5,
      maxProperties: 6
    }, 'foo')
    wrapper.vm.addChild(oldObj)
    wrapper.vm.addChild(new ObjectType({
      title: 'Other Object field',
      id: '#otherfield',
      description: 'Some description',
      required: [],
      additionalProperties: true,
      minProperties: 1,
      maxProperties: 2
    }, 'baa'))
    wrapper.vm.childUpdated({ old: oldObj, new: new ObjectType({
        title: 'Other Object field',
        id: '#otherfield',
        description: 'Some description',
        required: [],
        additionalProperties: false,
        minProperties: 10,
        maxProperties: 15
      }, 'foo') })
    expect(wrapper.vm.internalData.properties[0].additionalProperties).toBe(false)
    expect(wrapper.vm.internalData.properties[0].minProperties).toBe(10)
    expect(wrapper.vm.internalData.properties[0].maxProperties).toBe(15)
  })

  it('should change internalData when change originalObject', () => {
    let oriObj = new ObjectType(structure, name)
    wrapper = shallowMount(ObjectTemplate, {
      propsData: {
        allowChangeName: true,
        originalObject: oriObj,
        translate: text => text
      }
    })
    expect(wrapper.vm.internalData.properties.length).toBe(0)
    oriObj = new ObjectType(structure, name)
    let stringStructure = {
      title: 'New String field',
      id: '#newfield',
      description: 'Some new description'
    }
    oriObj.properties.push(new StringType(stringStructure))
    wrapper.vm.originalObject = oriObj
    expect(wrapper.vm.internalData.properties.length).toBe(1)
  })
})
