import {request} from '../../request/index.js'

Page({
  data: {
      swiperList: [],
      catesList: [],
      floorList: []
  },
  onLoad: function(options) {
      this.getSwiperList()
      this.getCatesList()
      this.getFloorList()
  },
  // 获取轮播图列表
  getSwiperList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  // 获取导航列表
  getCatesList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
      .then(result => {
        this.setData({
          catesList: result.data.message
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  },
})