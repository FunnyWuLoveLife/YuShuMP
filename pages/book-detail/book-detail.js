// pages/book-detail/book-detail.js
import { Book } from '../search/book-model.js';
var book = new Book()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var isbn = '9787101003079'
    // book.searchBookByISBN(isbn, (data) => {
    book.searchBookByISBN(options.isbn, (data) => {
      that.setData({
        book: data.book,
        gift: data.gift,
        wish: data.wish,
        loadingHidden: true
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /* 赠送此书 */
  donate: function (e) {
    var that = this
    book.donateBook(this.data.book.isbn, (res) => {
      var gift = that.data.gift
      gift.num = res.num
      that.setData({
        gift: gift
      })
    })
  },
  /* 加入心愿单 */
  addWish: function (e) {
    console.log('add wish')
    var that = this
    book.wish(this.data.book.isbn, (res) => {
      var wish = that.data.wish
      wish.num = res.num
      that.setData({
        wish: wish
      })
    })
  }
})