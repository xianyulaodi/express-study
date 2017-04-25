const validator = require('validator');  //用于表单验证
const api = require('../api/user');

//注册
 exports.register = (req,res,next) =>{
  const loginname=validator.trim(req.body.name).toLowerCase();
 	const pass=validator.trim(req.body.password);
 	const repassword=validator.trim(req.body.repassword);
  //  密码二次确认待处理
   const data = {
      loginname:loginname,
      pass:pass,
      repassword:repassword
   }
   api.newAndSave(data)
   .then(result => {
      console.log(result);
     if (result) {
       req.session.user = result;
       console.log('注册成功');

       res.redirect('/signup_succ');  //跳转到注册成功页
     } else {
       res.render('error');
     }
   })
 }

// 登录
exports.login = (req,res,next) => {
    const name = validator.trim(req.body.name).toLowerCase();
    const pass = validator.trim(req.body.password);
    api.login(name,pass)
    .then(result => {
       if(result) {
          //返回给前端的数据
          req.session.user = result;
          res.json({  //这里记得要返回json的形式，不然是走不到ajax的success里面的
            mess:'s',
            user:result
          });
       }else{
         res.json({
           mess:'f'
         });
       }
    })
}


// 退出
exports.loginout = (req,res,next) =>{
// req.session.user = null;
   req.session.destroy()
   res.redirect('/');
}
