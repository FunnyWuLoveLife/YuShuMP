import { Base } from '../../utils/base.js';

class Book extends Base {
  constructor() {
    super();
  }

  searchBook(q, page, callback) {
    var param = {
      url: 'book/search?q=' + q + '&page=' + page,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  searchBookByISBN(isbn, callback) {
    var param = {
      url: 'book/details?isbn=' + isbn,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  donateBook(isbn, callback) {
    var param = {
      url: 'book/gift?isbn=' + isbn,
      type: 'GET',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  wish(isbn, callback) {
    var param = {
      url: 'book/wish?isbn=' + isbn,
      type: 'GET',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  recentGift(callback) {
    var param = {
      url: 'book/recent',
      type: 'GET',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }
}

export {
  Book
};