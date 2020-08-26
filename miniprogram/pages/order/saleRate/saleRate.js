// pages/order/saleRate/saleRate.js
const request = require('../../../utils/request');
let userList = wx.getStorageSync('userList');
let token = userList.token;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orderId: '',
    tip: ''
  },
  jumpChange(e) { //跳转到修改物流
    let status = e.target.dataset.status;
    wx.navigateTo({
      url: '../wlxx/editWlxx?return_id=' + this.data.return_id + '&waybill_number=' + this.data.waybill_number + '&express=' + this.data.express + '&status=' + status + '',
    })
  },
  jumpRecord() { //跳转到协商记录
    let return_id = this.data.return_id;
    wx.navigateTo({
      url: '../consult/consult?return_id=' + return_id + '',
    })
  },
  copyFun() {
    wx.setClipboardData({
      data: this.data.orderId,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  escape2Html(str) { //转译方法
    var arrEntities = {
      'lt': '<',
      'gt': '>',
      'nbsp': ' ',
      'amp': '&',
      'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
      return arrEntities[t];
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let return_id = options.return_id;
    this.setData({
      return_id: return_id
    })
    request({
      "Method": "Home.Order.getProgressQuery",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token,
        "return_id": return_id //售后记录id
      },
      "Sign": "9527"
    }).then(res => {
      let {
        data
      } = res.data;
      console.log(data);
      let tip = this.escape2Html(data.tip);
      this.setData({
        data: data,
        orderId: data.order_sn_id,
        active: data.status,
        tip: tip,
      })
    })

    // 获取售后地址
    // request({
    //   "Method": "Home.Order.getAfterSaleInfo",
    //   "Timestamp": "2020-07-29 10:27:48",
    //   "Version": "1.0",
    //   "Body": {
    //     "token": token
    //   },
    //   "Sign": "9527"
    // }).then(res => {
    //   let address = res.data.data.after_sale_info;
    //   this.setData({
    //     address: address
    //   })
    // })
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