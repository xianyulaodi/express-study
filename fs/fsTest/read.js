const fs = require('fs');
fs.open(__dirname+'/file/open.txt', 'r', function (err, fd) {
  if(err) {
    return;

  } else {

    var buffer = new Buffer(255);
    //每一个汉字utf8编码是3个字节，英文是1个字节
    fs.read(fd, buffer, 0, 9, 0, function (err, bytesRead, buffer) {
      if(err) {
        throw err;
      } else {
        console.log(bytesRead);
        console.log(buffer.slice(0, bytesRead).toString());
        //读取完后，再使用fd读取时，基点是基于上次读取位置计算；
        fs.read(fd, buffer, 0, 20, null, function (err, bytesRead, buffer) {
          console.log(bytesRead);
          console.log(buffer.slice(0, bytesRead).toString());
        });
      }
    });
  }
});
