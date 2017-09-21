var express = require('express');
var router = express.Router();
const config = require('../config');
const sign = require('../controllers/sign');
const site = require('../controllers/site');
const topic = require('../controllers/topic');
const user = require('../controllers/user');
const reply = require('../controllers/reply');
const collect = require('../controllers/collect');

const upload = require('../common/uploadPic');

// 注册，登录，退出
router.post('/register',sign.register);  //用户注册
router.post('/login',sign.login);       //用户登录
router.post('/logout',sign.logout);      //用户登出
// 文章类
router.post('/addNewTopic',topic.addNewTopic); // 新建文章
router.get('/getArticleDetail',topic.getArticleDetail);  //获取文章详情
router.get('/getTopicList',topic.getTopicList);  //获取所有文章列表
router.post('/delArticleById',topic.delArticleById);  //删除选中的文章
router.post('/updateArticle',topic.updateArticle);  //更新文章
// 评论类
router.post('/addCommentByArticleId',reply.add); // 新增文章评论
router.get('/getComments',reply.getComments);  // 获取某偏文章的所有评论
router.post('/delComment',reply.delComment);  // 删除某条评论
// 收藏类
router.post('/addCollect',collect.addCollect);  // 添加收藏
router.get('/hadCollect',collect.hadCollect);  // 判断是否已收藏
router.get('/unCollect',collect.unCollect);  // 取消收藏


router.get('/post',(req,res,next) => {
	return res.render('user/post');
})

//主页面
//router.get('/',site.index);



// 测试，记得删掉
router.get('/getList',topic.getTopicList);


// 获取个人数据
router.get('/getUserInfo',user.getUserInfo);

// 设置个人信息
router.post('/setUserInfo',user.setUserInfo);


// 图片上传
router.post('/loadPic',upload.uploadPic); //图片上传


// 测试接口地址，改为前后端分离的模式，后端只生产数据，前端这样以后前端可以用任何的框架来做，分离解耦
router.get('/testApi',(req,res,next) => {
	 res.render('site/testApi',{});
});

module.exports = router;
