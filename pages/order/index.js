// pages/order/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: [
      {
        "order_id": 428,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": '2019/8/9 下午6:51:05',
        "update_time": '2019/8/9 下午6:51:05',
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      },
      {
        "order_id": 428,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": '2019/8/9 下午6:51:05',
        "update_time": '2019/8/9 下午6:51:05',
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      },
      {
        "order_id": 428,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": '2019/8/9 下午6:51:05',
        "update_time": '2019/8/9 下午6:51:05',
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      }
    ]
  },
  onShow() {
    // onShow里面拿不到页面路径里面的参数，onLoad里面能拿到
    // 判断是否有token
    // const token = wx.getStorageSync('token')
    // if(!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   })
    //   return
    // }
    // 从页面栈里获取当前页面路径参数
    let pages =  getCurrentPages()
    
    var currentPage = pages[pages.length-1]
    // console.log(currentPage.options)
    const {type} = currentPage.options
    // 根据type改变当前tab
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
    
  },
  // 获取订单数据
  async getOrders(type) {
    const res = await request({url: '/my/orders/all', data: {type}})
    console.log(res)
    // 由于无法拿到有效token获取数据，此处无法正常执行
    if(res.data.meta.status !== 401) {
      this.setData({orders: res.data.orders})
    }

  },
  // 根据索引改变当前tab
  changeTitleByIndex(index) {
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
  // 标题点击事件
  handleTabsItemChange(e) {
    const {index} = e.detail
    // 改变当前tab
    this.changeTitleByIndex(index)
    // 重新获取订单数据
    this.getOrders(index+1)
  },
})