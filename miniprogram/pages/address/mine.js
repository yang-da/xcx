// pages/address/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    url: '../../images/tishi.png',

    fileList: [],
    index: 0, //picker 索引
    reason: [],
    length: 0, //字符串长度
  },
  showSome() {
    this.setData({
      flag: true
    })

    let animate = wx.createAnimation({
      delay: 100,
      timingFunction: 'ease'
    }).translateY(0).step();
    this.setData({
      animationData: animate.export(),
    })

  },
  hideSome() {
    let animate = wx.createAnimation({
      delay: 100,
      timingFunction: 'ease'
    }).translateY('100%').step();
    this.setData({
      animationData: animate.export(),
    })

    setTimeout(res => {
      this.setData({
        flag: false
      })
    }, 100)
  },
  photograph() { //拍照
    wx.chooseImage({
      count: 1,
      sourceType: ["camera"],
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          url: tempFilePaths
        })
      }
    })
    this.hideSome();
  },
  album() { //相册
    wx.chooseImage({
      count: 1,
      sourceType: ["camera"],
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          url: tempFilePaths
        })
      }
    })
    this.hideSome();
  },

  afterRead(event) { //上传图片
    const {
      file
    } = event.detail;
    console.log(file)

    // let fileList = [];
    // fileList.push({ ...this.data.fileList, url: file })
    // this.setData({
    //   fileList: fileList
    // })
    const {
      fileList = []
    } = this.data;
    fileList.push({
      url: file.path,
      deletable: true
    });
    this.setData({
      fileList
    })

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'http://mapi.lonshon.com/index.php', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: {
    //     user: 'test'
    //   },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  delete(e) { //删除图片
    console.log(e.detail.index)
    let index = e.detail.index;
    let fileList = this.data.fileList;
    fileList.splice(index, 1);
    this.setData({
      fileList: fileList
    })
  },

  bindchange(e){ //picker选择
    let value = e.detail.value;
    this.setData({
      index: value
    })
  },
  bindinput(e){
    let value = e.detail.value;
    this.setData({
      length: value.length
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      method:'post',
      url: 'http://mapi.lonshon.com/index.php/Home/Api/entrance',
      data:{
        "Method": "Home.Order.applyRefund",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {
          "token":"MDAwMDAwMDAwMIGCb3M",//用户token
          "order_id": "289",//订单id
          "goods_id": "3895"//申请售后商品id
        },
        "Sign":"9527"
      },
      success: res=>{
        let {reason,goods} = res.data.data;
        this.setData({
          goods: goods,
          reason: reason
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