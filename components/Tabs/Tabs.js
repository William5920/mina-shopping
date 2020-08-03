// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      // console.log(e)
      const {index} = e.currentTarget.dataset
      this.triggerEvent('tabsItemChange', {index})
    }
  }
})
