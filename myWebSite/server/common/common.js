/**
 * 公共js
 */

module.exports = {
  //是否登录
  isLogin(req) {
    if(req.session.user) {
    	return true;
    }
    return false;
  },
  //获取用户uid
  getUid(req) {
  	var uid = '';
  	if(req.session.user) {
  		uid = req.session.user._id;
  	}
  	return uid;
  },
  //正常返回值
  succRes(res,data) {
  	var resData = {
			"status": 200,
      "message": "success"   		
  	};
  	if(data) {
  		resData = Object.assign(resData,data);
  	}
  	res.json(resData);
  },
  // 失败返回值·
  failRes(res,msg) {
  	res.json({
      "status": 100,
      "message": msg || "fail"   		
  	})
  },
  // 未登录的返回值
  noLoginRes(res) {
		res.json({
  	  "status": 201,
      "message": "no login" 
  	});  	
  },

}