// pages/wish/wish.js
import { Trade } from '../gift/trade-model.js';
import { Book } from '../search/book-model.js';
var book = new Book();
var trade = new Trade()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasWishes: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    trade.wishes((res) => {
      if (res.code == 200) {
        var hasWishes = false
        if (res.data.total > 0)
          hasWishes = true
        that.setData({
          books: res.data,
          hasWishes: hasWishes
        })
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