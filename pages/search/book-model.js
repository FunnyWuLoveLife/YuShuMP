import {
  Base
} from '../../utils/base.js';

class Book extends Base {
  constructor() {
    super();
  }

  searchBook(q, callback) {
    var param = {
      url: 'book/search?q=' +q,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {
  Book
};