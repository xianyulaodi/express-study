const Eventproxy = require('eventproxy');
const Collect = require('../api/collect');
const common = require('../common/common');
const proxy = new Eventproxy();

// 添加收藏
exports.addCollect = (req,res,next) => {
	if(!common.isLogin(req)) {
  	common.noLoginRes(res);
  	return false;
  }	
  const 
    articleId = req.body.articleId,
    uesrId = req.session.user._id,
    authorId = req.body.authorId,
    title = req.body.title;
    data = {};
    
  if(!isHadCollect(articleId,uesrId)) {
  	common.failRes(res,'had collect article');
  	return false;  	
  }
  data.article_id = articleId;
  data.user_id = uesrId;
  data.author_id = authorId;
  data.title = title;
  Collect.addCollect(data)
  .then(result => {
  	if(result) {
  		proxy.emit('collect',result);
  	}
  }); 
 // 更新评论数量
  Collect.updateArticleCollectNum(articleId,'add',(err) => {
    if(err) return;
    proxy.emit('topic',articleId);
  });
  proxy.all('topic','collect',(articleId,result) => {
  	common.succRes(res);
  });
}

function isHadCollect(articleId,uesrId) {
	Collect.findCollectExist({ article_id: articleId,user_id: uesrId }, (err, data) => {
    if (err) console.log(err);
    if(data) {
    	return false;   	
    }
    return true;
	});
}

// 判断是否已收藏
exports.hadCollect = (req,res,next) => {
	const articleId = req.query.articleId;
	const uesrId = req.session.user._id;
	Collect.findCollectExist({ article_id: articleId,user_id: uesrId }, (err, data) => {
    if (err) console.log(err);
    if(data) {
    	common.succRes(res,{"isCollect": 1}); 	
    } else {
    	common.succRes(res,{"isCollect": 0});
    }
	});  
}

// 取消收藏
exports.unCollect = (req,res,next) => {
  const articleId = req.query.articleId;
	const uesrId = req.session.user._id; 
	if(!common.isLogin(req)) {
  	common.noLoginRes(res);
  	return false;
  }		
	Collect.unCollect({ article_id: articleId,user_id: uesrId }, (err, data) => {
		if (err) console.log(err);
		var resData = '';
		if(data) {
			resData = {
	      "status": 200,
	      "message": "success" 			
			};
    } else {
			resData = {
	      "status": 100,
	      "message": "del collect fail" 			
			};    	
    }	
	  proxy.emit('uncollect',resData);

	});
	Collect.updateArticleCollectNum(articleId,'minus',(err) => {
    if(err) return;
    proxy.emit('topic',articleId);
  });
  proxy.all('topic','uncollect',(articleId,result) => {
  	res.json(result);
  });
}
//获取所有收藏
exports.getAllCollect = (req,res,next) => {
  
}



