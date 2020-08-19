// pages/order/wlxx/wlxx.js
const request = require("../../../utils/request");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: false,
    number: 694533145666321,

    index: 0,
  },
  // jumpGs(){
  //   wx.navigateTo({
  //     url: "choose"
  //   })
  // },
  bindInput(e) {
    this.setData({
      input: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      "Method": "Home.Order.getSearchExpress",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": "MDAwMDAwMDAwMIGCb3M" //用户token
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      let arr = [];
      let idArr = [];
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].name);
        idArr.push(list[i].id);
      }

      this.setData({
        list: list,
        arr: arr,
        idArr: idArr,
        wlid: idArr[0]
      })
    })
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