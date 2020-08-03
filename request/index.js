export const request = (params) => {
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: function(results) {
                resolve(results)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}