const fs = require('fs');

// 写入文件内容（如果文件不存在会创建一个文件）
// 写入时会先清空文件
fs.writeFile('./file/writeFile.txt', '写入成功：hello world', function(err) {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    var data=fs.readFileSync('./file/writeFile.txt', 'utf-8');
    console.log('new data -->'+data);
});


// 数据追加
setTimeout(function(){
	// 追加
	fs.writeFile('./file/writeFile.txt', '这里是追加的数据', {'flag':'a'},function(err) {
	    if (err) {
	        throw err;
	    }
	    console.log('success');
	    var data=fs.readFileSync('./file/writeFile.txt', 'utf-8')
	    // 写入成功后读取测试
	    console.log('追加后的数据 -->'+data);
	});
},1000);

