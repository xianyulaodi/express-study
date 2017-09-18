const config = require('../config');
const utility = require('utility');
const path = require('path');
const fs = require('fs');

exports.upload = (file,options,callback) => {
    var filename = options.filename;
    var newFilename = utility.md5(filename + String((new Date()).getTime())) +path.extname(filename);
    var upload_path = config.upload.path;
    var base_url = config.upload.url;
    var filePath = path.join(upload_path,newFilename);
    var fileUrl = base_url + newFilename;

    file.on('end',() => {   // 当没有数据时，关闭数据流
      callback(null,{
        url:fileUrl
      });
    });

    file.pipe(fs.createWriteStream(filePath));
};
