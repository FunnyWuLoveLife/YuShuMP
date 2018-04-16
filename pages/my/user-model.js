import { Base } from '../../utils/base.js';

class User extends Base {
  constructor() {
    super();
  }

  saveUserInfo(info, callback) {
    var param = {
      url: 'user/info',
      type: 'POST',
      data: info,
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  updateUserInfo(callback) {
    var param = {
      url: 'user/info',
      type: 'GET',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }
}
export {
  User
}