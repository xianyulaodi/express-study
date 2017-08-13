var express = require('express');
var router = express.Router();
const config = require('../config');
const sign = require('../controllers/sign');
const site = require('../controllers/site');
const topic = require('../controllers/topic');
const user = require('../controllers/user');
const reply = require('../controllers/reply');

const upload = require('../common/uploadPic');

// 注册，登录，退出
router.post('/register',sign.register);  //用户注册提价
router.post('/login',sign.login);       //用户登录
router.get('/loginout',sign.loginout);      //用户登出

// 新建主题
router.post('/addNewTopic',topic.addNewTopic);
router.get('/post',(req,res,next) => {
	return res.render('user/post');
})

//主页面
//router.get('/',site.index);

router.get('/getAllTopic',topic.getAllTopic);

// 测试，记得删掉
router.get('/getList',topic.getAllTopic);

// 跳转到注册页面
router.get('/signup',function(req, res) {
	return res.render('sign/register'); //这里需要注意的是，sign/register是指 view里面的 register.html
});
// 注册成功
router.get('/signup_succ',(req,res) => {
  return res.render('sign/registerSuccess'); // 跳转到注册成功页
});

router.get('/login',(req,res) => {
  return res.render('site/index');   //暂时跳转到首页去登录
});

// 根据文章id获取文章详情
router.get('/getTopicDetailById',topic.getTopicDetail);

// 获取个人数据
router.get('/getUserInfo',user.getUserInfo);

// 设置个人信息
router.post('/setUserInfo',user.setUserInfo);

// 新增文章评论
router.post('/addReply',reply.add);
// 获取某个文章的所有评论
router.get('/getRepliesByTopicId',reply.getRepliesByTopicId);

// 图片上传
router.post('/loadPic',upload.uploadPic); //图片上传


// 测试接口地址，改为前后端分离的模式，后端只生产数据，前端这样以后前端可以用任何的框架来做，分离解耦
router.get('/testApi',(req,res,next) => {
	 res.render('site/testApi',{
	 });
});

module.exports = router;
