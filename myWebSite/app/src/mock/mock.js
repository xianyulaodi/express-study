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
		"list|1-10" : [{
			'id|+1' : 1,
			'title' : '@ctitle',
			'content' : '@cparagraph()',
			'auchor':'@name',
			'auchorPic':'@Image',
			'viewNum':'@number|1-1000'
		}]
	}
)

