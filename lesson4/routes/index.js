var express = require('express');
var router = express.Router();
const sign = require('../controllers/sign');
const site = require('../controllers/site');
const topic = require('../controllers/topic');
const reply = require('../controllers/reply');
const user  = require('../controllers/user');

// 注册，登录，退出
router.post('/register',sign.register);  //用户注册提价
router.post('/login',sign.login);       //用户登录
router.get('/loginout',sign.loginout);      //用户登出

// 新建主题
router.post('/post',topic.addNewTopic);
router.get('/post',(req,res,next) => {
	return res.render('user/post');
})

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
});
router.get('/topic',topic.getTopicDetail);

// 帖子回复或者评论
router.post('/addReply',reply.add);

// 个人中心设置,读取
router.get('/setProfile',user.setProfile);
router.post('/edit',user.edit);

module.exports = router;
