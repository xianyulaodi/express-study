const config = require('../config');
const formidable = require('formidable');
const fs  = require('fs');

exports.uploadPic = (req,res,next) => {

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
    //console.log(files);
    var extName = ''; //后缀名
    switch (files.file.type) {
        case 'image/pjpeg':
            extName = 'jpg';
            break;
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
            break;
    }
    if (extName.length === 0) {
        res.json({
            code: 202,
            msg: '只支持png和jpg格式图片'
        });
        return;
    } else {
        var avatarName = '/' + Date.now() + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.file.path, newPath); //重命名
        res.json({
            success: 1,
            url: newPath
        });
    }
  });
}
