import Mock from 'mockjs';

Mock.setup({
    timeout: '200-600'
});

export default Mock.mock(
	'/getUserDetail', {
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