const path = require('path')
const express = require('express')
const router = express.Router()
const eventproxy = require('eventproxy')
const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const HOMESHOWPASS = require('../lib/constants').HOMESHOWPASS

// GET /posts 所有用户或者特定用户的文章页，以及热门文章
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  let page = Number(req.query.page) || 1;
  let pageSize = Number(req.query.pageSize) || 10;
  let type = req.query.type;
  let ep=new eventproxy();
  let query = {home_show: HOMESHOWPASS }; //通过首页的文章

  if(type) {
    query.type = type;
  }

  PostModel.getPosts(query,page,pageSize)
    .then(function (posts) {
      ep.emit('posts',posts);

    })
    .catch(next)

  PostModel.getHotPosts()
    .then(function (hotPosts) {
      ep.emit('hotPosts',hotPosts);
    })
    .catch(next)

  ep.all('posts','hotPosts',(posts,hotPosts) => {
    res.render('posts', {
      posts: posts,
      hotPosts: hotPosts
    })
  })

})

//  GET 搜索，模糊匹配
//  EG: GET /posts/search?title=xxx
router.get('/search',function(req,res,next) {
  let str = req.query.title,
      page = req.query.page || 1,
      pageSize = req.query.pageSize || 10,
      query = {};
  if(str) {
    let pattern = new RegExp("^.*"+ str +".*$");
    query.title = pattern;
  }
  PostModel.getPosts(query,page,pageSize)
    .then(function (posts) {
      res.render('search', {
        posts: posts
      })
    })
    .catch(next)
});


// /posts/upload 文章图片上传 借助于 express-formidable 中间件
router.post('/upload',function(req,res,next) {
  const picName = req.files.file.path.split(path.sep).pop();
  if(picName) {
    res.json({
      status: 200,
      picUrl: '/img/'+picName
    })
  } else {
    res.json({ status: 100 });
  }

  next();
})


// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content
  const type = req.fields.type

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
    if (!type.length) {
      throw new Error('请填写文章类型')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  let post = {
    author: author,
    title: title,
    content: content,
    type: type,
    pv: 0,
    article_up: '0',
    home_show: '1', // 首页展示，1： 审核中 2： 审核通过 3：审核不通过
    is_recommend: '1'
  }

  PostModel.create(post)
    .then(function (result) {
      // 此 post 是插入 mongodb 后的值，包含 _id
      post = result.ops[0]
      req.flash('success', '发表成功')
      // 发表成功后跳转到该文章页
      res.redirect(`/posts/${post._id}`)
    })
    .catch(next)
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create')
})

// GET /posts/:post_id 文章详情页
router.get('/:post_id', function (req, res, next) {
  const post_id = req.params.post_id
  const uid = req.session.user ? req.session.user._id : '';
  Promise.all([
    PostModel.getPostById(post_id,uid), // 获取文章信息
    CommentModel.getComments(post_id), // 获取该文章所有留言
    PostModel.incPv(post_id)// pv 加 1
  ])
    .then(function (result) {
      const post = result[0]
      const comments = result[1]
      if (!post) {
        throw new Error('该文章不存在')
      }

      res.render('post', {
        post: post,
        comments: comments
      })
    })
    .catch(next)
})

// GET /posts/:post_id/edit 更新文章页
router.get('/:post_id/edit', checkLogin, function (req, res, next) {
  const post_id = req.params.post_id
  const author = req.session.user._id

  PostModel.getRawPostById(post_id)
    .then(function (post) {
      if (!post) {
        throw new Error('该文章不存在')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足')
      }
      res.render('edit', {
        post: post
      })
    })
    .catch(next)
})

// POST /posts/:post_id/edit 更新一篇文章
router.post('/:post_id/edit', checkLogin, function (req, res, next) {
  const post_id = req.params.post_id
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  PostModel.getRawPostById(post_id)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('没有权限')
      }

      PostModel.updatePostById(post_id, { title: title, content: content })
        .then(function () {
          req.flash('success', '编辑文章成功')
          // 编辑成功后跳转到上一页
          res.redirect(`/posts/${post_id}`)
        })
        .catch(next)
    })
})

// GET /posts/:post_id/remove 删除一篇文章
router.get('/:post_id/remove', checkLogin, function (req, res, next) {
  const post_id = req.params.post_id
  const author = req.session.user._id

  PostModel.getRawPostById(post_id)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('没有权限')
      }
      PostModel.delPostById(post_id)
        .then(function () {
          req.flash('success', '删除文章成功')
          // 删除成功后跳转到主页
          res.redirect('/posts')
        })
        .catch(next)
    })
})

module.exports = router
