// pages/book-detail/book-detail.js
import { Book } from '../search/book-model.js';
import { ErrorCode } from '../../utils/error.js';
var book = new Book()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    hideBackground: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var isbn = '9787103079'
    // book.searchBookByISBN(isbn, (res) => {
    book.searchBookByISBN(options.isbn, (res) => {
      if (res.code == ErrorCode.BOOK_NOT_FIND || res.code == ErrorCode.ISBN_CODE_ERROR) {
        that.setData({
          loadingHidden: true,
          hideBackground: true
        })
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        // 暂停一秒跳转回原页面
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })
        }, 2000)
      }
      that.setData({
        book: res.data.book,
        gift: res.data.gift,
        wish: res.data.wish,
        loadingHidden: true,
        hideBackground: false
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
      if (res.code == ErrorCode.ALREADY_IN_GIFT_OR_WISH) {
        wx.showToast({
          title: '书籍已经添加至赠送清单或存在于心意清单',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '成功添加至赠送清单',
          icon: 'success',
          duration: 2000
        })
        gift.num = res.data.num
        that.setData({
          gift: gift
        })
      }
    })
  },
  /* 加入心愿单 */
  addWish: function (e) {
    console.log('add wish')
    var that = this
    book.wish(this.data.book.isbn, (res) => {
      var wish = that.data.wish
      if (res.code == ErrorCode.ALREADY_IN_GIFT_OR_WISH) {
        wx.showToast({
          title: '书籍已经添加至赠送清单或存在于心意清单',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '成功添加至心意清单',
          icon: 'success',
          duration: 2000
        })
        wish.num = res.data.num
        that.setData({
          wish: wish
        })
      }
    })
  }
})