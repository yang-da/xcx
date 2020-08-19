// pages/order/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '派送中',
    kd_type: '顺丰快递',
    orderId: '85979668413389',
    phone: '1008611',

    isFixed: false,
    tabsTop: 0
  },
  copyFun() { //复制内容
    wx.setClipboardData({
      data: this.data.orderId,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  callPhone(){ //拨打电话
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取元素对于顶部的距离
    wx.createSelectorQuery().select('.flow').boundingClientRect(res => {
      this.setData({
        tabsTop: res.top
      })
    }).exec()

  },
  onPageScroll: function (e) {
    console.log(1)
    var isSatisfy = e.scrollTop >= this.data.tabsTop ? true : false;
    if (this.data.isFixed === isSatisfy) {
      return false;
    }
    this.setData({
      isFixed: isSatisfy
    });
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