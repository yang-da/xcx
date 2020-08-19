// pages/order/consult/consult.js
const request = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        "id": "46", //协商记录id
        "name": "系统", //协商记录主体（个人/系统）
        "create_time": "2019-12-28 16:47:41", //协商记录添加时间
        "content": "卖家同意申请\n退款成功", //协商记录内容
        "type": "1", //0：个人/1：系统
        "user_id": "314" //用户id
      },
      {
        "id": "2",
        "name": "qiuxs", //记录主体（个人/系统）
        "create_time": "2019-12-21 16:31:05",
        "content": "提交售后申请\n申请售后原因：不想要了\n申请数量：2\n退款金额：3699\n问题描述：商品破损\n上传图片：<img src=\"/Uploads/goods/2019-08-16/thumb_5d565511e8991.jpg\" /><img src=\"/Uploads/goods/2019-08-16/thumb_5d565511e8553.jpg\" />",
        "type": "0", //0：个人/1：系统
        "user_id": "314"
      }
    ],

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
        "token": "MDAwMDAwMDAwMIGCb3M", //用户token
        "return_id": return_id //售后申请记录id
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      console.log(list);
      for(let i = 0;i<list.length;i++){
        if(list[i].img==''){
          list[i].img='http://ggb-service.ssup.cn/selfShop/img/zhenpinhui.png';
        }
      }
      this.setData({
        // list: list
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