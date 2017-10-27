import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
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
    const email = this.refs.email.value,
          password = this.refs.password.value;
    if(email == '') {
      alert('邮箱不能为空');
      return false;
    }
    if(password == '') {
      alert('密码不能为空');
      return false;
    }
    var data = {
      email: email,
      password: password
    }
     this.props.actions.SubmitData('login',data);

  }
  render() {
    if(this.props.header.isLogin) {
      window.location.href = '/'
      // window.location.reload();
      // return <Redirect push to="/" />
    }
    return (
      <div className="container-login">
        <form action="">
          <p className="ipt">
            <input type="text" placeholder="请输入邮箱" ref="email" />
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
  return { 
    header:state.stores.header
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

