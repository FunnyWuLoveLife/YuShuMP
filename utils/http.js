// utils/http.js

class Http {
  request(uri, data, method, success, fail, complete) {
    wx.request({
      url: Config.baseUrl + uri,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'json',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
}

module.exports = Http