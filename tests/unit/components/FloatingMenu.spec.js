import { shallowMount } from '@vue/test-utils'
import FloatingMenu from '@/components/FloatingMenu.vue'

describe('FloatingMenu.vue', () => {
  it('should have methods', () => {
    expect(typeof FloatingMenu.methods).toBe('object')
  })

  it('should have an edit method', () => {
    expect(typeof FloatingMenu.methods.edit).toBe('function')
  })

  it('should have an add method', () => {
    expect(typeof FloatingMenu.methods.add).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof FloatingMenu.methods.remove).toBe('function')
  })

  it('should have an openHideChildren method', () => {
    expect(typeof FloatingMenu.methods.openHideChildren).toBe('function')
  })

  it('should renders correctly component', () => {
    let wrapper = shallowMount(FloatingMenu, {
      propsData: {
        showEdit: true,
        showAdd: true,
        showRemove: true,
        showOpenHideChildren: true,
        openedChildren: false,
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('FloatingMenu')
  })

  it('should renders correctly component with default values', () => {
    let wrapper = shallowMount(FloatingMenu, {
      propsData: {
        translate: text => text
      }
    })
    expect(wrapper.name()).toBe('FloatingMenu')
  })

  it('should $emit edit in edit method', () => {
    let wrapper = shallowMount(FloatingMenu, {
      propsData: {
        translate: text => text
      }
    })
    wrapper.vm.edit()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().edit).toBe('object')
  })

  it('should $emit add in add method', () => {
    let wrapper = shallowMount(FloatingMenu, {
      propsData: {
        translate: text => text
      }
    })
    wrapper.vm.add()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().add).toBe('object')
  })

  it('should $emit remove in remove method', () => {
    let wrapper = shallowMount(FloatingMenu, {
      propsData: {
        translate: text => text
      }
    })
    wrapper.vm.remove()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().remove).toBe('object')
  })

  it('should $emit open-hide-children in openHideChildren method', () => {
    let wrapper = shallowMount(FloatingMenu, {
      propsData: {
        translate: text => text
      }
    })
    wrapper.vm.openHideChildren()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted()['open-hide-children']).toBe('object')
  })
})
