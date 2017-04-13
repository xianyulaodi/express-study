const fs = require('fs');
fs.link('./file/link.txt','./file/linkFile.txt',function(err){
   if(err) return;
})
