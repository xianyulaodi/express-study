
exports.flash = (req,res,next) => {
    if(req.session && req.session.user) {
      res.locals.user = req.session.user;  // 将 user 信息返回到全局变量user中
      next();
    }else{
      next();
    }
}
