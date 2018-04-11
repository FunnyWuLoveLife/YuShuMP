// pages/category/category.js

var app = getApp()
Page({
  data: {
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  },
  onShow: function () {
    console.log('onShow')
  },
  wxSearchFn: function (e) {
    var that = this
    wx.navigateTo({
      url: '/pages/search/search',
    })
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
})