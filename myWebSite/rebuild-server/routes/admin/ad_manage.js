const path = require('path')
const express = require('express')
const router = express.Router()
// 广告管理

// 上传广告
// // /posts/upload 文章图片上传 借助于 express-formidable 中间件
// router.post('/upload', function (req, res, next) {
//     const picName = req.files.file.path.split(path.sep).pop();
//     if (picName) {
//         res.json({
//             status: 200,
//             picUrl: '/img/ad/banner' + picName
//         })
//     } else {
//         res.json({ status: 100 });
//     }

//     next();
// })

router.get('/', function (req, res, next) {   
    res.render('./admin/form', {})
})

module.exports = router