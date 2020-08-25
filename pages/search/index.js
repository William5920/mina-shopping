// pages/search/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inputValue: ''
  },
  TimeId: -1,
  handleInput(e) {
    // console.log(e)
    const {value} = e.detail
    // 防抖
    clearTimeout(this.TimeId)
    // 检验字符串的合法性
    if(!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      
      return
    }
    this.setData({isFocus: true})
    // 合法后发送请求获取数据
    // clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      // console.log(value)
      this.qsearch(value)
    }, 1200)
    
  },
  async qsearch(query) {
    const res = await request({url: '/goods/qsearch', data: {query}})
    // console.log(res)
    if(res.statusCode === 200) {
      this.setData({goods: res.data.message})
    }
  },
  handleCancel() {
    this.setData({
      goods: [],
      isFocus: false,
      inputValue: ''
    })
  }
  
})