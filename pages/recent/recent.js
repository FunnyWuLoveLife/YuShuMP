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
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (options) {
    return {
      title: '二书Book--大学生图书分享', // 转发标题（默认：当前小程序名称）
      path: '/pages/recent/recent', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
      success(e) {
        // shareAppMessage: ok,
        // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
        // 需要在页面onLoad()事件中实现接口
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
      },
      fail(e) {
        // shareAppMessage:fail cancel
        // shareAppMessage:fail(detail message) 
      },
      complete() { }
    }
  },
})