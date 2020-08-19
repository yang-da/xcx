const request = require("../../utils/request");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrName: [], //规格数组 名
    arrId: [], //id集合
    price_min: 0,
    price_max: 0,
    num: 1,
    goods: [], //商品列表
    spec: [], // 规格参数
    goods_ok: {} //选中规格的商品
  },

  getNorms() { // 获取规格 商品信息
    request({
      "Method": "Home.Goods.getGoodSpecsByGoodsId",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": "MDAwMDAwMDAwMIGCb3M",
        "goods_id": "3908",
      },
      "Sign": "9527"
    }).then(res => {
      let {
        goods
      } = res.data.data;
      let {
        spec
      } = res.data.data;
      this.setData({
        price_min: res.data.data.price_min,
        price_max: res.data.data.price_max,
        goods: goods,
        // spec: spec,
        goods_ok: goods[0],
        spec: spec
      })
    })
  },
  choose(e) { //选择规格
    let id = e.target.dataset.id;
    let item = e.target.dataset.item;
    let index = e.target.dataset.index; //规格分类索引值
    let chindex = e.target.dataset.chindex; //规格里面小分类的索引值

    let spec = this.data.spec;
    let arrId = this.data.arrId;
    let arrName = this.data.arrName;
    //遍历选中第几大类的规格  下面的小分类
    for (let i = 0; i < spec[index].spec_item.length; i++) {
      if (i == chindex) {
        spec[index].spec_item[i].isClick = 1;
      } else {
        spec[index].spec_item[i].isClick = 0;
      }
    }

    arrId[index] = id;
    arrName[index] = item;
    let selectId = arrId.join('_');

    this.setData({
      spec: spec,
      arrId: arrId,
      arrName: arrName
    })
    // 判断规格id是否相等
    let goods = this.data.goods;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].key == selectId) {
        this.setData({
          goods_ok: goods[i]
        })
      }
    }


  },
  goShop() { //立即购买
    let arrId = this.data.arrId;
    let selectId = arrId.join('_');
    for (let i = 0; i < this.data.goods.length; i++) {
      if (this.data.goods[i].key != selectId) {
        wx.showModal({
          showCancel: false,
          content: '请选择规格',
          success: function (res) {

          }
        })
      }
    }

  },

  //渐入，渐出实现 
  show: function (that, param, opacity) {
    var animation = wx.createAnimation({
      //持续时间800ms
      duration: 800,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNorms();
    // 给每个规格增加属性
    let spec = this.data.spec;
    for (let i = 0; i < spec.length; i++) {
      for (let y = 0; y < spec[i].spec_item.length; y++) {
        spec[i].spec_item[y].isClick = 0;
      }
    }
    this.setData({
      spec: spec
    })

    // 淡入
    this.show(this, "fade", 1);
    setTimeout(() => {
      this.show(this, "fade", 0);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})