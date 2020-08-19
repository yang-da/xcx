const request = require("../../../utils/request");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    loadText: '暂无更多数据',
    loadText2: '暂无更多数据',
    dataList: [],
    dataList2: [],
    status: "0",
    page: 1
  },

  getList: function () { //请求列表
    request({
      "Method": "Home.Order.newAfterSaleOrder",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": "MDAwMDAwMDAwMIGCb3M", //用户token
        "status": "0", //售后状态：0 售后中，1 售后完成
        "p": this.data.page //当前页数
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      console.log(list)
      if (list.length >= 10) {
        this.setData({
          loadText: '正在加载',
        })
      } else {
        this.setData({
          loadText: '暂无更多数据',
        })
      }
      if (this.data.page == 1) {
        this.setData({
          dataList: list
        })
      } else {
        this.setData({
          dataList: [...this.data.dataList, ...list]
        })
      }
    })
  },
  getList2: function () { //请求列表 售后完成的
    request({
      "Method": "Home.Order.newAfterSaleOrder",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": "MDAwMDAwMDAwMIGCb3M", //用户token
        "status": "1", //售后状态：0 售后中，1 售后完成
        "p": this.data.page //当前页数
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      console.log(list)
      if (list.length >= 10) {
        this.setData({
          loadText2: '正在加载',
        })
      } else {
        this.setData({
          loadText2: '暂无更多数据',
        })
      }
      if (this.data.page == 1) {
        this.setData({
          dataList2: list
        })
      } else {
        this.setData({
          dataList2: [...dataList2, ...list]
        })
      }

    })
  },
  change(e) { //tab改变
    let index = e.detail.index;
    this.setData({
      tabIndex: index
    })
  },
  goDetail: function (e) { //查看详情
    let id = e.target.dataset.id;
    // let type = e.target.dataset.type;
    // if (type == 1) {
    //   wx.navigateTo({
    //     url: '../saleRate2/saleRate2?return_id=' + id + '',
    //   })
    // }
    // if (type == 2) {
    // }
    wx.navigateTo({
      url: '../saleRate/saleRate?return_id=' + id + '',
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    this.getList2();
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

    if (this.data.tabIndex == 0) {
      this.getList();
    }
    if (this.data.tabIndex == 1) {
      this.getList2();
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})