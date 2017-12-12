const path = require('path')
const express = require('express')
const router = express.Router()
const eventproxy = require('eventproxy')
const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/posts')
const UserModel = require('../models/users')
const CollectModel = require('../models/collect')

// 用户中心，模块包括:  自己写的和收藏的文章、粉丝数、关注数
// GET /users 用户中心
// eg: GET /users?author=xxx
router.get('/', function (req, res, next) {
  const author = req.query.author;
  let page = Number(req.query.page) || 1;
  let pageSize = Number(req.query.pageSize) || 10;
  let ep = new eventproxy();
  let query = { author: author };

  PostModel.getPosts(query,page,pageSize)
    .then(function (posts) {
      ep.emit('posts',posts);
    })
    .catch(next)

  UserModel.getUserById(author)
    .then(function (userInfo) {
      ep.emit('userInfo',userInfo);
    })
    .catch(next)

  CollectModel.getCollectsByUserId(author)
    .then(function (collects) {
      console.log('收藏的所有文章：',collects);
      // ep.emit('userInfo',userInfo);
    })
    .catch(next)

  ep.all('posts','userInfo',(posts,userInfo) => {
    res.render('users', {
      posts: posts,
      userInfo: userInfo
    })
  })

})


module.exports = router
