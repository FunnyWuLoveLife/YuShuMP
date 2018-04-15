// pages/recent/recent.js
import { Book } from '../search/book-model.js';
import { User } from '../my/user-model.js';

var book = new Book()
var user = new User()
var app = getApp()

Page({
  data: {
    loadingHidden: true,
    hasBooklInfo: false
  },
  onLoad: function (options) {
    var that = this
    this._loadRecent()
    this._loadUserInfo()
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
  _loadRecent: function () {
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
    })
  },
  _loadUserInfo: function () {
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      // 获取用户信息，并发送值服务器注册账户
      wx.getUserInfo({
        success: res => {
          // 对个人信息进行注册，注册成功便保存
          user.saveUserInfo(res, (data) => {
            // 判断注册是否成功，成功就存储用户信息
            app.globalData.userInfo = data.data
            app.globalData.hasUserInfo = true
            wx.setStorageSync('userInfo', data.data);
          })
        }
      })
    }
    else {
      app.globalData.userInfo = userInfo
      app.globalData.hasUserInfo = true
    }
    // wx.setStorageSync('token', res.data.token);
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
    this._loadRecent()
    wx.stopPullDownRefresh()
  }
})