const app = getApp();

module.exports=(data)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      method:"post",
      url: app.data.url,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: resolve,
      fail: reject
    })
  })
}
