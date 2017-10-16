import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/index'

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    
  }
  handleSubmit(e) {
    e.preventDefault();
    const userName = this.refs.userName.value,
          password = this.refs.password.value;
    if(userName == '') {
      alert('用户名不能为空');
      return false;
    }
    if(password == '') {
      alert('密码不能为空');
      return false;
    }
    var data = {
      userName: userName,
      password: password
    }
     this.props.actions.SubmitData('login',data);

  }
  render() {
    if(this.props.header.isLogin) {
      window.location.href = '/'; //这里需要改为路由跳转的方式，待定
    }
    return (
      <div className="container-login">
        <form action="">
          <p className="ipt">
            <input type="text" placeholder="请输入邮箱" ref="userName" />
          </p>
          <p className="ipt">
            <input type="password" placeholder="请输入密码" ref="password" />
          </p>
          <a href="javascript:void(0);" onClick={ this.handleSubmit } className="login-btn">登  录</a>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log('Login:mapStateToProps,state is ',state);
  return { 
    header:state.stores.header
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
)(Login)

