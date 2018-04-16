//app.js
import { Base } from './utils/base.js';
import { Token } from './utils/token.js';
import { User } from '/pages/my/user-model.js';

var user = new User()
var base = new Base()
var token = new Token()


App({
  onLaunch: function () {
    token.verify()
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false,
  },
  updateUserInfo: function () {
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      // 获取用户信息，并发送值服务器注册账户
      wx.getUserInfo({
        success: res => {
          // 对个人信息进行注册，注册成功便保存
          user.saveUserInfo(res, (data) => {
            // 判断注册是否成功，成功就存储用户信息
            that.globalData.userInfo = data.data
            that.globalData.hasUserInfo = true
            // 保存信息至本地缓存
            that.saveUserInfo()
          })
        }
      })
    }
    else {
      that.globalData.userInfo = userInfo
      that.globalData.hasUserInfo = true
    }
  },
  saveUserInfo: function () {
    wx.setStorageSync('userInfo', this.globalData.userInfo);
  },
  updateStorageUserInfo: function (userInfo) {
    var that = this
    that.globalData.userInfo = userInfo
    that.globalData.hasUserInfo = true
    wx.setStorageSync('userInfo', that.globalData.userInfo);
  }
})