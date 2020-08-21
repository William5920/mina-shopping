// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onShow() {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({userInfo})
  }
})