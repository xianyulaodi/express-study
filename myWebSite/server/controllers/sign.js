const validator = require('validator');  //用于表单验证
const common = require('../common/common');
const api = require('../api/user');

//注册
 exports.register = (req,res,next) => {

  const 
    userName=req.body.userName,
    email=req.body.email,
    password=req.body.password,
    data = {
    userName: userName,
    password: password,
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
  api.login(email,password)
  .then(result => {
    if(result) {
      req.session.user = result;
      var data = {
        "userName": result.userName,
        "id": result._id,
        "userPic": result.profile_image_url || " "
      }
      common.succRes(res,{"data": data});
     }else{
      common.failRes(res,'login fail');
     }
  });
}


// 退出
exports.logout = (req,res,next) => {
  req.session.destroy();
  common.succRes(res);
}
