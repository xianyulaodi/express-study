// import Mock from 'mockjs';

// Mock.setup({
//     timeout: '200-600'
// });

// /**
// Mock.mock( rurl?, rtype?, template|function(options) )
// 根据数据模板生成模拟数据。

// 参数的含义和默认值如下所示：
// 参数 rurl：可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list.json/、'/domian/list.json'。
// 参数 rtype：可选。表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
// 参数 template：可选。表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。
// 参数 function(options)：可选。表示用于生成响应数据的函数。
// 参数 options：指向本次请求的 Ajax 选项集。
// Mock.mockjax(library)
// **/
// Mock.mock(
// 	'/getUserDetailTest', {
// 	    'list|1-10': [{      //数据模板，随机生成一个对象数组
//             'id|+1': 1,   //1开始，递增
//             'email': '@EMAIL',
//             'regexp3': /\d{5,10}/ 
//         }]
// 	}
// );


// Mock.mock(
// 	'/test', {
// 	    "userName" : '@name',     //模拟名称
// 	    "age|1-100":100,          //模拟年龄(1-100)
// 	    "color"    : "@color",    //模拟色值
// 	    "date"     : "@date('yyyy-MM-dd')",  //模拟时间
// 	    "url"      : "@url()",     //模拟url
// 	    "content"  : "@cparagraph()", //模拟文本
// 	    "picUrl"   : "@Image",
// 	    "text"     : "@ctitle"
// 	}
// );

// /**
//  * 注册
//  * param userName  {String} 用户名
//  * email email  {String} 用户名
//  * param password  {String} 用户名
//  */

// Mock.mock(
// 	'/register', 'post',{
// 	    'status'  : 200,
// 	    "message" : "success"

// 	}
// );

// /**
//  * 登录
//  * email email  {String} 用户名
//  * param password  {String} 用户名
//  */
// Mock.mock(
// 	'/login', 'post',{
// 	    'status'  : 200,
// 	    'data': {
// 	    	'userName': '@name',
// 	    	'id': 565656, //用户id
// 	    	'userPic':'@Image',
// 	    },
// 	    "message" : "success"
// 	}
// );

// /**
//  * 退出
//  */
// Mock.mock(
// 	'/logout', 'post',{
// 	    'status'  : 200,
// 	    "message" : "success"
// 	}
// );


// //获取文章列表
// //page      页码
// //pageSize  每页数量
// Mock.mock(
// 	'/getTopicList',{
// 		"status" : 200,
// 		"message" : "success",
// 		"list|10-15" : [{
// 			'_id|+1' : 1654651,
// 			'title' : '@ctitle',
// 			'content' : '@cparagraph()',
// 			'authorInfo':{
// 				'name': '@name',
// 				'authorPic': 'https://dummyimage.com/96x96/46ebbf/1d1d1d',
// 				'authorId|+1': 498798
// 			},
// 			'commentNum|+1':798798,
// 			'contentPic':'https://dummyimage.com/150x150/1d1d1d/fff',
// 			'category':'@csentence()',
// 			'createTime':"@date('yyyy-MM-dd')",
// 			'read|+1':56,
// 			'like|+1':56,
// 		}],
// 		"total": 5454  //文章总数
// 	}
// );

// // 获取文章详情
// // articleId
// Mock.mock(
// 	'/getArticleDetail','get',{
// 		'status' : 200,
// 		"message" : "success",
// 		'data': {
// 			'_id|+1' : 1654651,
// 			'title' : '@ctitle',
// 			'content' : '@cparagraph()',
// 			'authorInfo':{
// 				'name': '@name',
// 				'authorPic': 'https://dummyimage.com/96x96/46ebbf/1d1d1d',
// 				'authorId|+1': 498798
// 			},
// 			'commentNum|+1':798798,
// 			'contentPic':'https://dummyimage.com/150x150/1d1d1d/fff',
// 			'category':'@csentence()',
// 			'createTime':"@date('yyyy-MM-dd')",
// 			'read|+1':56,
// 			'like|+1':56,
// 		}
// 	}
// );


// //获取banner列表
// Mock.mock(
// 	'/getBannerList',{
// 		"status" : 200,
// 		"message" : "success",
// 		"list" : [{
// 			'picUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508926087706&di=1e280b2044415a8a2f9a41fbc2f1773c&imgtype=0&src=http%3A%2F%2Fwww.pp3.cn%2Fuploads%2Fallimg%2F111120%2F100R612W-4.jpg',
// 			'url': '@url()'
// 		}]
// 	}
// )


// //获取评论列表
// //articleId 文章id
// Mock.mock(
// 	'/getComments',{
// 		"status" : 200,
// 		"message" : "success",
// 		"list|10-15" : [{
// 			'_id|+1' : 1654651, //评论id
// 			'content' : '@cparagraph()',
// 			'replyerInfo':{
// 				'name': '@name',
// 				'replyerPic': 'https://dummyimage.com/96x96/46ebbf/1d1d1d',
// 				'replyerId|+1': 498798
// 			},
// 			'createTime':"@date('yyyy-MM-dd')",
// 		}]
// 	}
// );

// // 删除评论
// // replyerId  评论者id
// // replyId    评论id
// Mock.mock(
// 	'/delComment','post',{
// 		"status" : 200,
// 		"message" : "success"
// 	}
// );


// /**
//  * 添加新文章
//  * @title     新增文章标题 
//  * @content   文章内容
//  * @type      文章类型
//  * 需要登录
//  */
// Mock.mock(
// 	'/addNewTopic',{
// 		"status" : 200,
// 		"message" : "success"
// 	}
// );

// /**
//  * 添加评论
//  * @articleId    文章id
//  * @content      评论内容
//  */
// Mock.mock(
// 	'/addCommentByArticleId','post',{
// 		"status" : 200,
// 		"message" : "success"
// 	}
// );

// /**
//  * 获取作者信息
//  * authorId
//  */
// Mock.mock(
// 	'/getAuthorDetail',{
// 		"status" : 200,
// 		"message" : "success",
// 		"data": {
// 			"articleList|10-15" : [{ //文章列表
// 				'_id|+1' : 1654651,
// 				'title' : '@ctitle',
// 				'content' : '@cparagraph()',
// 				'authorInfo':{
// 					'name': '@name',
// 					'authorPic': 'https://dummyimage.com/96x96/46ebbf/1d1d1d',
// 					'authorId|+1': 498798
// 				},
// 				'commentNum|+1':798798,
// 				'contentPic':'https://dummyimage.com/150x150/1d1d1d/fff',
// 				'category':'@csentence()',
// 				'createTime':"@date('yyyy-MM-dd')",
// 				'read|+1':56,
// 				'like|+1':56,
// 			}],
// 			"userInfo": {
// 				"sigature": "@csentence()", //个性签名
// 				"introdece":"@cparagraph()",  //个人简介
// 				"focus": "1592", //关注
// 				"fans": "89790", //粉丝
// 				"name":"咸鱼老弟",
// 				"userPic":'@Image'
// 			},
// 			"isFocus": false
			
// 		}
// 	}
// );

// /**
//  * 判断用户是否已登录
//  */
// Mock.mock(
// 	'/checkIsLogin',{
// 		"status" : 200,
// 		"message" : "success",
// 		'data': {
// 	    	'userName': '@name',
// 	    	'id': 565656, //用户id
// 	    	'userPic':'http://upload.jianshu.io/users/upload_avatars/3343569/65efd19a-8a5a-47d3-bfd3-c7cee81b280e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
// 	    	"sigature": "@csentence()", //个性签名
// 	    	"email":"@email",
// 			"introdece":"@cparagraph()"  //个人简介
// 	    }
// 	}
// );

// /**
//  * 获取用户信息
//  */
// Mock.mock(
// 	'/getPersonalInfo',{
// 		"status" : 200,
// 		"message" : "success",
// 		'data': {
// 	    	'userName': '@name',
// 	    	'id': 565656, //用户id
// 	    	'userPic':'http://upload.jianshu.io/users/upload_avatars/3343569/65efd19a-8a5a-47d3-bfd3-c7cee81b280e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
// 	    	"sigature": "@csentence()", //个性签名
// 	    	"email":"@email",
// 			"introdece":"@cparagraph()"  //个人简介
// 	    }
// 	}
// );

// /**
//  * 关注用户
//  * authorId
//  */
// Mock.mock(
// 	'/focus','post',{
// 		"status" : 200,
// 		"message" : "success"
// 	}
// );

// /**
//  * 更新文章内容
//  * articleId  文章id
//  * content    内容
//  * title      标题
//  */
// Mock.mock(
// 	'/updateArticle','post',{
// 		"status" : 200,
// 		"message" : "success"
// 	}
// );

// /**
//  * 删除文章
//  * articleId  文章id
//  * authorId   作者id
//  */
// Mock.mock(
// 	'/delArticleById','post',{
// 		"status" : 200,
// 		"message" : "success"
// 	}
// );


