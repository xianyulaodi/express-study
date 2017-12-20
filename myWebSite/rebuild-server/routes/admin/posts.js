const path = require('path')
const express = require('express')
const router = express.Router()
const eventproxy = require('eventproxy')
const checkLogin = require('../../middlewares/check').checkLogin
const PostModel = require('../../models/posts')

// GET /admin/posts 所有用户或者特定用户的文章页，以及热门文章
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  const ep = new eventproxy();
  let page = Number(req.query.page) || 1;
  let pageSize = Number(req.query.pageSize) || 10;
  let type = req.query.type;
  let home_show = req.query.home_show || '1'; 
  let query = {
    home_show: home_show
  };
  if(type) {
    query.type = type;
  }
  PostModel.getPosts(query,page,pageSize)
    .then(function (posts) {
      ep.emit('posts',posts);
    })
    .catch(next)

  // 获取页数
  PostModel.getTotalPage(query)
    .then(function (num) {
      let count = Number(num);
      let total_page =  parseInt(count/pageSize) + (count%pageSize > 0 ? 1 : 0);
      ep.emit('total_page',total_page);
    })
    .catch(next)

  ep.all('posts','total_page',(posts,total_page) => {
    res.render('./admin/table-list', {
      posts: posts,
      total_page: total_page,
      cur_page: page,
      home_show: home_show
    })
  })
})

// GET /admin/posts/:post_id/remove 删除一篇文章
router.get('/:post_id/remove', checkLogin, function (req, res, next) {
  const post_id = req.params.post_id
  const author = req.session.user._id
  if (!author) {
    throw new Error('没有权限')
  }
  PostModel.delPostById(post_id)
    .then(function () {
      // 删除成功后跳转到主页
      res.redirect('/admin/posts')
    })
    .catch(next)
})

// POST /admin/posts/edit 编辑文章是否上首页
router.post('/edit', function (req, res, next) {
  const post_id = req.fields.post_id
  const home_show = req.fields.home_show
  const author = req.session.user._id
  if (!author) {
    throw new Error('没有权限')
  }
  PostModel.updatePostById(post_id, { home_show: home_show })
    .then(function () {
      res.redirect(`/admin/posts?home_show=${home_show}`)
    })
    .catch(next)
})


module.exports = router
