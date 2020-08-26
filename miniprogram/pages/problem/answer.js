// pages/problem/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    content: '',
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
    console.log(options)
    let id = options.id;
    this.setData({
      item: options.item,
    })
    wx.request({
      url: 'http://mapi.lonshon.com/index.php/Home/Api/entrance',
      method: "post",
      data: {
        "Method": "Home.Pcenter.articleDetail",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {
          "article_id": id
        },
        "Sign": "9527"
      },
      success: (res) => {
        let {content} = res.data.data;
        content = this.escape2Html(content);
        this.setData({
          content: content,
        })
      }
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