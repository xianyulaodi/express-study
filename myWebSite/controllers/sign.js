const validator = require('validator');  //用于表单验证
const api = require('../api/user');

//注册
 exports.register = (req,res,next) => {

  const loginname=req.body.loginname;
 	const pass=req.body.password;
 	const repassword=req.body.repassword;

  if(pass !== repassword) {
    res.json({
      success:0,
      msg:'password not the same'
    });
    return false;
  }

  const data = {
      loginname:loginname,
      pass:pass,
      repassword:repassword
   }
   api.newAndSave(data)
   .then(result => {
     if (result) {
       req.session.user = result;
       res.json({  //这里记得要返回json的形式，不然是走不到ajax的success里面的
         success:1,
         msg:'register success'
       });
     } else {
       res.json({  //这里记得要返回json的形式，不然是走不到ajax的success里面的
         success:0,
         msg:"register fail"
       });
     }
   })
 }

// 登录
exports.login = (req,res,next) => {
    const name = req.body.loginname;
    const pass = req.body.password;

    api.login(name,pass)
    .then(result => {
       if(result) {
          //返回给前端的数据
          req.session.user = result;
          res.json({  //这里记得要返回json的形式，不然是走不到ajax的success里面的
            success:1,
            user:result
          });
       }else{
         res.json({
            success:0,
            msg:'login fail'
         });
       }
    })
}


// 退出
exports.loginout = (req,res,next) => {
   req.session.destroy();
   res.json({  //这里记得要返回json的形式，不然是走不到ajax的success里面的
     success:1,
   });
}
