const fs = require('fs');
fs.open('./file/open.txt','r+','0666',function(err,data){
   console.log(data);
});
