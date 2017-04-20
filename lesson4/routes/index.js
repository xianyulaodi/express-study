var express = require('express');
var router = express.Router();
const sign = require('../controllers/sign');
const site = require('../controllers/site');

// 注册，登录，退出
router.post('/register',sign.register);  //用户注册
router.post('/login',sign.login);       //用户登录
router.post('/loginout',sign.loginout);      //用户登出

//主页面
router.get('/',site.index);





module.exports = router;
