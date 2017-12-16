const path = require('path')
const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const CollectModel = require('../models/collect')

// POST /collect 收藏文章
// eg: POST /collect
router.post('/',checkLogin, function (req, res, next) {
  const uid = req.session.user._id
  const post_id = req.fields.post_id //文章id
  const collect = {
    uid: uid,
    post_id: post_id,
  }
  CollectModel.addCollect(collect)
    .then(function (result) {
      req.flash('success', '收藏成功')
      res.redirect(`/posts/${post_id}`)
    })
    .catch(next)
})

// POST /collect/remove 取消收藏
// eg: get /collect/remove
router.post('/remove',checkLogin, function (req, res, next) {
  const post_id = req.fields.post_id
  CollectModel.removeCollect(post_id)
    .then(function (result) {
      req.flash('success', '取消收藏成功')
      res.redirect(`/posts/${post_id}`)
    })
    .catch(next)
})

module.exports = router
