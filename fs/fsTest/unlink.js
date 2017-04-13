const fs =require('fs');

fs.unlink('./file/unlink.txt',function(err){
	if(err) return;
	console.log('成功删除了unlink.txt这个文件');
});