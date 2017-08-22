import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

class Login extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="container-login">
        <form action="">
          <p className="ipt">
            <input type="text" placeholder="请输入邮箱" />
          </p>
          <p className="ipt">
            <input type="password" placeholder="请输入密码" />
          </p>
          <a href="javascript:void(0);" className="login-btn">登  录</a>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log('Login:mapStateToProps,state is ',state);
  return { login: state.stores.modalDialog }
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

