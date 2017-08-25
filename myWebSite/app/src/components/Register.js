import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

// import '../static/scss/modalDialog.scss';

import SERVERADDRESS from '../constants'

import { Form, Icon, Input, Button,Col,Row } from 'antd';
const FormItem = Form.Item;

class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      passwordDirty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.checkConfirm()) {
      var data = {
        userName: this.this.refs.userName.value,
        email: this.this.refs.email.value,
        password: this.this.refs.password.value,
      };
      this.props.actions.SubmitData('register',data);
    }
  }

  checkConfirm() {
    // 这里到时候要查询用户名是否重复 
    const userName = this.refs.userName.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const repaddword = this.refs.repaddword.value;
    if( userName == "" ) {
      alert('用户名不能为空');
      return false;
    } else if ( email == "" ) {
      alert('邮箱不能为空');
      return false;
    } else if ( password == "" || password !== repaddword  ) {
      alert('密码不能为空，且两次输入的密码要一致');
      return false;
    }
    return true;
  }

  render() {

    return (
      <div className="container-login">
        <form action="">
          <p className="ipt">
            <input type="text" placeholder="请输入用户名" ref="userName" />
          </p>          
          <p className="ipt">
            <input type="text" placeholder="请输入邮箱" ref="email" />
          </p>
          <p className="ipt">
            <input type="password" placeholder="请输入密码" ref="password" />
          </p>
          <p className="ipt">
            <input type="password" placeholder="请再次输入密码" ref="repaddword" />
          </p>            
          <a href="javascript:void(0);" onClick = { this.handleSubmit } className="login-btn">注 册</a>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps,state is ',state);
    return { register: state.stores.modalDialog }
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
)(Register)

