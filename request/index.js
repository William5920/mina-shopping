export const request = (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: function(results) {
                resolve(results)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}