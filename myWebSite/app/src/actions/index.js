import * as constants from '../constants'
import * as basicAction from './innerAction'

// 获取文本列表
// pageNo
// pageSize
export function GetTopicList(data) {
  return (dispatch, getState) => {
    return basicAction.getTopicList(data,dispatch,[call_getTopicList]);
  }
}

function call_getTopicList(data) {
  return {
    type:constants.UPDATETOPICLIST,
    data:data
  }
}

// 获取热门文章
export function getHotList() {
  return (dispatch,getState) => {
    return basicAction.getHotList(dispatch,[call_getHotList]);
  }
}

function call_getHotList(data) {
  return {
     type: constants.GETHOTLIST,
     data: data
  }
}



// 获取banner列表
export function GetBannerList() {
  return (dispatch, getState) => {
    return basicAction.getBannerList(dispatch,[call_getBannerList]);
  }
}

function call_getBannerList(data) {
  return {
    type:constants.GETBANNERLIST,
    data:data
  }
}

//获取文章详情页
export function GetArticleDetail(id) {
  return (dispatch, getState) => {
    return basicAction.getArticleDetail(id,dispatch,[call_getArticleDetail]);
  }
}

function call_getArticleDetail(data){
  return {
    type:constants.UPDATEDETAILINFO,
    data:data
  }
}

//获取文章评论
export function GetComments(id){
  return (dispatch, getState) => {
    return basicAction.getComments(id,dispatch,[call_getComments]);
  }
}
function call_getComments(data){
  return {
    type:constants.UPDATECOMMENTLIST,
    data:data
  }
}

/**
 * 各种表单提交
 * 登录
 * 注册
 * 发表文章
 * 评论提交
 */
export const SubmitData = (type, data) => {
  return (dispatch, getState) => {
    switch (type) {
      case 'login':
        return basicAction.sendLoginInfo(data,dispatch,[UpdateLoginState,UpdateUserInfo]);
      case 'register':
        return basicAction.sendRegisterInfo(data,dispatch,[call_register]);
      case 'addNewTopic':
        return basicAction.addNewTopic(data,dispatch,[call_addNewTopic]);
      case 'addCommentByArticleId':
        return basicAction.addComment(data,dispatch,[call_addComment]);
      default:
        return
    }
  }
}

//注册成功回调
function call_register(data) {
  return {
    type:constants.REGISTER,
    data:data.status
  }  
}

// 添加评论成功
function call_addComment(data) {
  return {
    type: constants.ADDCOMMENT,
    data: data.status
  }
}

// 删除评论
export function delComment(data) {
  return (dispatch, getState) => {
    return basicAction.delComment(data,dispatch,[call_delComment]);
  }  
}
function call_delComment(boolean) {
  return {
    type: constants.DELCOMMENT,
    data: boolean
  }  
}

// 添加文章
function call_addNewTopic(data) {
  return {
    type: constants.ADDTOPIC,
    data: data.status
  }
}


//更新登录状态
function UpdateLoginState(key,uid) {
  var uid = uid || 0;
  if(key === 'login') {
    return {
      type: constants.LOGIN,
      data: uid
    }
  }
  if (key === 'logOut'){
    return {
      type : constants.LOGOUT
    }
  }

  if (key === 'noLogin'){
    return {
      type : constants.NOLOGIN
    }
  }
}

// 判断是否登录成功
export function CheckIsLogin() {
  return (dispatch, getState) => {
    return basicAction.checkIsLogin(dispatch,[UpdateLoginState]);
  }
}

// 更新用户信息
function UpdateUserInfo(userInfo){
  return {
      type:constants.UPDATEUSERINFO,
      data:userInfo
  }
}

export function LogOut() {
  return (dispatch, getState) => {
    return basicAction.logOut(dispatch,[UpdateLoginState,UpdateUserInfo]);
  }
}


// 获取作者详情，包括文章列表，粉丝数量，关注等
export function getAuthorDetail(userId) {
  return (dispatch, getState) => {
    return basicAction.getAuthorDetail(userId,dispatch,[call_getAuthorDetail]);
  }
}

function call_getAuthorDetail(data) {
  return {
      type:constants.GETAUTHORDETAIL,
      data:data
  }
}

// 关注
export function focus(authorId) {
  return (dispatch,getState) => {
    return basicAction.focus(authorId,dispatch,[call_focus])
  }
}

// 取消关注
export function unFocus(authorId) {
  return (dispatch,getState) => {
    return basicAction.focus(authorId,dispatch,[call_focus])
  }
}

// 判断是否已经关注作者
export function isFocus(authorId) {
  return (dispatch,getState) => {
    return basicAction.isFocus(authorId,dispatch,[call_focus])
  }
}


function call_focus(boolean) {
  return {
       type:constants.FOCUS,
       data:boolean
  }
}


//获取用户个人信息
export function getPersonalInfo() {
  return (dispatch, getState) => {
    return basicAction.getPersonalInfo(dispatch,[call_getPersonalInfo]);
  }
}

function call_getPersonalInfo(data) {
  return {
       type:constants.GETTINGINFO,
       data:data
  }
}

// 获取用户id 
export function getUserId() {
  return (dispatch, getState) => {
    return basicAction.getUserId(dispatch,[call_getUserId]);
  }
}
function call_getUserId(uid) {
  return {
    type:constants.GETUSERID,
    uid:uid
  }  
}

//设置个人信息
export function setPersonalInfo(data) {
  return (dispatch, getState) => {
    return basicAction.setPersonalInfo(data,dispatch,[call_setPersonalInfo]);
  }
}
function call_setPersonalInfo(boolean) {
  return {
       type:constants.UPDATEUSERINFO,
       data:boolean
  }
}

// 头像图片上传
export function uploadHeadPic(data) {
  return (dispatch, getState) => {
    return basicAction.uploadPic(data,dispatch,false,[call_uploadHeadPic]);
  }
}

function call_uploadHeadPic(data) {
  return {
    type:constants.UPLOADHEADPIC,
    data:data.picUrl
  }
}

// 图片上传,文章的编辑
export function uploadPic(data) {
  return (dispatch, getState) => {
    return basicAction.uploadPic(data,dispatch,true,[call_uploadPic]);
  }
}

function call_uploadPic(data) {
  return {
    type:constants.UPLOADPIC,
    data:data.picUrl
  }
}


