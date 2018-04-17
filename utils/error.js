
class ErrorCode {
  constructor() {

  }
}

ErrorCode.SERVER_ERROR = 500 // 服务器内部错误

ErrorCode.BOOK_NOT_FIND = 6000 // 书籍不存在
ErrorCode.ISBN_CODE_ERROR = 6001 // isbn编号错误
ErrorCode.IS_REGISTER_WX = 6002 // 已经注册过微信信息
ErrorCode.TOKEN_IS_MUST = 6003 // 无效的Token
ErrorCode.ALREADY_IN_GIFT_OR_WISH = 6004 // 书籍已经添加至赠送清单或存在于心意清单
ErrorCode.BEANS_NOT_ENOUGH = 6006  // 书豆不足
ErrorCode.CAN_NOT_OPER_OTHERS = 6007 // 不能操作其他用户的数据

export {
  ErrorCode
};