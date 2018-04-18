// pages/my/my.js

const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    text: "二书Book\n\n帮助大学生赠送和求赠书籍\n高年级学长学姐上传书籍\n低年级学弟学妹求赠书籍\n\n撮合成功线下会面\n取得书籍让知识传递下去"
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
