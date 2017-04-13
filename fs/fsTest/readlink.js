const fs = require('fs');
// readlink
fs.readlink('./file/link2.txt',function(err,data){
   console.log(data); //.\file\link.txt  返回创建它的软链接
});

// realpath
fs.realpath('./file/linkFile.txt', function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath); //F:\myFile\express\express-study\fs\fsTest\file\linkFile.txt  返回绝对路径
});
