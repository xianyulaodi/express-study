const validator = require('validator');  //用于表单验证
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
      res.json({  
        "status"  : 200,
        "message" : "success"
      });
    } else {
      res.json({  
        'status'  : 100,
        'message' : "register fail"
      });
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
      res.json({  
        "status"  : 200,
        "message" : "success",
        "data": {
          "userName": result.userName,
          "id": result._id,
          "userPic": result.profile_image_url || " "
        },
      });
     }else{
      res.json({  
        "status"  : 100,
        "message" : "login fail"
      });
     }
  });
}


// 退出
exports.logout = (req,res,next) => {
  req.session.destroy();
  res.json({  
    "status"  : 200,
    "message" : "success"
  });
}
