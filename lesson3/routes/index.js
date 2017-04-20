const express = require('express');
const router = express.Router();
const api = require('../lib/api');
const sign = require('../controllers/sign');
const login = require('../controllers/login');
const useList =require('../controllers/useList');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',login.login);  //登录页面
router.post('/sign_up',sign.sign_up); // 注册页面
router.get('/user_list', useList.user_list);  // 注册用户列表
router.get('/personal_center',(req,res,next) => {

   res.send('这里是个人中心,具体的内容处于待定状态');

})  //个人中心

module.exports = router;
