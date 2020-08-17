export const request = (params) => {
    let ajaxTimes = 0
    wx.showLoading({
        title: '加载中',
        mask: true,
    })
    // 决定是否添加token
    let header = {...params.header}
    if(params.url.includes('/my/')) {
        header['Authorization'] = wx.getStorageSync('cart')
    }

    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        ajaxTimes++
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: function(results) {
                resolve(results)
            },
            fail: function(err) {
                reject(err)
            },
            complete: ()=>{
                ajaxTimes--
                if(ajaxTimes === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}