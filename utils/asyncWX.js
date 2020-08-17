/**
 * promisify wx api
 */

 // 获取设置
 export const getSetting = () => {
     return new Promise((resolve, reject) => {
         wx.getSetting({
             success: (result)=>{
                resolve(result)
             },
             fail: (err)=>{
                 reject(err)
             }
         });
     })
 }

  // 打开设置
  export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result)=>{
               resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}

 // 获取地址
 export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result)=>{
               resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}

// 展示模态框
export const showModal = ({content}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success (res) {
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            }
        })
    })
}

// 展示toast
export const showToast = ({title}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 2000,
            success (res) {
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            }
        })
    })
}

// wx.login
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
        })
    })
}

// wx.requestPayment
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success (res) { resolve(res) },
            fail (err) { reject(err) }
        })
    })
}