// pages/recent/recent.js
import { Book } from '../search/book-model.js';
import { User } from '../my/user-model.js';
import { Token } from '../../utils/token.js';

var token = new Token()
var book = new Book()
var user = new User()
const app = getApp()

Page({
  data: {
    loadingHidden: true,
    hasBooklInfo: false
  },
  onLoad: function (options) {
    var that = this
    token.verify()
    // this._loadRecent()
    app.updateUserInfo()
  },
  onShow: function () {
    // token.verify()
    this._loadRecent()
    app.updateUserInfo()
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

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
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  _loadRecent: function (callback) {
    var that = this
    book.recentGift((res) => {
      if (res.data.length) {
        that.setData({
          hasBooklInfo: true,
        })
      }
      that.setData({
        books: res.data,
      })
      callback && callback(res);
    })
  },
  /* 点击跳转 */
  tabBook: function (e) {
    var isbn = book.getDataSet(e, 'isbn')
    wx.navigateTo({
      url: '/pages/book-detail/book-detail?isbn=' + isbn,
    })
  },
  /* 下拉刷新事件 */
  onPullDownRefresh: function (e) {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      this._loadRecent((res) => {
        wx.hideNavigationBarLoading()
      })
    }, 100)

    wx.stopPullDownRefresh()
  }
})