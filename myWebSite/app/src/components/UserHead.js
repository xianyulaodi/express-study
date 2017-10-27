import React,{Component} from "react"
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import '../static/scss/userHead.scss'

class UserHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	showDrawDown: false
    }
    this.logout = this.logout.bind(this);
    this.drawDownFn = this.drawDownFn.bind(this);
  }

  componentDidMount() {
  	this.props.actions.getPersonalInfo();
  }

  drawDownFn() {
  	this.setState({
  		showDrawDown: !this.state.showDrawDown
  	})
  }

  logout() {
    this.props.actions.LogOut();
    window.location.href = "/";
  }

  render() {
  	let drawStyle = this.state.showDrawDown ? 'block' : 'none';
    const userInfo = this.props.userInfo.userInfo;
    const uid = userInfo ? userInfo.uid : 0; 
    const userPic = userInfo ? userInfo.profile_image_url : ''; 
    return (
      <header className='user-header' >
        <p className="head-img" onClick={ this.drawDownFn } >
        	<img src={ userPic } alt="" />
        </p>
        <div className="other-info" style={{display: drawStyle }} > 
	        <Link className="nav" to="/add_topic" >发文章</Link>
        	<Link className="nav" to={'/author_center/'+ encodeURI(uid) } > 我的主页 </Link>
        	<Link className="nav" to="/" > 收藏的文章 </Link>
        	<Link className="nav" to="/" > 关注的人 </Link>
        	<Link className="nav" to="/" > 我的粉丝 </Link>
        	<Link className="nav" to="/setting" > 设置 </Link>
        	<a href="javascript:void(0);" className="nav" onClick= { this.logout }  > 退出 </a>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    userInfo:state.stores.userInfo,
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
)(UserHead)


