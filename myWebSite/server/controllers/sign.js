const validator = require('validator');  //用于表单验证
const crypto = require('crypto');  // 用于密码加密
const common = require('../common/common');
const api = require('../api/user');
const random = require('../lib/random');
const Base64 = require('../lib/base64');

//注册
exports.register = (req,res,next) => {
  // 用于密码加密
  var 
    randomWord = random(false,8),
    base64 = new Base64(),
    base64Random = base64.encode(randomWord),
    password = req.body.password,
    newPas = base64Random + password,
    md5 = crypto.createHash("md5"),
    md5Pas = md5.update(newPas).digest("hex"),
    base64Md5 = base64.encode(md5Pas),
    lastPassword = base64Random + base64Md5;
  const 
    userName=req.body.userName,
    email=req.body.email;
    data = {
    userName: userName,
    password: lastPassword,
    email: email
  };
  api.newAndSave(data)
  .then(result => {
    if (result) {
      req.session.user = result;
      common.succRes(res);
    } else {
      common.failRes(res,'register fail');
    }
  })
}

// 登录
exports.login = (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;
  api.login(email)
  .then(result => {
    if(result) {
      var 
        base64Random = result.password.substring(0,12),
        newPas = base64Random + password,
        md5 = crypto.createHash("md5"),
        md5Pas = md5.update(newPas).digest("hex"),
        base64 = new Base64(),
        base64Md5 = base64.encode(md5Pas),
        lastPassword = base64Random + base64Md5;
      if (result.password === lastPassword) {
        req.session.user = result; // 更新session
        var data = {
          "userName": result.userName,
          "id": result._id,
          "userPic": result.profile_image_url || " "
        }
        common.succRes(res,{"data": data});        
      } else {
        common.failRes(res,'login fail');
      }      

     } else {
        common.failRes(res,'login fail');
     }
  });
}

// 退出
exports.logout = (req,res,next) => {
  req.session.destroy();
  common.succRes(res);
}
