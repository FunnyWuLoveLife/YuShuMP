import { Base } from '../../utils/base.js';


class Trade extends Base {
  constructor() {
    super();
  }

  gifts(callback) {
    var param = {
      url: 'my/gifts',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  wishes(callback) {
    var param = {
      url: 'my/wishes',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {
  Trade
}