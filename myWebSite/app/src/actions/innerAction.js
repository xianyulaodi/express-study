import { SERVERADDRESS } from '../constants'
import axios from 'axios';
import qs from 'qs'; //用于anxios中将数据post时，数据的格式化
import data from '../mock/mock';

const api = '/api';

/**
返回的格式统一为：
{
    status: "", 200 成功
    message: "",
    data: {}
}

如果是返回数组，则为：
{
    status: "", 200 成功
    message: "",
    list: []
}

**/
/**
axios.get('/getTopicList')
 .then(function (response) {
  console.log(response.data);
 })
.catch(function (error) {
  console.log(error);
});

axios.get('/user',{
  params:{
    ID:12345
  }
})
.then(function(response){
  console.log(response);
})
.catch(function(err){
  console.log(err);
});

axios.post('/user',{
  firstName:'Fred',
  lastName:'Flintstone'
})
.then(function(res){
  console.log(res);
})
.catch(function(err){
  console.log(err);
});
**/

/**
 * 获取所有的文章
 * @param { string} page 页码
 * @param { string} pageSize 每页多少数据
 */
export function getTopicList(params,dispatch,callback) {
  axios.get(api + '/getTopicList?pageSize='+ params.pageSize +'&page='+ params.page)
  .then(function (res) {
    const resData = res.data;
    if( resData.status == '200' ) { 
      dispatch(callback[0](resData.list));
    };
  })
  .catch(function (error) {
    console.log(error);
  });
}

// 获取热门文章
export function getHotList(dispatch,callback) {
  axios.get(api + '/getHotArticle')
  .then(function (res) {
    const resData = res.data;
    if( resData.status == '200' ) { 
      dispatch(callback[0](resData.list));
    };
  })
  .catch(function (error) {
    console.log(error);
  });
}

/**
 * 获取banner列表
 */
export function getBannerList(dispatch,callback) {
  /**
  axios.get('/getBannerList')
  .then(function (res) {
    const data = res.data;
    const list = res.data.list || [];
    if( res.data.status == '200' ) {
      dispatch(callback[0](list));
    };
  })
  .catch(function (error) {
    console.log(error);
  });
  **/
  var list = [
    {
      picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508926087706&di=1e280b2044415a8a2f9a41fbc2f1773c&imgtype=0&src=http%3A%2F%2Fwww.pp3.cn%2Fuploads%2Fallimg%2F111120%2F100R612W-4.jpg',
      url: 'www.baidu.com'
    }
  ];
  dispatch(callback[0](list));
}
 
 /**
  * 获取文章详情
  * @param {string} [articleId] 文章id
  */
export function getArticleDetail(articleId,dispatch,callback) {
  axios.get( api + '/getArticleDetail?articleId='+ articleId )
  .then(function(res) {
    if( res.data.status == '200' ) {
        dispatch(callback[0](res.data.data));
    };
  })
  .catch(function(err){
    console.log(err);
  });
}

/**
 * 获取评论列表
 * @param {string} [articleId] 文章id
 */
/****/
export function getComments(articleId,dispatch,callback) {
  axios.get(api + '/getComments?articleId='+articleId )
  .then(function(res) {
    if( res.data.status == '200' ) {
      dispatch(callback[0](res.data.list));
    };
  })
  .catch(function(err){
    console.log(err);
  });
}

/**
 * 添加文章评论
 * @param articleId {string} 文章id
 * @param content  {string}  评论内容
 */
export function addComment(data,dispatch,callback) {
  axios.post(
    api + '/addCommentByArticleId',
    qs.stringify(data)
  ).then(function(res){
    if( res.data.status == '200' ) {
      dispatch(callback[0](res.data));
    };
  })
  .catch(function(err){
    console.log(err);
  });
}

/**
 * 删除评论
 * @param replyId {string} 评论id
 */
export function delComment(data,dispatch,callback) {
  axios.post(
    api + '/delComment',
    qs.stringify(data)
  ).then(function(res){
    if( res.data.status == '200' ) {
      dispatch(callback[0](true));
    };
  })
  .catch(function(err){
    console.log(err);
  });
}



/* 注册
 * @param userName  {String} 用户名
 * @param email  {String} 邮箱
 * @param password  {String} 密码
 * */
export function sendRegisterInfo(data,dispatch,callback) {
  axios.post(
    api + '/register',
    qs.stringify(data)
  ).then(function(res) {
    if( res.data.status == '200' ) {
      dispatch(callback[0](res.data));
    } else if(res.data.status == "201") {
      alert('该用户名已存在');
    } else {
      console.log('注册失败');
    }
  })   
}

/** 添加新文章 
* @param  title    {String}    新增文章标题 
* @param  content  {String}    文章内容
* 需要登录
* **/
export function addNewTopic(data,dispatch,callback) {
    axios.post(
      api + '/addNewTopic',
      qs.stringify(data)
      // { withCredentials : true }
    ).then(function(res){
        if( res.data.status == '200' ) {
           console.log('新增文章成功');
           dispatch(callback[0](res.data));
        } else {
           console.log('新增文章失败');
        }
    })
}

/**
 * 判断是否登录了
 */
export function checkIsLogin(dispatch,callback) {
  axios.get(api + '/checkIsLogin')
  .then(function(res) {
    if( res.data.status == '200' ) {
      dispatch(callback[0]('login',res.data.uid));
    } else {
      dispatch(callback[0]('noLogin'));
    }
  })
}

/**
 * 登录
 * @param email  {String} 用户名
 * @param password  {String} 密码
 */
export function sendLoginInfo(data,dispatch,callback) {
  axios.post(
    api + '/login',
    qs.stringify(data)
  ).then(function(res) {
    if( res.data.status == '200' ) {
      dispatch(callback[0]('login',res.data.data.id));
      dispatch(callback[1](res.data.data));
    } else {
      alert('账号或密码不正确');
    }
  });
}

/**
 * 获取作者信息
 * @param authorId  {String}  作者id
 */
export function getAuthorDetail(id,dispatch,callback) {
  axios.get(api+'/getAuthorCenter?authorId='+id)
  .then(function(res){
    if( res.data.status == '200' ) {
      dispatch(callback[0](res.data));
    } else {
      console.log('获取作者信息失败');
    }
  });
}

/**
 * 获取用户信息
 * 需登录
 */
export function getPersonalInfo(dispatch,callback) {
  axios.get(api+ '/getUserInfo')
  .then(function(res){
    if( res.data.status == '200' ) {
      dispatch(callback[0](res.data.userInfo));
    } else {
       console.log('获取用户信息失败');
    }
  });
}

// 获取用户uid
export function getUserId(dispatch,callback) {
  axios.get(api +'/getUserId')
  .then((res) => {
    if( res.data.status == '200' ) {
      dispatch(callback[0](res.data.uid));
    } else {
      console.log('获取uid失败');
    }
  })
}

/**
 * 设置个人信息  未完成
 * @param  sigature  个性签名
 * @param  introdece  个人简介
 * @param  sex   性别
 * @param  profile_image_url 个人头像
 * @param  location 坐标  比如:广州
 */
export function setPersonalInfo(data,dispatch,callback) {
  axios.post(
    api + '/setUserInfo',
    qs.stringify(data)
  ).then(function(res) {
    if( res.data.status == '200' ) {
      dispatch(callback[0](true));
    } else {
      dispatch(callback[0](false));
    }
  })
}

// 头像上传
export function uploadPic(file,dispatch,callback) {
  let param = new FormData()  // 创建form对象
  param.append('imgFile', file, file.name)  // 通过append向form对象添加数据
  param.append('chunk', '0') // 添加form表单中其他数据
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  axios.post(
    api+ '/uploadPic',
    param,
    config
  ).then(res => {
    if(res.data.status == '200') {
      dispatch(callback[0](res.data));
    }
    console.log('图片上传结果',res);
  })  
}

/**
 * 退出登录
 */
export function logOut(dispatch,callback) {
    axios.post(api + '/logout')
    .then(function(res){
        if( res.data.status == '200' ) {
           dispatch(callback[0]('logOut'));
           dispatch(callback[1]({}));
        } else {
           console.log('退出失败');
        }
    })
}

// 关注
// authorId 作者id
export function focus(authorId,dispatch,callback) {
  axios.post(
    api+ '/focusAuthor',
    qs.stringify({authorId,authorId})
  ).then(function(res) {
    if(res.data.status == '200') {
        dispatch(callback[0](true));
    } else {
        console.log('关注失败');
    }
  })
}

// 取消关注
// authorId 作者id
export function unFocus(authorId,dispatch,callback) {
  axios.post(
    api+ '/unfocusAuthor',
    qs.stringify({authorId,authorId})
  ).then(function(res) {
    if(res.data.status == '200') {
        dispatch(callback[0](false));
    } else {
        console.log('取消关注失败');
    }
  })
}


// 判断是否已经关注作者
// authorId 作者id
export function isFocus(authorId,dispatch,callback) {
  axios.post(
    api+ '/hadFocus',
    qs.stringify({authorId,authorId})
  ).then(function(res) {
    if(res.data.status == '200') {
      if(res.data.isFocus == 1) {
        dispatch(callback[0](true));
      } else {
        dispatch(callback[0](false));
      }
    } else {
        console.log('判断是否关注失败');
    }
  })
}


/**
 * todo list
 * 1. 收藏
 * 2. 点赞
 * 3. 搜索
 */

