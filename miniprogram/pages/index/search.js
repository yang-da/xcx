// pages/index/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    hotList: ['大花轿','大家好','渣渣辉','哪吒'],
    inputValue: '',
    hasList: false,

    percent: 0
  },
  searchFun() { //搜索方法


  },
  getStorage() { //获取历史记录
    var storageValue = wx.getStorageSync('searchValue');
    if (storageValue == '') {
      storageValue = [];
    } else {
      storageValue = JSON.parse(storageValue);
      this.setData({
        historyList: storageValue,
        hasList: true
      })
    }
  },
  getValue(e) { //获取搜索框内容 并存储
    let value = e.detail.value;
    let storageValue = wx.getStorageSync('searchValue');
    if (storageValue == '') {
      storageValue = [];
    } else {
      storageValue = JSON.parse(storageValue);
    }

    if (value != '') {
      if(storageValue.indexOf(value)!=-1){
        return false;
      }
      storageValue.unshift(value);
    }
    wx.setStorageSync('searchValue', JSON.stringify(storageValue));
    //进行搜索方法
    this.setData({
      inputValue: value
    })
  },
  searchHot(e){ //热门词搜索
    let item = e.target.dataset.item;
    // 存储历史记录
    let storageValue = wx.getStorageSync('searchValue');
    if (storageValue == '') {
      storageValue = [];
    } else {
      storageValue = JSON.parse(storageValue);
    }
    if(storageValue.indexOf(item)!=-1){
      return false;
    }
    storageValue.unshift(item);
    wx.setStorageSync('searchValue', JSON.stringify(storageValue));
    //进行搜索方法
    this.setData({
      inputValue: item
    })
  },
  delete(){ // 清除历史搜索记录
    wx.removeStorageSync('searchValue');
    this.setData({
      historyList: [],
      hasList: false
    })
  },

  percentFun(){ //vant 组件
    this.setData({
      percent: 45
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStorage();

    this.percentFun()
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