// pages/auth/index.js
import {login} from '../../utils/asyncWX.js'
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e) {
    try {
      const {encryptedData, iv, rawData, signature} = e.detail
      const res1 = await login()
      const code = res1.code
      const tokenParams = {encryptedData, iv, rawData, signature, code}
      // 发送请求获取token
      const res2 = await request({
        url: '/users/wxlogin',
        method: 'post',
        data: tokenParams
      })
      const {token} = res2
      // 把token存入缓存中，同时跳转回上一个页面
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1
      })
    } catch(err) {
      console.log(err)
    }
    
  }
})