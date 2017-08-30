import { SERVERADDRESS }from '../constants'
import { push } from 'react-router-redux'

import { message } from 'antd';
import axios from 'axios';
import data from '../mock/mock';

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


// 获取所有的商品列表
export function getTopicList(dispatch,callback) {

    axios.get('/getTopicList')
        .then(function (res) {
            const data = res.data;
            if( data.result ) {
                dispatch(callback[0](data.list));
            };
        })
        .catch(function (error) {
           console.log(error);
        });
}

//获取banner列表
export function getBannerList(dispatch,callback) {

    axios.get('/getBannerList')
        .then(function (res) {
            const data = res.data;
            const list = res.data.list || [];
            if( data.result ) {
                dispatch(callback[0](list));
            };
        })
        .catch(function (error) {
           console.log(error);
        });
}
 
//获取文章详情
export function getArticleDetail(id,dispatch,callback) {
    //console.log(这里记得传id)
    axios.get('/getArticleDetail')
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data.data));
        };
    })
    .catch(function(err){
      console.log(err);
    });
}


/**获取评论列表**/
export function getComments(id,dispatch,callback){
    //console.log(这里记得传id)
    axios.get('/getComments')
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data.list));
        };
    })
    .catch(function(err){
      console.log(err);
    });
}

/**往后的页面都还没做**/

// 添加评论
export function addComment(id,dispatch,callback){
    //console.log(这里记得传id)
    axios.post('/addCommentByArticleId',{
        articleId: id
    })
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data.list));
        };
    })
    .catch(function(err){
      console.log(err);
    });
}


// 注册
/* param userName  {String} 用户名
 * email email  {String} 邮箱
 * param password  {String} 密码
 * */
export function sendRegisterInfo(data,dispatch,callback){
    axios.post('/register',data)
    .then(function(res){
        if( res.data.result == 1 ) {
           dispatch(callback[0](res.data));
        } else if(res.data.result == "1000") {
           console.log('该用户名已存在');
        } else {
           console.log('注册失败');
        }
    })
}

/** 添加新文章 
* @title     新增文章标题 
* @content   文章内容
* @coverPic  封面图片 
* @type      文章类型
* 需要登录
* **/
export function addNewTopic(dispatch,data,callback){
    axios.post('/addNewTopic',data)
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data));
        } else {
           console.log('新增文章失败');
        }
    })
}

// 判断是否登录了
export function checkIsLogin(dispatch,callback) {
    axios.get('/checkIsLogin')
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data));
        }
    })
}

/**
 * 登录
 * email email  {String} 用户名
 * param password  {String} 用户名
 */
export function login(dispatch,data,callback){
    axios.post('/login',data)
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data));
        } else {
           console.log('登录失败');
        }
    });
}

/**
 * 获取用户信息，需登录
 * userId 用户id
 */
export function getUserDetail(id,dispatch,callback) {
    axios.get('/getUserDetail')
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data));
        } else {
           console.log('获取用户信息失败');
        }
    });
}

/**
 * 设置个人信息
 * sigature  个性签名
 * introdece  个人简介
 * sex   性别
 * profile_image_url 个人头像
 * location 坐标  比如:广州
 */
export function setPersonalInfo(data,dispatch,callback) {
  axios.post('/setPersonalInfo',data)
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data));
        } else {
           console.log('设置个人信息失败');
        }
    })
}

/**
 * 退出登录
 */
export function logout() {
    axios.post('/logout')
    .then(function(res){
        if( res.data.result ) {
            dispatch(callback[0](res.data));
        } else {
           console.log('退出失败');
        }
    })
}


/**
 * todo list
 * 1. 收藏
 * 2. 点赞
 * 3. 搜索
 */

