const path = require('path')
const express = require('express')
const router = express.Router()
const eventproxy = require('eventproxy')
const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/posts')
const UserModel = require('../models/users')
const FocusModel = require('../models/focus')
const CollectPost = require('../middlewares/collect-post')

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

  CollectPost.getCollectsByUserId(author)
    .then(function (collects) {
      ep.emit('collectPosts',collects);
    })
    .catch(next)

  FocusModel.getFans(author)
    .then(function(fans) {
      ep.emit('fans',fans);
    })
    .catch(next)

  FocusModel.getFocus(author)
    .then(function(focus) {
      ep.emit('focus',focus);
      console.log('关注数',focus);
    })
    .catch(next)

  ep.all('posts','userInfo','collectPosts','fans','focus',(posts,userInfo,collectPosts,fans,focus) => {
    res.render('users', {
      posts: posts,
      userInfo: userInfo,
      collectPosts: collectPosts,
      fans: fans,
      fansCount: fans.length,
      focus: focus,
      focusCount: focus.length
    })
  })

})


module.exports = router
