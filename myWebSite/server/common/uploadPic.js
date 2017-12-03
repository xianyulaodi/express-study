const formidable = require('formidable');
const fs  = require('fs');
const path = require("path");
const common = require('./common');
const config = require('../config');

// 图片上传
exports.uploadPic = (req,res,next,callback) => {
    var form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = config.upload.path;
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; // 单位为byte
    form.type = true;
    form.on('error', function(err) {
        console.error('upload failed', err.message);
        next(err);
    });
    form.parse(req,(err, fields, files) => {
        if (err) {
          res.send(err);
          return;
        };
        var newPath = form.uploadDir + files.imgFile.name;  //imgFile为file的name字段
        fs.renameSync(files.imgFile.path, newPath); //重命名
        const resUrl = '//'+ config.hostname + ':' + config.port +  config.upload.url + files.imgFile.name;
        callback(resUrl);
    });
}
