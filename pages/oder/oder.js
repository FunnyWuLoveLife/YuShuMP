// pages/category/category.js
var app = getApp()

Page({
  data: {
    loadingHidden: true,
    hasSchollInfo: app.globalData.hasSchollInfo,
    choose: ['学校', '专业', '年级']
  },
  onLoad: function (options) {
    var that = this
  },
  onShow: function () {

  },
  /* 点击搜索栏跳转到搜索页面 */
  wxSearchFn: function (e) {
    var that = this
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /* 点击扫一扫，搜索图书 */
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
  headerTab: function (e) {

  },
})