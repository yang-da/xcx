//app.js
App({
  data: {
    url: 'http://mapi.lonshon.com/index.php/Home/Api/entrance'
  },
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}

    // 登录获取code
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: this.data.url,
            method: 'post',
            data: {
              "Method": "Home.Register.loginUser",
              "Timestamp": "2020-07-29 10:27:48",
              "Version": "1.0",
              "Body": {
                "code": res.code
              },
              "Sign": "9527"
            },
            success: (res) => {
              wx.setStorage({
                key: "token",
                data: res.data.data.token
              })
              // wx.getStorage({
              //   key: 'token',
              //   success: (res)=> {
              //     let token = res.data;
              //     console.log(token)
              //   }
              // })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }



})