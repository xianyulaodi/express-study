const fs = require('fs');

// 写入文件内容（如果文件不存在会创建一个文件）
// 写入时会先清空文件
fs.appendFile('./file/appendFile.txt', '新数据456', function(err) {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    var data=fs.readFileSync('./file/appendFile.txt', 'utf-8');
    console.log(data);
});



