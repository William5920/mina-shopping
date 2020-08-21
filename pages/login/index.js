// pages/login/index.js
Page({
  // 获取用户信息
  handleGetUserInfo(e) {
    console.log(e)
    if(e.detail.userInfo) {
      const {userInfo} = e.detail
      wx.setStorageSync('userInfo', userInfo)
      wx.navigateBack({
        delta: 1
      })
    } else {
      return
    }
    
  }
})