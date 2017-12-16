const path = require('path')
const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const FocusModel = require('../models/focus')

// POST /focus 关注作者
// eg: POST /focus
router.post('/',checkLogin, function (req, res, next) {
  const uid = req.session.user._id
  const author = req.fields.author
  const post_id = req.fields.post_id
  const focus = {
    from_uid: uid,
    to_uid: author
  }
  FocusModel.focus(focus)
    .then(function (result) {
      req.flash('success', '关注成功')
      if(post_id) {
        res.redirect(`/posts/${post_id}`)
        return false;
      }
      res.redirect(`/users?author=${author}`)
    })
    .catch(next)
})

// POST /focus/unfocus 取消关注
// eg: get /collect/remove
router.post('/unfocus',checkLogin, function (req, res, next) {
  const author = req.fields.author
  const post_id = req.fields.post_id
  FocusModel.unfocus(author)
    .then(function (result) {
      req.flash('success', '取消关注成功')
      if(post_id) {
        res.redirect(`/posts/${post_id}`)
        return false;
      }
      res.redirect(`/users?author=${author}`)
    })
    .catch(next)
})

module.exports = router
