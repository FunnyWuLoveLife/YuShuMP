// pages/home/home.js
var WxSearch = require('../../template/search/search.js')
var app = getApp()
Page({
  data: {
    // wxSearchData:{
    //   view:{
    //     isShow: true
    //   }
    // }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    // TODO 获取热门搜索
    WxSearch.init(that, 53, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  onShow:function(){
    console.log('onShow')
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },
  clearInput: function(e){
    var that = this
    WxSearch.clearInput(e,that)
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    // WxSearch.wxSearchBlur(e, that);
    WxSearch.wxSearchAddHisKey(this);// 添加历史搜索记录
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
    WxSearch.wxSearchAddHisKey(that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})