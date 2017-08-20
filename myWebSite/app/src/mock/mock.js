import Mock from 'mockjs';

Mock.setup({
    timeout: '200-600'
});

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

// 注册
Mock.mock(
	'/register', {
	    "result" : 1,
	    "status"  : 200,     
	    "userName" : '@name',
	    "email" : "@url()"
	}
);

//获取列表
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
	'/getArticleDetail',{
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

