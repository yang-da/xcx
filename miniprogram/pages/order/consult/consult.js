// pages/order/consult/consult.js
const request = require('../../../utils/request');
let userList = wx.getStorageSync('userList');
let token = userList.token;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],

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
    console.log(return_id)
    request({
      "Method": "Home.Order.getConsultationRecordLists",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token,
        "return_id": return_id //售后申请记录id
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      console.log(list);
      for (let i = 0; i < list.length; i++) {
        if (list[i].header_pic == '') {
          list[i].header_pic = 'http://ggb-service.ssup.cn/selfShop/img/zhenpinhui.png';
        }
        // list[i].content = this.escape2Html(list[i].content);
        list[i].content = list[i].content.replace(/\n/g,'<br>')
      }
      console.log(list);
      this.setData({
        list: list
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