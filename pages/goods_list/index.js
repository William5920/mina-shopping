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
    goodsList: [],
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 页面商品总页数
  totalPage: 0,
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
    // console.log(res)
    this.totalPage = Math.ceil(res.data.message.total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods],
    })
    // 关闭下拉刷新
    wx.stopPullDownRefresh()
  },
  // 滑动条触底时加载下一页
  onReachBottom() {
    console.log('滑到底部啦！')
    console.log(this.QueryParams.pagenum)
    if(this.QueryParams.pagenum>= this.totalPage) {
      wx.showToast({
        title: '没有下一页数据啦！',
        icon: 'none'
      })
    } else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 开启下拉刷新
  onPullDownRefresh() {
    // 1.清空页面数据数组
    // 2.将pagenum重置为1
    // 3.重新获取数据
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }
  
})