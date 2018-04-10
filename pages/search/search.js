// pages/search/search.js
var Config = require('../../config.js')

var __mindKeys = [];
Page({
  data: {
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    // TODO 获取热门搜索
    this.init(53, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
  },
  onShow: function () {
    console.log('onShow')
  },
  init: function (barHeight, keys, isShowKey, callBack) {
    var that = this

    var temData = {};
    var view = {
      barHeight: barHeight,
      isShow: false
    }

    if (typeof (isShowKey) == 'undefined') {
      view.isShowSearchKey = true;
    } else {
      view.isShowSearchKey = isShowKey;
    }

    view.isShowSearchHistory = false;
    temData.keys = keys;
    wx.getSystemInfo({
      success: function (res) {
        var wHeight = res.windowHeight;
        view.seachHeight = wHeight - barHeight;
        temData.view = view;
        that.setData({
          wxSearchData: temData
        });
      }
    })

    if (typeof (callBack) == "function") {
      callBack();
    }
    that.getHisKeys();
  },
  sweep: function (e) {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var isbn = res.result
        // TODO完善扫码逻辑
        console.log('isbn', isbn)
      }
    })
  },
  wxSearchFocus: function (e) {
    var temData = this.data.wxSearchData;
    temData.view.isShow = true;
    this.setData({
      wxSearchData: temData
    });
    //回调
    if (typeof (callBack) == "function") {
      callBack();
    }
  },
  wxSearchAddHisKey: function () {
    var that = this

    that.wxSearchHiddenPancel();
    var text = that.data.wxSearchData.value;
    if (typeof (text) == "undefined" || text.length == 0) { return; }
    var value = wx.getStorageSync('wxSearchHisKeys');
    if (value) {
      if (value.indexOf(text) < 0) {
        value.unshift(text);
      }
      wx.setStorage({
        key: "wxSearchHisKeys",
        data: value,
        success: function () {
          that.getHisKeys();
        }
      })
    } else {
      value = [];
      value.push(text);
      wx.setStorage({
        key: "wxSearchHisKeys",
        data: value,
        success: function () {
          that.getHisKeys();
        }
      })
    }
  },
  wxSearchFn: function (e) {
    var that = this
    var keyword = that.data.wxSearchData.value
    wx.request({
      url: Config.baseUrl + '/api/book/search',
      method: 'GET',
      data: {
        q: keyword
      },
      success: function (res) {
        that.showSearchResult(res.data)
      }
    })
    this.wxSearchAddHisKey();
  },
  clearInput: function (e) {
    var that = this

    var temData = that.data.wxSearchData
    temData.value = ""
    this.setData({
      wxSearchData: temData
    });
  },
  sweep: function (e) {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var isbn = res.result
        // TODO完善扫码逻辑
        console.log('isbn', isbn)
      }
    })
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
    that.setData({
      wxSearchData: temData
    });
  },

  wxSearchDeleteAll: function (e) {
    var that = this;
    wx.removeStorage({
      key: 'wxSearchHisKeys',
      success: function (res) {
        var value = [];
        var temData = that.data.wxSearchData;
        temData.his = value;
        that.setData({
          wxSearchData: temData
        });
        // 判断是否显示搜索历史
        that.clearInput(e)
        that.showOrHideSearchHistory(that)
      }
    })
  },
  wxSearchTap: function (e) {
    var that = this
    this.wxSearchHiddenPancel(that);
  },
  showSearchResult: function (data) {
    console.log(data)
  },
  showOrHideSearchHistory: function () {
    // 是否显示历史
    var temData = this.data.wxSearchData;
    var value = wx.getStorageSync('wxSearchHisKeys')
    if (value.length == 0) {
      temData.view.isShowSearchHistory = false
    } else {
      temData.view.isShowSearchHistory = true
    }
    this.setData({
      wxSearchData: temData
    })
  },
  getHisKeys: function () {
    var value = [];
    try {
      value = wx.getStorageSync('wxSearchHisKeys')
      if (value) {
        // Do something with return value
        var temData = this.data.wxSearchData;
        temData.his = value;
        this.setData({
          wxSearchData: temData
        });
      }
    } catch (e) {
      // Do something when catch error
    }
    this.showOrHideSearchHistory()
  },
  wxSearchHiddenPancel: function () {
    var temData = this.data.wxSearchData;
    temData.view.isShow = false;
    this.setData({
      wxSearchData: temData
    });
  },
  wxSearchBlur: function (e) {
    // 搜索输入框失去焦点时处理事件
    var that = this
    var temData = this.data.wxSearchData;
    temData.value = e.detail.value;
    // that.setData({
    //   wxSearchData: temData
    // });
    if (typeof (callBack) == "function") {
      callBack();
    }
  },
  wxSearchDeleteKey: function (e) {
    var that = this

    that.clearInput(e)
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
  wxSearchKeyTap: function (e) {
    //回调
    var temData = this.data.wxSearchData;
    temData.value = e.target.dataset.key;
    console.log(temData.value)
    this.setData({
      wxSearchData: temData
    });
    console.log(this.data.wxSearchData.value)
    if (typeof (callBack) == "function") {
      callBack();
    }
    this.wxSearchAddHisKey();
  },
})