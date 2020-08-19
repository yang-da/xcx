// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prov: [],
    city: [],
    qu: [],
    provIndex: 0,
    cityIndex: 0,
    quIndex: 0,
    eindex: [0, 0, 0],

    address: "",
    animationData: {},
  },

  getList() {
    wx.request({
      url: 'http://mapi.lonshon.com/index.php/Home/Api/entrance',
      method: 'post',
      data: {
        "Method": "Home.Pcenter.addressPlace",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {
          "token": "MDAwMDAwMDAwMIGCb3M",
        },
        "Sign": "9527"
      },
      success: (res) => {
        let {
          list
        } = res.data.data;
        this.setData({
          prov: list,
          city: list[0].son,
          qu: list[0].son[0].grandson
        })
      }
    })
  },
  bindChange(e) {
    let eindex = e.detail.value;
    let index1 = e.detail.value[0];
    let index2 = e.detail.value[1];
    let index3 = e.detail.value[2];
    this.setData({
      eindex: eindex,
      provIndex: index1,
      cityIndex: index2,
      quIndex: index3,
      city: this.data.prov[index1].son,
    })

    setTimeout(() => {
      this.setData({
        qu: this.data.city[index2].grandson,
      })
    }, 100)
  },
  show() { //展示
    let animal1 = wx.createAnimation({
      timingFunction: 'ease',
      duration: 500
    }).translate(0, 0).step()
    this.setData({
      animationData: animal1.export(),
    })
  },
  hide() { //隐藏
    let animal1 = wx.createAnimation({
      timingFunction: 'ease',
      duration: 500
    }).translate(0, 284).step()
    this.setData({
      animationData: animal1.export(),
    })
  },
  ok() { //确定
    this.hide();

    let provIndex = this.data.provIndex;
    let cityIndex = this.data.cityIndex;
    let quIndex = this.data.quIndex;
    let name = '';
    if (this.data.qu.length == 0) {
      name = '';
    } else {
      name = this.data.qu[quIndex].name;
    }
    this.setData({
      address: this.data.prov[provIndex].name + ' ' + this.data.city[cityIndex].name + ' ' + name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})