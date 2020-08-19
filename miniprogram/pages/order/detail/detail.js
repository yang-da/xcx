// pages/order/detail/detail.js
// import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const request = require("../../../utils/request");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, //vant下拉框
    qdss: false, //确定收货
    qxdd: false, //取消订单
    scdd: false, //删除订单
    order_id: '', //订单ID 弹窗时赋值
    discriminate: -1, //区分确认收货、取消订单、删除订单
    isUse: false, //是否用券
    money: '199',

    data: {}, //返回的详细信息数据
    order_sn_id: '', //订单号
  },
  getDetail() { //获取订单详细信息
    request({
      "Method": "Home.Order.orderDetail",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": "MDAwMDAwMDAwMIGCb3M", //用户token
        "order_id": this.data.order_id //订单id
      },
      "Sign": "9527"

    }).then(res => {
      let {
        data
      } = res.data;
      this.setData({
        data: data,
        order_sn_id: data.order_sn_id
      })
      // 计算时间
      let timer = setInterval(() => {
        this.get_curentdate();
        // this.data.data.cancle_time
        this.diffTime(this.data.curentdate, this.data.data.cancle_time);
        if(this.data.returnStr == '已关闭'){
          clearInterval(timer);
        }
      }, 1000);
    })
  },

  copyFun() { //复制
    wx.setClipboardData({
      data: this.data.order_sn_id,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  preventTouchMove() {
    return false;
  },
  // 下拉框方法
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 弹出框方法
  closeGray() { //关闭灰色遮罩
    this.setData({
      qdss: false,
      qxdd: false,
      scdd: false
    });
  },
  confirm(e) { //确定收货
    this.setData({
      order_id: this.data.order_id,
      discriminate: 1
    })

    this.setData({
      qdss: true
    });
  },
  cancelFun(e) { //取消订单
    this.setData({
      order_id: this.data.order_id,
      discriminate: 2
    })

    this.setData({
      qxdd: true
    });
  },
  deleteFun(e) { //删除订单
    this.setData({
      order_id: this.data.order_id,
      discriminate: 3
    })

    this.setData({
      scdd: true
    });
  },
  onYes() { //点击确定
    let id = this.data.order_id;
    console.log(id);
    let discriminate = this.data.discriminate;
    if (discriminate == 1) { //确认收货
      request({
        "Method": "Home.Order.confirm_receipt",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {
          "token": "MDAwMDAwMDAwMIGCb3M",
          "order_id": id //订单id
        },
        "Sign": "9527"
      }).then(res => {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
        })
      })
    } else if (discriminate == 2) { //取消订单
      request({
        "Method": "Home.Order.order_cancel",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {
          "token": "MDAwMDAwMDAwMIGCb3M",
          "order_id": id //订单id
        },
        "Sign": "9527"
      }).then(res => {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
        })
      })
    } else if (discriminate == 3) { //删除订单
      request({
        "Method": "Home.Order.deleteOrder",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {
          "token": "MDAwMDAwMDAwMIGCb3M",
          "order_id": id //订单id
        },
        "Sign": "9527"
      }).then(res => {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
        })
      })
    }
    setTimeout(() => {
      //返回页面
      wx.navigateTo({
        url: '../myOrder/myOrder'
      })
    }, 2000);

  },
  choosePay() { // 选择支付方式
    this.setData({
      isUse: !this.data.isUse
    })
  },
  onPageScroll: function (e) { //页面滚动事件
    if (e.scrollTop > 125) {
      wx.setNavigationBarTitle({
        title: '订单详情'
      })
    } else {
      wx.setNavigationBarTitle({
        title: ''
      })
    }
  },
  // --------------------
  go_comment() { //去评价页
    wx.navigateTo({
      url: '../../ware/comment/comment?order_id' + this.data.order_id,
    })
  },
  go_logistics() { //去查看物流
    wx.navigateTo({
      url: '../logistics/logistics?order_id' + this.data.order_id,
    })
  },
  //去追评页
  // --------------------
  get_curentdate() { //获取当前时间
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    let date = myDate.getDate();
    let hour = myDate.getHours();
    hour = hour > 9 ? hour : '0' + hour;
    let minute = myDate.getMinutes();
    minute = minute > 9 ? minute : '0' + minute;
    let second = myDate.getSeconds();
    second = second > 9 ? second : '0' + second;
    this.setData({
      curentdate: year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second,
    })
  },
  diffTime(startDate, endDate) { //计算时间
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var diff = endDate.getTime() - startDate.getTime(); //时间差的毫秒数

    //计算出相差天数
    var days = Math.floor(diff / (24 * 3600 * 1000));

    //计算出小时数
    var leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);

    var returnStr = seconds + "秒";
    if (minutes > 0) {
      returnStr = minutes + "分" + returnStr;
    }
    if (hours > 0) {
      returnStr = hours + "小时" + returnStr;
    }
    if (days > 0) {
      returnStr = days + "天" + returnStr;
    }
    if(returnStr.indexOf('-')==0){
      returnStr = '已关闭';
    }else{
      returnStr = returnStr + '自动关闭';
    }
    this.setData({
      returnStr: returnStr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let order_id = options.order_id;
    this.setData({
      order_id: order_id,
    })
    this.getDetail();

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