// pages/index/index.js
const request = require("../../utils/request");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [1, 2, 3, 4, 5],
    bannerImg: [],
    imgs: [],
    shopList: [], //首页商品列表
    twoTabs: [],
    none: true, //没有数据

    second: false, //点击次数
    tabIndex: 0,
    sort_type: 'desc', //升序 降序
    sort_field: "default", //筛选
    page: 1, //页数
    // tabsTop: 0, //tab 距离顶部距离
    // isFixed: false //是否固定定位
    twoShopList: [], //二级商品分类列表
    vantTabIndex: 0, //一级分类索引
    classId: 0, // 默认分类id
    isclickTwo: false // 判断是否点击二级分类
  },
  tabClick: function (e) { //首页筛选
    let index = e.target.dataset.index;
    let sort_field = e.target.dataset.screen;

    let tabIndex = this.data.tabIndex;
    let sort_type, second;

    //如果两次点击的一样
    if (index == tabIndex) {
      //如果当前的是降序 设为升序
      if (this.data.sort_type == 'desc') {
        sort_type = 'asc';
        second = true;
      } else {
        sort_type = 'desc';
        second = false;
      }
      this.setData({
        second: !this.data.second
      })
    } else {
      sort_type = 'desc';
      second = false;
    }
    this.setData({
      sort_type: sort_type,
      tabIndex: index,
      sort_field: sort_field,
      second: second,
      page: 1
    })
    if (this.data.vantTabIndex == 0) {
      this.getshopList()
    } else {
      if (this.data.isclickTwo) {
        this.getTwoShopList();
      } else {
        this.getOneShopList();
      }
    }

  },
  getTabs() {
    request({
      "Method": "Home.Home.getGoodsClass",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {},
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      this.setData({
        tabs: list
      })
    })
  },
  getBanner() {
    wx.request({
      method: "post",
      url: 'http://mapi.lonshon.com/index.php/Home/Api/entrance',
      data: {
        "Method": "Home.Home.getBanner",
        "Timestamp": "2019-05-17 0:27:48",
        "Version": "1.0",
        "Body": {},
        "Sign": "9527"
      },
      success: (res) => {
        let {
          list
        } = res.data.data;
        this.setData({
          bannerImg: list
        })
      }
    })
  },
  getNav() {
    wx.request({
      method: "post",
      url: 'http://mapi.lonshon.com/index.php/Home/Api/entrance',
      data: {
        "Method": "Home.Home.getNav",
        "Timestamp": "2019-05-17 0:27:48",
        "Version": "1.0",
        "Body": {},
        "Sign": "9527"
      },
      success: (res) => {
        let {
          list
        } = res.data.data;
        this.setData({
          imgs: list
        })
      }
    })
  },
  getshopList() {
    request({
      "Method": "Home.Home.getHomeGoodsList",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "page": this.data.page, //当前页
        "page_size": 10, //每页显示商品数
        "sort_type": this.data.sort_type, //排序方式  asc 升序 ，desc 降序
        "sort_field": this.data.sort_field //按字段排序，default：默认，sales_sum：销量，price_market：商品价格，create_time 最新
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      if (this.data.page == 1) {
        this.setData({
          shopList: list,
        })
      } else {
        this.setData({
          shopList: [...this.data.shopList, ...list],
        })
      }
    })
  },
  switchTab(e) { //切换分类
    console.log(e)
    let index = e.detail.index;
    let id = e.detail.name;

    if (index != 0) {
      request({
        "Method": "Home.Home.getGoodsClassTwo",
        "Timestamp": "2020-07-29 10:27:48",
        "Version": "1.0",
        "Body": {
          "class_id": id //商品一级分类id
        },
        "Sign": "9527"
      }).then(res => {
        let {
          list
        } = res.data.data;
        this.setData({
          twoTabs: list,
          // 初始化数据
          page: 1,
          vantTabIndex: index,
          classId: id,
          isclickTwo: false
        })
        //获取一级商品 默认列表
        this.getOneShopList();
      })
    }

    // 初始化筛选
    this.setData({
      tabIndex: 0,
      sort_type: 'desc',
      sort_field: "default",
    })
  },
  getOneShopList() { //获取一级商品 默认列表
    request({
      "Method": "Home.Goods.getClassGoodsList",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "class_id": this.data.classId,
        "page": this.data.page,
        "page_size": 10,
        "sort_type": this.data.sort_type,
        "sort_field": this.data.sort_field
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      //没有数据
      if (list.length == 0 && this.data.page == 1) {
        this.setData({
          none: false
        })
        return false;
      }
      if (this.data.page == 1) {
        this.setData({
          twoShopList: list,
          none: true
        })
      } else {
        this.setData({
          twoShopList: [...this.data.twoShopList, ...list],
          none: true
        })
      }
    })
  },
  getTwoShopList(e) { //获取二级商品列表
    let id;
    if (e == undefined) {
      id = this.data.classId;
    } else {
      id = e.currentTarget.dataset.id;
      if (id != this.data.classId) {
        // 初始化筛选
        this.setData({
          tabIndex: 0,
          sort_type: 'desc',
          sort_field: "default",
        })
      }
      this.setData({
        page: 1,
        classId: id
      })
    }

    request({
      "Method": "Home.Goods.getClassTwoGoodsList",
      "Timestamp": "2020-07-29 10:27:48",
      "Version": "1.0",
      "Body": {
        "class_id": id,
        "page": this.data.page,
        "page_size": 10,
        "sort_type": this.data.sort_type,
        "sort_field": this.data.sort_field
      },
      "Sign": "9527"
    }).then(res => {
      let {
        list
      } = res.data.data;
      //没有数据
      if (list.length == 0 && this.data.page == 1) {
        this.setData({
          none: false
        })
        return false;
      }
      if (this.data.page == 1) {
        this.setData({
          twoShopList: list,
          none: true,
          isclickTwo: true
        })
      } else {
        this.setData({
          twoShopList: [...this.data.twoShopList, ...list],
          none: true,
          isclickTwo: true
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getTabs();
    this.getBanner();
    this.getNav();
    this.getshopList();


    // 获取元素对于顶部的距离
    // wx.createSelectorQuery().select('.tabs').boundingClientRect(res => {
    //   this.setData({
    //     tabsTop: res.top
    //   })
    // }).exec()
  },
  //向上卷曲 判断是否吸顶
  // onPageScroll: function (e) {
  //   var isSatisfy = e.scrollTop >= this.data.tabsTop ? true : false;
  //   if (this.data.isFixedTop === isSatisfy) {
  //     return false;
  //   }
  //   this.setData({
  //     isFixed: isSatisfy
  //   });
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    let page = this.data.page;
    page = page + 1;

    this.setData({
      page: page
    })
    // 判断vant tab选中的是第几个
    if (this.data.vantTabIndex == 0) {
      this.getshopList();
    } else {
      if (this.data.isclickTwo) {
        this.getTwoShopList();
      } else {
        this.getOneShopList();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})