// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    // 被选中的图片路径数组
    choosedImgs: [],
    // 文本域中的值
    textVal: ''
  },
  UpLoadImgs: [],
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
  // 点击“+”选择图片
  handleChooseImg() {
    // 调用小程序内置的选择图片api
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        // console.log(result)
        this.setData({
          choosedImgs: [...this.data.choosedImgs, ...result.tempFilePaths]
        })
      }
    })
  },
  // 点击删除图片
  handleDeleteImg(e) {
    // console.log(e.detail)
    const {index} = e.detail
    let {choosedImgs} = this.data
    choosedImgs.splice(index, 1)
    this.setData({choosedImgs})
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  handleFormSubmit() {
    const {textVal, choosedImgs} = this.data
    if(!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      })
      return
    }
    // 输入合法 将图片上传到外网中，再将返回的外网地址和文本域数据一起发请求提交给后台
    
    if(choosedImgs.length) {
      wx.showLoading({
        title: '正在上传中',
        mask: true,
      })
      // 遍历图片数组，多次发请求将图片上传到外网
      choosedImgs.forEach((v,i) => {
        wx.uploadFile({
          url: 'http://my.zol.com.cn/index.php?c=Ajax_User&a=uploadImg',
          filePath: v,
          name: 'myPhoto',
          formData: {},
          success: (result)=>{
            console.log(JSON.parse(result.data))
            let url = JSON.parse(result.data).url
            this.UpLoadImgs.push(url)
            wx.hideLoading()
            // 当所有图片都上传完后再向后台发送请求
            if(i === choosedImgs.length-1) {
              console.log('将文本内容和外网图片数组提交到后台中')
              // 重置页面
              this.setData({
                textVal: '',
                choosedImgs: []
              })
              // 返回上一页
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      })
    } else {
      console.log('只提交了文本')
       // 重置页面
       this.setData({
        textVal: '',
        choosedImgs: []
      })
      // 返回上一页
      wx.navigateBack({
        delta: 1
      })
    }
    

  }
  
})