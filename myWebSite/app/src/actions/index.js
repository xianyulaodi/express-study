import * as constants from '../constants'
import * as basicAction from './innerAction'

// 获取文本列表
export function GetTopicList() {
  return (dispatch, getState) => {
    return basicAction.getTopicList(dispatch,[call_getTopicList]);
  }
}

function call_getTopicList(data) {
  return {
    type:constants.UPDATETOPICLIST,
    data:data
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

// 各种表单提交: 登录，注册，发表文章，评论提交
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
function call_addComment() {
  alert('添加评论成功');
}

// 添加文章
function call_addNewTopic(data) {
  return {
    type: constants.ADDTOPIC,
    data: data.status
  }
}

//sider
export function isCollapse() {
  return {
    type: constants.ISCOLLAPSE, 
  }
}


export function isNotCollapse() {
  return {
    type: constants.ISNOTCOLLAPSE, 
  }
}

//更新登录状态
function UpdateLoginState(key) {
  if(key === 'login') {
    return {
      type: constants.LOGIN
    }
  } else if (key === 'logOut'){
    return {
      type : constants.LOGOUT
    }
  }
}

// 判断是否登录成功
export function CheckIsLogin(){
  return (dispatch, getState) => {
    return basicAction.checkIsLogin(dispatch,[UpdateLoginState,UpdateUserInfo]);
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

export function ShowModal(innerComponentType,title){
  return {
    type :constants.SHOWMODAL,
    data :innerComponentType,
    title:title
  }
}

export function HideModal() {
  return {
    type :constants.HIDEMODAL
  }
}


export function ChangeSiderCurrent(key){
  return {
      type:constants.CHANGESIDERCURRENT,
      data:key
  }
}

export function GetList(data,type){
  var callback;
  if (type === 'initializePoster'){
    callback=[changePageTotal,updatePosterinfo];
  }
  else if(type === 'pageSizeChange'){
    callback=[changePageSize,updatePosterinfo];
  }
  else if(type === 'pageNoChange'){
    callback=[changePageNo,updatePosterinfo];
  }
  return (dispatch, getState) => {
    return basicAction.getList('getList',dispatch,callback,data,type);
  }
}

export function changePageNo(data){
  return {
    type:constants.CHANGEPAGENO,
    data:data
  }
}

export function changePageSize(data){
  return {
    type:constants.CHANGEPAGESIZE,
    data:data
  }
}

export function changePageTotal(data){
  return {
    type:constants.CHANGEPAGETOTAL,
    data:data
  }
}

export function updatePosterinfo(data){
  return {
    type:constants.UPDATEPOSTERINFO,
    data:data
  }
}

export function updateDetailInfo(data){
  return {
    type:constants.UPDATEDETAILINFO,
    data:data
  }
}

export function getComment(data){
  var path = '/'+encodeURI(data.title)+'/'+encodeURI(data.date)
  return (dispatch, getState) => {
    return basicAction.getComment(path,dispatch,[updateDetailInfo],data);
  }
}

export function countCategoryData(){
  return(dispatch,getState)=>{
    return basicAction.countCategoryData('countCategoryData',dispatch,[updateCategoryData,getPostNoByDate]);
  }
}

export function updateCategoryData(data){
  return {
    type:constants.UPDATECATEGORYDATA,
    data:data
  }
}

export function getPostNoByDate(interval=7){
  return(dispatch,getState)=>{
    return basicAction.getPostNoByDate('getPostNoByDate',dispatch,[updatePostNoData],interval);
  }
}

export function updatePostNoData(data){
  return {
    type:constants.UPDATEPOSTNODATA,
    data:data
  }
}