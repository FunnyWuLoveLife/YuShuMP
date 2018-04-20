// pages/book-detail/book-detail.js
import { Book } from '../search/book-model.js';
import { User } from '../my/user-model.js';
import { ErrorCode } from '../../utils/error.js';
import { Trade } from '../gift/trade-model.js'

var trade = new Trade()
var book = new Book()

var user = new User()
const app = getApp()

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
    // options.isbn = '9787121068744'
    that.searchBook(options.isbn, options.gid, options.wid)
  },
  searchBook: function (isbn, gid, wid) {
    var that = this
    book.searchBookByISBN(isbn, gid, wid, (res) => {
      if (res.code == 200) {
        var hiddenGift = false
        if (res.data.gift.has_in_gifts || res.data.wish.has_in_wishes) {
          hiddenGift = true
        }
        that.setData({
          book: res.data.book,
          gift: res.data.gift,
          wish: res.data.wish,
          recipient: res.data.recipient,
          sendder: res.data.sender,
          hiddenGift: hiddenGift,
          hiddenTrade: res.data.hiddenTrade,
          loadingHidden: true,
          hideBackground: false
        })
      } else {
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
        user.updateUserInfo((res) => {
          if (res.code == 200) {
            app.updateStorageUserInfo(res.data)
          }
        })
        that.searchBook(that.data.book.isbn)
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
      if (res.code == 200) {
        // 更新用户数据
        user.updateUserInfo((res) => {
          if (res.code == 200) {
            app.updateStorageUserInfo(res.data)
          }
        })
        that.searchBook(that.data.book.isbn)
        wx.showToast({
          title: '成功添加至心意清单',
          icon: 'success',
          duration: 2000
        })
        wish.num = res.data.num
        that.setData({
          wish: wish
        })
      } else if (res.code == ErrorCode.ALREADY_IN_GIFT_OR_WISH) {
        wx.showToast({
          title: '书籍已经添加至赠送清单或存在于心意清单',
          icon: 'none',
          duration: 2000
        })
      } else if (res.code == ErrorCode.BEANS_NOT_ENOUGH) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      } else {
        wx.showToast({
          title: '服务器未知错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /* 请求此书 */
  requestBook: function (e) {
    var that = this
    var id = trade.getDataSet(e, 'id')
    trade.requestBook(id, (res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '索要成功',
          icon: 'success',
          duration: 2000
        })
        var hiddenGift = false
        if (res.data.gift.has_in_gifts || res.data.wish.has_in_wishes) {
          hiddenGift = true
        }
        that.setData({
          book: res.data.book,
          gift: res.data.gift,
          wish: res.data.wish,
          hiddenGift: hiddenGift,
          loadingHidden: true,
          hideBackground: false
        })
      } else {
        // TODO 
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /* 捐赠此书 */
  donateBook: function (e) {
    var that = this
    var id = trade.getDataSet(e, 'id')
    console.log(id)
    trade.donateBook(id, (res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '赠送成功',
          icon: 'success',
          duration: 2000
        })
        var hiddenGift = false
        if (res.data.gift.has_in_gifts || res.data.wish.has_in_wishes) {
          hiddenGift = true
        }
        that.setData({
          book: res.data.book,
          gift: res.data.gift,
          wish: res.data.wish,
          hiddenGift: hiddenGift,
          loadingHidden: true,
          hideBackground: false
        })
      } else {
        // TODO
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (options) {
    var that = this
    var title = ''
    if (this.data.gift.has_in_gifts) {
      title = '我在赠送《' + this.data.book.title + '》快来领取吧'
    } else if (this.data.wish.has_in_wishes) {
      title = '我正缺《' + this.data.book.title + '》有的小伙伴赠送给我吧'
    } else {
      title = '《' + this.data.book.title + '》值得一读，快来领取读读'
    }

    return {
      title: title, // 转发标题（默认：当前小程序名称）
      path: '/pages/book-detail/book-detail?isbn=' + that.data.book.isbn,
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