//app.js
import { Base } from './utils/base.js';
import { Token } from './utils/token.js';
var base = new Base()
var token = new Token()


App({
  onLaunch: function () {
    token.verify()
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false,
  }
})