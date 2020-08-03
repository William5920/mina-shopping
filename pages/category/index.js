import {request} from '../../request/index.js'
Page({

  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧内容数据
    rightContent: [],
    // 被选中的菜单
    currentIndex: 0,
    scrollTop: 0
  },
  cates: [],

  onLoad: function (options) {
     // 对拿到的分类数据进行缓存
    const cates = wx.getStorageSync('cates')

    if(!cates) {
      // 如果没有缓存，发送请求获取
      this.getCates()
    } else {
      // 如果有缓存，判断是否过期, 10s过期
      if(Date.now() - cates.time > 1000*10) {
        // 缓存过期，发送请求获取数据
        this.getCates()
      } else {
        // 缓存未过期，使用缓存数据
        this.cates = cates.data
        let leftMenuList = this.cates.map(item => item.cat_name)
        let rightContent = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    
  },
  // 获取分类数据
  async getCates() {
    const res = await request({url: '/categories'})
    this.cates = res.data.message
    wx.setStorageSync('cates', {time: Date.now(), data: this.cates})
    let leftMenuList = this.cates.map(item => item.cat_name)
    let rightContent = this.cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    const {index} = e.currentTarget.dataset
    let rightContent = this.cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
  
})