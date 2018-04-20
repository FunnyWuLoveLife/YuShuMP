// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头

import { Config } from 'config.js';

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'user/token/verify';
    this.tokenUrl = Config.restUrl + 'user/token/onLogin';
  }

  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    }
    else {
      this._veirfyFromServer(token);
    }
  }

  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        if (res.statusCode == 200) {
          res = res.data
          var valid = res.data.isValid;
          if (!valid) {
            that.getTokenFromServer();
          }
        } else {
          that.getTokenFromServer();
        }
      }
    })
  }

  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            if (res.statusCode == 200) {
              var res = res.data
              console.log(res)
              wx.setStorageSync('token', res.data.token);
              callBack && callBack(res.data.token);
            } else {
              console.log('getTokenFromServer error')
            }
          }
        })
      }
    })
  }
}

export { Token };