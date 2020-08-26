// pages/order/wlxx/editWlxx.js
const request = require('../../../utils/request');
let userList = wx.getStorageSync('userList');
let token = userList.token;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editStatus: false,
    index: 0, //picker 的 index
    wlid: 0, //物流id
    address: '',
    waybill_number: '', //物流单号
    express:'', //物流公司
  },
  jumpEdit() {
    // wx.navigateTo({
    //   url: 'editWlxx2',
    // })
    this.setData({
      editStatus: true,
    })
  },
  // bindInput(e) {
  //   this.setData({
  //     input: true
  //   })
  // },
  bindblur(e) {
    this.setData({
      input: true,
      waybill_number: e.detail.value
    })
  },
  bindchange(e) { //picker 改变
    let index = e.detail.value;
    // console.log(index);
    let idArr = this.data.idArr;
    let wlid = idArr[index];
    this.setData({
      index: index,
      wlid: wlid,

      input: true
    })
  },
  submitFun() { //提交
    if(this.data.waybill_number == ''){
      wx.showToast({
        title: '请填写物流单号',
        icon: 'none'
      })
      return false;
    }
    request({
      "Method": "Home.Order.setCourierNumber",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token, //用户token
        "return_id": this.data.return_id, //订单售后记录id
        "express_id": this.data.wlid, //快递公司id
        "waybill_number": this.data.waybill_number, //快递号
      },
      "Sign": "9527"
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 2000
      })
      setTimeout(()=>{
        wx.redirectTo({
          url: '../myOrder/myOrder'
        })
      },2000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let return_id = options.return_id; //售后记录id
    let waybill_number = options.waybill_number == 'undefined' ? '' : options.waybill_number; //物流单号
    let express = options.express == 'undefined' ? '' : options.express; //快递公司
    // 判断是填写还是修改
    if (options.status >= 3) {
      this.setData({
        return_id: return_id,
        waybill_number: waybill_number,
        express: express,
      })
    }
    if (options.status < 3) {
      this.setData({
        return_id: return_id,
        editStatus: true
      })
      wx.setNavigationBarTitle({
        title: '填写物流信息'
      })
    }

    // 获取物流列表
    request({
      "Method": "Home.Order.getSearchExpress",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token //用户token
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
    //获取收件人信息
    request({
      "Method": "Home.Order.getAfterSaleInfo",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token //用户token
      },
      "Sign": "9527"
    }).then(res => {
      let address = res.data.data.after_sale_info;
      this.setData({
        address: address
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