// pages/my/my.js
var Config = require('../../config.js')


const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // 保存个人信息到服务器
          this.sendUserInfo(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })  
    }
  },
  sendUserInfo: function (data) {
    // wx.request({
    //   url: Config.baseUrl + '/user/wx/inof',
    //   method: 'POST',
    //   dataType: 'json',
    //   data: data,
    //   success: function (res) {
    //     console.log('发送成功', res)
    //   }
    // })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
