const fs = require('fs');
fs.readdir('./file',function(err,data){
  if(err) return;
  console.log('读取的数据为：'+data[0]);
});
