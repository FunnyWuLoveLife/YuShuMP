// pages/my/my.js

const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clearStorage: function (e) {
    try {
      wx.clearStorageSync()
      wx.showToast({
        title: '清空缓存成功',
        icon: 'success',
        duration: 2000
      })
    } catch (e) {
      // Do something when catch error
    }
  }
})
