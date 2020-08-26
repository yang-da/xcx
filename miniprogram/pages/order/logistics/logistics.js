// pages/order/logistics/logistics.js
const request = require('../../../utils/request');
let userList = wx.getStorageSync('userList');
let token = userList.token;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    name: '',
    tel: '',
    State: 0,
    Traces: [],
    waybill_number: '',

    isFixed: false,
    tabsTop: 0
  },
  copyFun() { //复制内容
    wx.setClipboardData({
      data: this.data.waybill_number,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  callPhone() { //拨打电话
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.id,
    })
    request({
      "Method": "Home.Afterbuy.express",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token,
        "order_id": this.data.orderId //订单id
      },
      "Sign": "9527"
    }).then(res => {
      let {
        Traces,
        waybill_number,
        name,
        tel,
        State,
        pic_url
      } = res.data.data;
      console.log(Traces);
      for(let i =0;i<Traces.length;i++){
        Traces[i].date = Traces[i].AcceptTime.slice(0,5);
        Traces[i].time = Traces[i].AcceptTime.slice(6);
      }
      this.setData({
        Traces: Traces,
        waybill_number: waybill_number,
        name: name,
        tel: tel,
        State: State,
        pic_url: pic_url
      })
    })

    // 获取元素对于顶部的距离
    // wx.createSelectorQuery().select('.flow').boundingClientRect(res => {
    //   this.setData({
    //     tabsTop: res.top
    //   })
    // }).exec()

  },
  onPageScroll: function (e) {
    // var isSatisfy = e.scrollTop >= this.data.tabsTop ? true : false;
    // if (this.data.isFixed === isSatisfy) {
    //   return false;
    // }
    // this.setData({
    //   isFixed: isSatisfy
    // });
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