import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import { Link,Route,Redirect } from 'react-router-dom'

import '../static/scss/header.scss'

class PostHeader extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  componentDidMount(){
    this.props.actions.CheckIsLogin();
  }
  logout(){
    this.props.actions.LogOut();
  }

  render() {
  	let isLogin;
  	console.log('Header.js this.props is ',this.props)
  	if(this.props.header.isLogin) {
      if(this.props.userInfo.userInfo) {
  		  isLogin = <div className='hadlogin login'>
                    <span>欢迎您，{ this.props.userInfo.userInfo.userName }  </span>
                    <Link className="label_login" to="/add_topic" >发文章</Link>
                    <Link  to="/setting" >设置</Link>
                    <a href='javascript:void(0);' className ='logout' onClick={ this.logout }>退出</a>
                  </div>;
      }
    } else {
  		isLogin = <div className="login">\
                  <Link className="label_login" to="/sign_in" >登录</Link>\
                  <Link className="label_register" to="/sign_up">注册</Link>\
                  <Link className="label_login" to="/sign_in" >发文章</Link>\
                </div>;
    }
    return (
        <header className='post_header' >
        	<div className='title'>
	        	<Link className="logo" to="/" >首页</Link>
	        </div>
        	<div className='user_login'>
        		{ isLogin }
        	</div>
        </header>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('Header.js mapStateToProps,state is ',state);
    return {
      header:state.stores.header,
      userInfo:state.stores.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
  //console.log('mapDispatchToProps');
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeader)


