const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comments')

// POST /comments 创建一条留言
router.post('/', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const post_id = req.fields.post_id
  const content = req.fields.content

  // 校验参数
  try {
    if (!content.length) {
      throw new Error('请填写留言内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  const comment = {
    author: author,
    post_id: post_id,
    content: content
  }

  CommentModel.create(comment)
    .then(function () {
      req.flash('success', '留言成功')
      // 留言成功后跳转到上一页
      res.redirect('back')
    })
    .catch(next)
})

// GET /comments/:comment_id/remove 删除一条留言
router.get('/:comment_id/remove', checkLogin, function (req, res, next) {
  const comment_id = req.params.comment_id
  const author = req.session.user._id

  CommentModel.getCommentById(comment_id)
    .then(function (comment) {
      if (!comment) {
        throw new Error('留言不存在')
      }
      if (comment.author.toString() !== author.toString()) {
        throw new Error('没有权限删除留言')
      }
      CommentModel.delCommentById(comment_id)
        .then(function () {
          req.flash('success', '删除留言成功')
          // 删除成功后跳转到上一页
          res.redirect('back')
        })
        .catch(next)
    })
})

// POST /comments/reply 创建一条评论回复
router.post('/reply', checkLogin, function (req, res, next) {
  const from_uid = req.session.user._id
  const comment_id = req.fields.comment_id
  const reply_id = req.fields.reply_id
  const reply_type = req.fields.reply_type  // comment | reply
  const content = req.fields.content
  const to_uid = req.fields.to_uid

  // 校验参数
  try {
    if (!content.length) {
      throw new Error('请填写回复内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  const comment = {
    from_uid: from_uid,
    comment_id: comment_id,
    reply_id: reply_id,
    reply_type: reply_type,
    content: content,
    to_uid: to_uid
  }
  console.log('收到数据:',comment);

  CommentModel.create_reply(comment)
    .then(function () {
      req.flash('success', '回复成功')
      // 留言成功后跳转到上一页
      res.redirect('back')
    })
    .catch(next)
})

module.exports = router
