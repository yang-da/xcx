const request = require("../../../utils/request");
let userList = wx.getStorageSync('userList');
let token = userList.token;
// token = "MDAwMDAwMDAwMIGCb3M";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liIndex: 0,
    show: false, //下拉
    qdss: false, //确定收货
    qxdd: false, //取消订单
    scdd: false, //删除订单
    isUse: false, //是否使用积分
    money: '', //计算得出现金金额
    loadText: '暂无更多数据',
    loadText2: '暂无更多数据',

    dataList: [],
    assessList: [],
    order_status: '',
    page: 1,
    order_id: 284, //订单ID 弹窗时赋值
    discriminate: 2, //区分确认收货、取消订单、删除订单
  },
  getList: function () { //订单列表数据
    //获取当前索引值
    let order_status = this.data.order_status;
    let page = this.data.page;
    request({
      "Method": "Home.Order.myOrder",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token,
        "order_status": order_status, //订单状态：空为全部订单，-1：取消订单；0 未支付，1已支付，2，发货中，3已发货，4已收货，5退货审核中，6审核失败，7审核成功，8退款中，9退款成功, 
        "p": page //当前页数
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      console.log(list);
      if (list.length >= 10) {
        this.setData({
          loadText: '正在加载',
        })
      } else {
        this.setData({
          loadText: '暂无更多数据',
        })
      }
      if (page == 1) {
        this.setData({
          dataList: list,
        })
      } else { //如果不为第一页，则合并数组
        this.setData({
          dataList: [...this.data.dataList, ...list],
        })
      }

    })
  },
  assess() { //获取待评价类表
    let page = this.data.page;
    request({
      "Method": "Home.Order.notEvaluate",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token,
        "p": page
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      console.log(list);
      if (list.length >= 6) {
        this.setData({
          loadText2: '正在加载',
        })
      } else {
        this.setData({
          loadText2: '暂无更多数据',
        })
      }
      if (page == 1) {
        this.setData({
          assessList: list,
        })
      } else { //如果不为第一页，则合并数组
        this.setData({
          assessList: [...this.data.assessList, ...list],
        })
      }
    })
  },
  chooseStatusFun: function (e) { //选择状态
    let index = e.currentTarget.dataset.index;
    // 初始化页数
    this.setData({
      liIndex: index,
      page: 1
    })
    if (index == 0) {
      this.setData({
        order_status: '' //全部订单
      })
    } else if (index == 1) {
      this.setData({
        order_status: "0" //待支付
      })
    } else if (index == 2) {
      this.setData({
        order_status: "1" // 1 || 2  待发货
      })
    } else if (index == 3) {
      this.setData({
        order_status: "3" //待收货
      })
    }
    if (index != 4 && index != 5) {
      // 获取数据
      this.getList();
    }
  },
  // 下拉框方法
  showPopup(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      order_id: id,
      show: true
    });
  },
  onClose() { //关闭下拉框
    this.setData({
      show: false
    });
  },
  closeGray() { //关闭灰色遮罩
    this.setData({
      qdss: false,
      qxdd: false,
      scdd: false
    });
  },
  confirm(e) { //确定收货
    let id = e.target.dataset.id;
    this.setData({
      order_id: id,
      discriminate: 1
    })

    this.setData({
      qdss: true
    });
  },
  cancelFun(e) { //取消订单
    let id = e.target.dataset.id;
    this.setData({
      order_id: id,
      discriminate: 2
    })

    this.setData({
      qxdd: true
    });
  },
  deleteFun(e) { //删除订单
    let id = e.target.dataset.id;
    this.setData({
      order_id: id,
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
          "token": token,
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
          "token": token,
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
          "token": token,
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
    this.setData({
      page: 1,
      scdd: false,
      qdss: false,
      qxdd: false,
      show: false,
    })
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
    this.getList();
  },
  buyAgain(e) { //再次购买
    let index = e.target.dataset.index;
    let arr = [];
    let obj = {};
    let dataList = this.data.dataList;
    for (let i = 0; i < dataList[index].goods.length; i++) {
      obj.goods_num = dataList[index].goods[i].goods_num;
      obj.goods_id = dataList[index].goods[i].goods_id;
      obj.goods_price = dataList[index].goods[i].price_member;

      arr.push(obj);
      obj = {};
    }
    console.log(arr)
    arr = JSON.stringify(arr);
    request({
      "Method": "Home.Order.buyAgain",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token,
        "goods": arr //商品信息组
      },
      "Sign": "9527"
    }).then(res => {
      wx.switchTab({
        url: '../../cart/cart'
      })
    })
    // wx.switchTab({
    //   url: '/index'
    // })
  },
  // goLogistics() { //跳转去物流
  //   wx.navigateTo({
  //     url: '../logistics/logistics',
  //   })
  // },
  // 选择支付方式
  choosePay() {
    this.setData({
      isUse: !this.data.isUse
    })
  },
  goPay() { //去支付
    let id = this.data.order_id;
    request({
      "Method": "Home.WxJsPay.getWxPayInfo",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": token, //用户token
        "order_id": id
      },
      "Sign": "9527"

    }).then(res => {
      let {
        data
      } = res.data;
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': data.signType,
        'paySign': data.paySign,
        'success': function (res) {

        },
      })
    })
  },
  jumpDetail(e) { //跳转到订单详情
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../detail/detail?order_id=' + id + '',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 订单列表
    this.getList();
    // 待评价获取数据
    setTimeout(res => {
      this.assess();
    }, 1000)
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
    let page = this.data.page + 1;
    this.setData({
      page: page,
    })
    setTimeout(() => {
      if (this.data.liIndex != 4) {
        this.getList();
      }
      if (this.data.liIndex == 4) {
        this.assess();
      }
    }, 500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})