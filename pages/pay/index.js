// pages/cart/index.js
import {showToast, requestPayment} from '../../utils/asyncWX.js'
import {request} from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  // 页面显示时读取缓存中的地址
  onShow() {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    // 显示被选中的商品
    cart = cart.filter(item => item.checked)
    // 计算底部总价格 总数量 全选
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      totalPrice += item.goods_price * item.num
      totalNum += item.num
    })

    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })

  },
  // 商品支付
  async handleOrderPay() {
    try {
      // 1.从缓存中获取token
      const token = wx.getStorageSync('token')
      // 2.如果没有token，跳转至支付授权页面获取相关数据
      if(!token) {
        wx.navigateTo({url: '/pages/auth/index'})
        await showToast({title: '未获取到token'})
        return
      }
      // 3.如果有token，进行下一步操作，创建订单

      // 3.1 请求体参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      let goods = []
      this.data.cart.forEach(item => goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price
      }))
      const createOrderParams = {order_price, consignee_addr, goods}
      // 4.发送请求创建订单
      const {order_number} = await request({url: '/my/orders/create', method: 'POST', data: createOrderParams})
      // 5.发起预支付请求
      const {pay} = await request({url: '/my/orders/req_unifiedorder', method: 'POST', data: {order_number}})
      // 6.发起微信支付
      await requestPayment(pay)
      // 7.查询订单状态
      const res = await request({url: '/my/orders/chkOrder', method: 'POST', data: {order_number}})
      await showToast({title: '支付成功！'})
      // 8.支付成功后删除购物车中被选中支付的商品
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(item => !item.checked)
      wx.setStorageSync('cart', newCart)
      // 9.跳转至订单页面
      wx.navigateTo({url: '/pages/order/index'})

    } catch(err) {
      await showToast({title: '支付失败！'})
      console.log(err)
    }
    
  }

})