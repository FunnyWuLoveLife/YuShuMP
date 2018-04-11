// pages/search/search.js
import {
  Book
} from 'book-model.js';
var book = new Book(); //实例化 home 的推荐页面

var __mindKeys = [];
Page({
  data: {
    loadingHidden: true,
    wxSearchData: {
      view: {
        barHeight: 53,
        isShow: true,
        isShowSearchHistory: false,
        isShowSearchKey: true,
        seachHeight: 451
      },
      his: [],
    },
    book: {
      hide: true,
      data: []
    }
  },
  onLoad: function () {
    this._onLoad()
  },
  /*加载所有数据*/
  _onLoad: function () {
    var that = this
    //初始化的时候渲染wxSearchdata
    // TODO 获取热门搜索
    var temData = that.data.wxSearchData
    temData.keys = ['java', '小程序', 'python', 'php', 'web']
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        var wHeight = res.windowHeight;
        temData.view.seachHeight = wHeight - temData.view.barHeight;
        that.setData({
          wxSearchData: temData
        });
      }
    })
    this.getHisKeys()
  },

  /* 业务逻辑 start */
  search: function (q) {
    var that = this
    this.setData({
      loadingHidden: false
    })
    book.searchBook(q, (res) => {
      var temData = that.data.book
      temData.hide = false
      temData.data = res.data
      that.setData({
        book: temData,
        loadingHidden: true
      })
      that.wxSearchHiddenPancel()
      that.wxSearchAddHisKey(q);
    })
  },
  /* 扫一扫事件，跳转 */
  sweep: function (e) {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var isbn = res.result
        wx.navigateTo({
          url: '/pages/book-detail/book-detail?isbn=' + isbn,
        })
      }
    })
  },
  /* 搜索 */
  wxSearchFn: function (e) {
    var that = this
    var keyword = that.data.wxSearchData.value
    that.search(keyword)
  },
  /* 历史搜索记录点击事件 */
  wxSearchKeyTap: function (e) {

    var temData = this.data.wxSearchData;
    var keyword = book.getDataSet(e, 'key')
    temData.value = keyword;
    this.setData({
      wxSearchData: temData
    });
    this.search(keyword)

  },
  /* 业务逻辑 end */

  /* 添加搜索历史 */
  wxSearchAddHisKey: function (key) {
    var that = this

    if (typeof (key) == "undefined" || key.length == 0) {
      return
    }
    var value = wx.getStorageSync('wxSearchHisKeys');
    if (!value) {
      value = []
    }

    if (value.indexOf(key) < 0) {
      value.unshift(key);
      wx.setStorage({
        key: "wxSearchHisKeys",
        data: value,
        success: function () {
          that.getHisKeys();
        }
      })
    }
    that.wxSearchHiddenPancel();
  },


  wxSearchInput: function (e) {
    var temData = this.data.wxSearchData;
    var text = e.detail.value;
    var mindKeys = [];
    if (typeof (text) == "undefined" || text.length == 0) {

    } else {
      for (var i = 0; i < __mindKeys.length; i++) {
        var mindKey = __mindKeys[i];
        if (mindKey.indexOf(text) > -1) {
          mindKeys.push(mindKey);
        }
      }
    }
    temData.value = text;
    temData.mindKeys = mindKeys;
    this.setData({
      wxSearchData: temData
    });
  },

  showSearchResult: function (data) {
    console.log(data)
  },


  /* 加载缓存中的历史搜索记录 */
  getHisKeys: function () {
    var value = [];
    try {
      value = wx.getStorageSync('wxSearchHisKeys')
      var temData = this.data.wxSearchData;
      if (value.length == 0) {
        temData.view.isShowSearchHistory = false
      } else {
        temData.view.isShowSearchHistory = true
      }
      temData.his = value
      this.setData({
        wxSearchData: temData
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  /* 隐藏搜索历史记录框 */
  wxSearchHiddenPancel: function () {
    var temData = this.data.wxSearchData;
    temData.view.isShow = false;
    this.setData({
      wxSearchData: temData
    });
  },

  /* 搜索框以外的地方的点击事件 */
  wxSearchTap: function (e) {
    this.wxSearchHiddenPancel();
  },
  /* 删除所有历史记录事件 */
  wxSearchDeleteAll: function (e) {
    var that = this;
    wx.removeStorage({
      key: 'wxSearchHisKeys',
      success: function (res) {
        var temData = that.data.wxSearchData;
        temData.view.isShowSearchHistory = false;
        temData.his = [];
        that.setData({
          wxSearchData: temData
        });
      }
    })
  },
  /* 输入框聚焦事件 */
  wxSearchFocus: function (e) {
    var temData = this.data.wxSearchData;
    temData.view.isShow = true;
    this.setData({
      wxSearchData: temData
    });
  },
  /* 输入框清空事件 */
  clearInput: function (e) {
    var that = this

    var temData = that.data.wxSearchData
    temData.value = ""
    this.setData({
      wxSearchData: temData
    });
  },
  /* 删除单个搜索记录 */
  wxSearchDeleteKey: function (e) {
    var that = this

    var text = e.target.dataset.key;
    var value = wx.getStorageSync('wxSearchHisKeys');
    value.splice(value.indexOf(text), 1);
    wx.setStorage({
      key: "wxSearchHisKeys",
      data: value,
      success: function () {
        that.getHisKeys();
      }
    })
  },
  /* 点击跳转 */
  tabBook: function (e) {
    var isbn = book.getDataSet(e, 'isbn')
    wx.navigateTo({
      url: '/pages/book-detail/book-detail?isbn=' + isbn,
    })
  }
})