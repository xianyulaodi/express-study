const path = require('path')
const fs = require('fs')
const express = require('express')
const AdModel = require('../../models/ad')
const checkLogin = require('../../middlewares/check').checkLogin
const router = express.Router()

router.get('/', function (req, res, next) {
    const type = req.query.type;
    const is_show = req.query.is_show;
    let query = {};
    AdModel.getAdByQuery(query)
        .then(function (ads) {
            res.render('./admin/ad_manage', {
                adList: ads
            })
        })
        .catch(function (e) {
            next(e)
        })
})

// 上传广告
// /admin/ad_manage/upload 广告上传
router.post('/upload', function (req, res, next) {
    const pic = req.files.pic.path.split(path.sep).pop();
    const link = req.fields.link;
    const desc = req.fields.desc;
    const type = req.fields.type;
    const is_show = req.fields.is_show || '0';
    const offline_time = req.fields.offline_time;
    const data = {
        pic: pic,
        link: link,
        desc: desc,
        type: type,
        is_show: is_show,
        offline_time: offline_time
    };
    AdModel.create(data)
    .then(function () {
        if (!fs.existsSync('./public/img/ad')) {
            fs.mkdirSync('./public/img/ad');
        }
        if (pic) {
            fs.rename(req.files.pic.path, './public/img/ad/' + pic, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
        res.redirect('/admin/ad_manage');
    })
    .catch(function (e) {
        fs.unlink(req.files.pic.path)
        next(e)
    })
})

router.get('/:ad_id/edit', function (req, res, next) {
    const ad_id = req.params.ad_id;
    AdModel.getAdById(ad_id)
    .then(function (detail) {
        res.render('./admin/ad_manage_edit', {
            detail: detail
        })
    })
    .catch(function (e) {
        next(e)
    })
})

router.post('/update', function (req, res, next) {
    const ad_id = req.fields.ad_id;
    const link = req.fields.link;
    const desc = req.fields.desc;
    const type = req.fields.type;
    const is_show = req.fields.is_show || '0';
    const offline_time = req.fields.offline_time;
    const data = {
        link: link,
        desc: desc,
        type: type,
        is_show: is_show,
        offline_time: offline_time
    };
    if (req.files.pic.name) {
        data.pic = req.files.pic.path.split(path.sep).pop();
    }
    AdModel.updateAd(ad_id,data)
        .then(function (result) {
            res.redirect('/admin/ad_manage');
        })
        .catch(function (e) {
            next(e)
        })
})

router.get('/del', checkLogin, function (req, res, next) {
    const ad_id = req.query.ad_id;
    AdModel.removeAd(ad_id)
        .then(function (result) {
            res.redirect('/admin/ad_manage');
        })
        .catch(function (e) {
            next(e)
        })
})



module.exports = router