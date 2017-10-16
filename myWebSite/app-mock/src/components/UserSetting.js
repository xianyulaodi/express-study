import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import '../static/scss/setting.scss'

class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName: '',
        email: '',
        introdece: '',
        userPic: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {

    this.props.actions.getPersonalInfo();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.userInfo != this.props.userInfo) {
        this.setState({
            userName: nextProps.userInfo.userInfo.userName,
            email: nextProps.userInfo.userInfo.email,
            introdece: nextProps.userInfo.userInfo.introdece,
            userPic: nextProps.userInfo.userInfo.userPic
        });
    }
  }
  handleName() {
    
  }
  handleSubmit(e) {

  }
  render() {
    return (
        <div className="container-setting">
            <from>
                <div className="ipt ipt-pic">
                    <label>头像</label>
                    <p className="pic-wrap">
                        <img src={ this.state.userPic } alt="" />
                        <input className="fileBtn" type="file" ref="userName" />
                    </p>
                </div>
                <p className="ipt">
                    <label>昵称</label>
                    <input type="text"  value={ this.state.userName } onChange={ this.handleSubmit } placeholder="请输入昵称" ref="userName" />
                </p>
                <p className="ipt">
                    <label>电子邮箱</label>
                    <input type="text" value={ this.state.email } onChange={ this.handleSubmit } placeholder="请输入邮箱" ref="userName" />
                </p>
                <p className="ipt">
                    <label>个人简介</label>
                    <textarea type="text" value={ this.state.introdece } onChange={ this.handleSubmit } placeholder="请输入个人简介" ref="userName" />
                </p>
                <a href="javascript:void(0);" onClick={ this.handleSubmit } className="submit-btn">确定</a>
            </from>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { 
    header:state.stores.header,
    userInfo:state.stores.userInfo
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
)(UserSetting)

