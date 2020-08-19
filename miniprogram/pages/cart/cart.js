// pages/cart/cart.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
const request = require("../../utils/request");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasData: false,
    allPrice: 0,
    carts: [],
    is_invalid: false, //商品是否有效
  },
  changeSelect(e) { //改变单个商品是否选中
    let index = e.target.dataset.index;
    let carts = this.data.carts;
    let selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    })
    // 判断是否全部选中
    let length = this.data.carts.length;
    let selectlength = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        selectlength = selectlength + 1;
      } else {
        selectlength = 0;
      }
    }
    if (selectlength == length) {
      this.setData({
        allSelectd: true
      })
    } else {
      this.setData({
        allSelectd: false
      })
    }
    this.getAllPrice();
  },
  changeAllSelect() { //是否全选
    let allSelectd = this.data.allSelectd;
    allSelectd = !allSelectd;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = allSelectd;
    }
    this.setData({
      carts: carts,
      allSelectd: allSelectd
    })
    this.getAllPrice();
  },
  plus(e) { //加
    let index = e.target.dataset.index;
    let carts = this.data.carts;
    let stock = parseInt(carts[index].stock);
    let num = parseInt(carts[index].goods_num);
    let id = e.target.dataset.id;

    num = num + 1;
    if (num > stock) {
      wx.showToast({
        title: '库存不足',
        icon: 'none'
      })
      return false;
    }

    request({
      "Method": "Home.Cart.addReduce",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "type": "1",
        "cart_id": id
      },
      "Sign": "9527"
    }).then(res => {
      carts[index].goods_num = num;
      this.setData({
        carts: carts
      })
      this.getAllPrice();
    })
  },
  cut(e) { //减
    let index = e.target.dataset.index;
    let carts = this.data.carts;
    let num = parseInt(carts[index].goods_num);
    let id = e.target.dataset.id;

    if (num <= 1) {
      wx.showToast({
        title: '购买数量最少一件',
        icon: 'none'
      })
      return false;
    }

    request({
      "Method": "Home.Cart.addReduce",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "type": "2",
        "cart_id": id
      },
      "Sign": "9527"
    }).then(res => {
      num = num - 1;
      carts[index].goods_num = num;
      this.setData({
        carts: carts
      })
      this.getAllPrice();
    })
  },
  getAllPrice() { //获取总价
    let carts = this.data.carts;
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].invalid == 0 && carts[i].selected == true) {
        total += carts[i].price_member * carts[i].goods_num;
      }
    }
    this.setData({
      allPrice: total.toFixed(2)
    })
  },
  onClose(e) { //左滑删除
    let id = e.target.dataset.id;

    request({
      "Method": "Home.Cart.delete",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "cart_id": id
      },
      "Sign": "9527"
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
      })
      // 请求列表
      this.getCartList();
    })

    // let index = e.target.dataset.index;
    // let carts = this.data.carts;
    // for (let i = 0; i < carts.length; i++) {
    //   if (i == index) {
    //     carts.splice(i, 1);
    //   }
    // }
    // this.setData({
    //   carts: carts
    // })
    // if (carts.length == 0) {
    //   this.setData({
    //     hasData: false,
    //     allPrice: 0,
    //   })
    // }
  },
  onStar(e) { //左滑收藏
    let pid = e.target.dataset.pid;
    console.log(pid)
    request({
      "Method": "Home.Cart.muchCollection",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": "MDAwMDAwMDAwMIGCb3M",
        "goods_id": pid
      },
      "Sign": "9527"
    }).then(res => {
      wx.showToast({
        title: '收藏成功',
      })
    })
  },
  getCartList() { //获取商品列表
    request({
      "Method": "Home.Cart.myCartList",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "token": "MDAwMDAwMDAwMIGCb3M", //用户token 可为空
      },
      "Sign": "9527"
    }).then(res => {
      let {
        goods
      } = res.data.data;
      for (let i = 0; i < goods.length; i++) {
        goods[i].selected = false;
      }
      this.setData({
        carts: goods
      })
      if (goods.length > 0) {
        this.setData({
          hasData: true
        })
      } else {
        this.setData({
          hasData: false
        })
      }
      // 获取价格 及 判断是否有效
      this.getAllPrice();
      this.judgeShop();
    })
  },
  judgeShop() { // 判断有无失效商品
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].invalid == 1) {
        this.setData({
          is_invalid: true
        })
      }
    }
  },
  settleFun() { //结算
    let arr=[];
    let obj = {};
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected == true && parseInt(carts[i].stock) < parseInt(carts[i].goods_num)) {
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        })
        return false;
      }
      // 选中的 去结算参数
      if(carts[i].selected == true){
        obj.num = carts[i].goods_num;
        obj.id = carts[i].id;
        obj.goods_price = carts[i].price_member;
        arr.push(obj);
        obj = {};
      }
    }
    console.log(arr)
    arr = JSON.stringify(arr);
    wx.navigateTo({
      url: '../index/index?param='+arr+'',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList();

    wx.showModal({
      title: '你是猪吗',
      success:function(res){
        if(res.confirm){
          wx.showToast({
            title: "回答正确"
          })
        }else if(res.cancel){
          wx.showToast({
            title: '你怎么就不承认',
            icon: 'none'
          })
        }
      },
      fail:function(){
        
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