/** 登录和注册的地方 **/
import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import Login from '../components/Login';
import Register from '../components/Register';
import { Link } from 'react-router-dom'

import '../static/scss/loginRegister.scss';
import { browserHistory } from 'react-router';

class LoginRegister extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() { 

  }
  componentDidMount () {

  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    let type = this.props.location.pathname; // 获取当前路由 sign_in or sign_up
    let innerComponent;
    var isLoginActive = true;
    if(/sign_in/g.test(type)) {
       innerComponent = <Login></Login>
       isLoginActive = true;

    } else if(/sign_up/g.test(type)) {
       innerComponent = <Register></Register>
       isLoginActive = false;
    }
    return (
      <div className="container-login-register">
        <ul className="login-tab">
        	<li className={ isLoginActive ? "active" : " " } >
            <Link to="/sign_in">登录</Link>
          </li>
        	<li className={ isLoginActive ? " " : "active" } >
            <Link to="/sign_up">注册</Link>
          </li>
        </ul>   
        { innerComponent }  	
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
)(LoginRegister)


