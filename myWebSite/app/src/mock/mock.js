import Mock from 'mockjs';

Mock.setup({
    timeout: '200-600'
});

/**
Mock.mock( rurl?, rtype?, template|function(options) )
根据数据模板生成模拟数据。

参数的含义和默认值如下所示：
参数 rurl：可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list.json/、'/domian/list.json'。
参数 rtype：可选。表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
参数 template：可选。表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。
参数 function(options)：可选。表示用于生成响应数据的函数。
参数 options：指向本次请求的 Ajax 选项集。
Mock.mockjax(library)
**/
Mock.mock(
	'/getUserDetail', {
	    'list|1-10': [{      //数据模板，随机生成一个对象数组
            'id|+1': 1,   //1开始，递增
            'email': '@EMAIL',
            'regexp3': /\d{5,10}/ 
        }]
	}
);


Mock.mock(
	'/test', {
	    "userName" : '@name',     //模拟名称
	    "age|1-100":100,          //模拟年龄(1-100)
	    "color"    : "@color",    //模拟色值
	    "date"     : "@date('yyyy-MM-dd')",  //模拟时间
	    "url"      : "@url()",     //模拟url
	    "content"  : "@cparagraph()", //模拟文本
	    "picUrl"   : "@Image",
	    "text"     : "@ctitle"
	}
);

/**
 * 注册
 * param userName  {String} 用户名
 * email email  {String} 用户名
 * param password  {String} 用户名
 */

Mock.mock(
	'/register', 'post',{
	    'result' : 1,
	    'status'  : 200
	}
);

/**
 * 登录
 * email email  {String} 用户名
 * param password  {String} 用户名
 */
Mock.mock(
	'/login', 'post',{
	    'result' : 1,
	    'status'  : 200,
	    'data': {
	    	'userName': '@name',
	    	'id': 565656, //用户id
	    	'userPic':'@Image',
	    }
	}
);

//获取文章列表
Mock.mock(
	'/getTopicList',{
		"result": 1,
		"status" : 200,
		"list|10-15" : [{
			'_id|+1' : 1654651,
			'title' : '@ctitle',
			'content' : '@cparagraph()',
			'authorInfo':{
				'name': '@name',
				'authorPic': 'https://dummyimage.com/96x96/46ebbf/1d1d1d',
				'authorId|+1': 498798
			},
			'commentNum|+1':798798,
			'contentPic':'https://dummyimage.com/150x150/1d1d1d/fff',
			'category':'@csentence()',
			'createTime':"@date('yyyy-MM-dd')",
			'read|+1':56,
			'like|+1':56,
		}]
	}
);

// 获取文章详情
Mock.mock(
	'/getArticleDetail','get',{
		'result': 1,
		'status' : 200,
		'data': {
			'_id|+1' : 1654651,
			'title' : '@ctitle',
			'content' : '@cparagraph()',
			'authorInfo':{
				'name': '@name',
				'authorPic': 'https://dummyimage.com/96x96/46ebbf/1d1d1d',
				'authorId|+1': 498798
			},
			'commentNum|+1':798798,
			'contentPic':'https://dummyimage.com/150x150/1d1d1d/fff',
			'category':'@csentence()',
			'createTime':"@date('yyyy-MM-dd')",
			'read|+1':56,
			'like|+1':56,
		}
	}
);


//获取banner列表
Mock.mock(
	'/getBannerList',{
		"result": 1,
		"status" : 200,
		"list" : [{
			'picUrl': 'https://dummyimage.com/960x270/46ebbf/fff',
			'url': '@url()'
		}]
	}
)


//获取评论列表
Mock.mock(
	'/getComments',{
		"result": 1,
		"status" : 200,
		"list|10-15" : [{
			'_id|+1' : 1654651, //评论id
			'content' : '@cparagraph()',
			'replyerInfo':{
				'name': '@name',
				'replyerPic': 'https://dummyimage.com/96x96/46ebbf/1d1d1d',
				'replyerId|+1': 498798
			},
			'createTime':"@date('yyyy-MM-dd')",
		}]
	}
);


/**
 * 添加新文章
 * @title     新增文章标题 
 * @content   文章内容
 * @coverPic  封面图片 
 * @type      文章类型
 * 需要登录
 */
Mock.mock(
	'/addNewTopic',{
		"result": 1,
		"status" : 200
	}
);

/**
 * 添加评论
 * @articleId    文章id
 */
Mock.mock(
	'/addCommentByArticleId','post',{
		"result": 1,
		"status" : 200
	}
);

/**
 * 获取用户信息
 * 
 */
