var express = require('express');
var router = express.Router();
const sign = require('../controllers/sign');
const site = require('../controllers/site');

// 注册，登录，退出
router.post('/register',sign.register);  //用户注册提价
router.post('/login',sign.login);       //用户登录
router.post('/loginout',sign.loginout);      //用户登出

//主页面
router.get('/',site.index);
// 跳转到注册页面
router.get('/signup',function(req, res){
	return res.render('sign/register'); //这里需要注意的是，sign/register是指 view里面的 register.html
});
// 注册成功
router.get('/signup_succ',(req,res) => {
  return res.render('sign/registerSuccess'); // 跳转到注册成功页
});

router.get('/login',(req,res) => {
  return res.render('site/index');   //暂时跳转到首页去登录
})


module.exports = router;
