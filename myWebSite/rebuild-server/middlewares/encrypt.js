// 加密 和 解密密码
const crypto = require('crypto')
const random = require('../lib/random')
const Base64 = require('../lib/base64')

module.exports = {

  // 加密
  encrypt: function(password) {
    let randomWord = random(false,8),
        base64 = new Base64(),
        base64Random = base64.encode(randomWord),
        newPas = base64Random + password,
        md5 = crypto.createHash("md5"),
        md5Pas = md5.update(newPas).digest("hex"),
        base64Md5 = base64.encode(md5Pas),
        lastPassword = base64Random + base64Md5;
    return lastPassword;
  },

  // 解密 参数： 用户输入的密码 、查询的密码
  decrypt: function(iptPass,userPass) {
    let base64Random = userPass.substring(0,12),
      newPas = base64Random + iptPass,
      md5 = crypto.createHash("md5"),
      md5Pas = md5.update(newPas).digest("hex"),
      base64 = new Base64(),
      base64Md5 = base64.encode(md5Pas),
      lastPassword = base64Random + base64Md5;

    return  lastPassword === userPass;
  }
}
