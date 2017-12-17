const path = require('path')
const express = require('express')
const router = express.Router()

// GET /posts 所有用户或者特定用户的文章页，以及热门文章
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
    res.render('./admin/index')
})

module.exports = router

