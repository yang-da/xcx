// pages/problem/problem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
  showDown(e){ //展示
    let index = e.currentTarget.dataset.index;
    let list = this.data.list;
    list[index].select = !list[index].select;
    this.setData({
      list: list,
    })
  },
  showDetail(e){ //详情
    let id = e.target.dataset.id;
    let item = e.target.dataset.item;
    wx.navigateTo({
      url: 'answer?id='+id+'&item='+item+'',
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://mapi.lonshon.com/index.php/Home/Api/entrance',
      method: "post",
      data: {
        "Method": "Home.Pcenter.articleList",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {},
        "Sign": "9527"
      },
      success: (res) => {
        let {
          list
        } = res.data.data;
        for (let i = 0; i < list.length; i++) {
          list[i].select = false;
        }
        this.setData({
          list: list,
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