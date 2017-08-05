const config = require('../config');
const path = require('path');
const fs = require('fs');
const store = require('../common/store');

exports.loadPic =(req,res,next) => {
   req.busboy.on('file',(fieldname,file,filename,encoding,mimetype) => {
     store.upload(file,{filename:filename},(err,result) => {
       if(err){
         return next(err);
       }
       res.json({
         success:true,
         url:result.url
       })
     })
   })
}
