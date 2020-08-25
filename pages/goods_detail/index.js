// pages/goods_detail/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    let options = currentPage.options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    // console.log(res)
    this.GoodsInfo = res.data.message
    // 检测商品是否被收藏
    const collect = wx.getStorageSync('collect') || []
    let isCollected = collect.some(v => v.goods_id===this.GoodsInfo.goods_id)

    this.setData({
      goodsObj: {
        goods_price: res.data.message.goods_price,
        goods_name: res.data.message.goods_name,
        // 部分iphone不识别webp图片格式
        // 通用解决办法是让后端修改格式
        // 前端的临时解决办法：在确保后台存在.jpg格式图片的情况下，将字符串中的.webp替换为.jpg
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.data.message.pics
      },
      isCollected
    })
  },
  // 点击放大预览图片
  handlePreviewPics(e) {
    // console.log(e)
    let urls = this.GoodsInfo.pics.map(item => item.pics_mid)
    let current = e.currentTarget.dataset.url
    wx.previewImage({
      urls,
      current
    })
  },
  // 商品加入购物车
  handleCartAdd() {
    // 1.从缓存中获取购物车数据
    let cart = wx.getStorageSync('cart')||[]
    // 2.判断商品是否已经存在于购物车中
    let index = cart.findIndex(item => item.goods_id === this.GoodsInfo.goods_id)
    // 3.不存在，将商品新增一个num属性并赋值为1,加入购物车
    // 4.存在，则将该商品的num加1
    if(index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    // 5.将改变后的购物车数据重新存储
    wx.setStorageSync('cart', cart)
    // 6.弹窗反馈加入成功
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    })
  },
  // 点击收藏商品
  handleCollect() {
    let isCollected = false
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(v => v.goods_id===this.GoodsInfo.goods_id)
    if(index!==-1) {
      // 商品已被收藏
      collect.splice(index, 1)
      isCollected = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      })
    } else {
      // 商品没被收藏
      collect.push(this.GoodsInfo)
      isCollected = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollected
    })
  }
  
})