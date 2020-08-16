// pages/cart/index.js
import {getSetting, openSetting, chooseAddress, showModal, showToast} from '../../utils/asyncWX.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 页面显示时读取缓存中的地址
  onShow() {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    // 计算底部总价格 总数量 全选
    this.setCart(cart)

    this.setData({
      address,
      cart
    })
    
    
  },
  // 点击选择收货地址
  /**
   * 调用小程序内置api获取用户的收货地址 wx.chooseAddress
   * 1.获取用户对小程序获取收货地址的权限状态scope
   * 2.如果用户从来没有调用过收货地址的api
   *  scope.address的值为undefined  直接调用api获取收货地址
   * 3.如果用户点击的是“获取收货地址”提示框的“确定” authSetting scope.address
   *  scope.address的值为true  直接调用api获取收货地址
   * 4.如果用户点击的是“获取收货地址”提示框的“取消”
   *  scope.address的值为false
   *    （1）诱导用户打开授权设置页面（wx.openSetting）重新授权
   *    （2）获取收获地址
   */
  async handleChooseAddress() {
    try {
      const res1 = await getSetting()
      if(res1.authSetting['scope.address']===false) {
        await openSetting()
      }
      const address  = await chooseAddress()
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      // console.log(address)
      wx.setStorageSync('address', address)
    } catch(err) {
      console.log(err)
    }
    
  },
  // 商品的选中
  /**
   * 绑定change事件
   * 获取到被修改的商品对象
   * 商品的选中状态 取反
   * 重新填回到data和缓存中
   * 重新计算全选 总价格 总数量
   */
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    // console.log(goods_id)
    const {cart} = this.data
    const index = cart.findIndex(item => item.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setData({cart})
    wx.setStorageSync('cart', cart)
    this.setCart(cart)
  },
  // 计算底部总价格 总数量 全选
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      if(item.checked) {
        totalPrice += item.goods_price * item.num
        totalNum += item.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length?allChecked:false
    this.setData({
      allChecked,
      totalPrice,
      totalNum
    })
  },
  // 商品全选处理
  handleItemAllCheck() {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(item => item.checked = allChecked)
    this.setCart(cart)

    this.setData({cart})
    wx.setStorageSync('cart', cart)
  },
  // 商品数量编辑
  async handleItemNumEdit(e) {
    // 获取需要编辑的商品id及操作
    const {id, operation} = e.currentTarget.dataset
    // 拿到购物车中的数据
    let {cart} = this.data
    // 找到相应的商品进行操作
    let index = cart.findIndex(item => item.goods_id === id)
    // 如果商品数量为1且operation为-1，弹窗提示是否要删除商品
    if(cart[index].num===1 && operation===-1) {
      const res = await showModal({content: '您确定要删除该商品吗？'})
      if(res.confirm) {
        cart.splice(index, 1)
      }
    } else {
      cart[index].num += operation
    }
    
    // 重新计算购物车中的数量和价格
    this.setCart(cart)
    // 操作完后设置回缓存和data中
    
    this.setData({cart})
    wx.setStorageSync('cart', cart)
  },
  // 结算
  async handlePay() {
    const {address, totalNum} = this.data
    // 验证是否有收货地址
    if(!address.userName) {
      await showToast({title: '您还没有选择收货地址'})
      return
    }
    // 验证购物车中是否有商品
    if(!totalNum) {
      await showToast({title: '您还没有选购商品'})
      return
    }
    // 上述均有，跳转至支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})