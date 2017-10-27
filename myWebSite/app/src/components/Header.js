import React,{ Component } from "react"
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserHead from './UserHead'
import * as actions from '../actions/index'
import { Link,Route,Redirect } from 'react-router-dom'
import '../static/scss/header.scss'

class PostHeader extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() { 
    this.props.actions.CheckIsLogin();
  }

  componentDidMount() {
    
  }
  
  render() {
    const isLogin = this.props.header.isLogin;
    let loginTemp = <div className="login">
                      <Link to="/sign_in" >登录</Link>
                      <Link to="/sign_up">注册</Link>
                      <Link to="/sign_in" >发文章</Link>
                    </div>;    
    if(isLogin) {
      loginTemp = <UserHead />;
    }
    return (
        <header className='post_header' >
          <div className="header-inner">
            <a className="logo" href="javascript:void(0);"></a>
            <nav className='nav-bar'>
              <Link className="nav" to="/" >首页</Link>
              <Link className="nav" to="/" > css </Link>
              <Link className="nav" to="/" > javascript </Link>
              <Link className="nav" to="/" > node </Link>
              <Link className="nav" to="/" > webpack </Link>
            </nav>
            <div className='user-login-wrap'>
              { loginTemp } 
            </div>            
          </div>
        </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    header: state.stores.header
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
)(PostHeader)


