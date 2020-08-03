// pages/goods_list/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  // 标题点击事件
  handleTabsItemChange(e) {
    const {index} = e.detail
    const {tabs} = this.data
    tabs.forEach((element, i) => {
      if(i === index) {
        element.isActive = true
      } else {
        element.isActive = false
      }
    })
    this.setData({
      tabs
    })
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({url: '/goods/search', data: this.QueryParams})
    this.setData({
      goodsList: res.data.message.goods
    })
  }
  
})