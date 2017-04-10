const fs = require('fs');

fs.readFile('./file/readFile.txt','utf8', function(err, data) {
    // 读取文件失败/错误
    if (err) {
        throw err;
    }
    // 读取文件成功
    console.log('异步测试： -->'+data);
});

//同步
var data=fs.readFileSync('./file/readFile.txt','utf-8');
console.log('同步测试：-->'+data);