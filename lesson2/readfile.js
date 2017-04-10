const fs = require('fs');

fs.readFile('./test.js','utf8', function(err, data) {
    // 读取文件失败/错误
    if (err) {
        throw err;
    }
    // 读取文件成功
    console.log(data);
});

//同步
var data=fs.readFileSync('./test.js','utf-8');
console.log('111'+data);