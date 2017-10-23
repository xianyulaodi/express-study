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
      sigature: '',
      updateSuccess: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
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
        userPic: nextProps.userInfo.userInfo.profile_image_url,
        sigature: nextProps.userInfo.userInfo.sigature
      });
    }
    if(nextProps.userInfo.newHeadPic && nextProps.userInfo.newHeadPic != this.props.newHeadPic) { 
      this.setState({
        userPic: nextProps.userInfo.newHeadPic
      });
    }
    if(nextProps.userInfo.updateSuccess != this.props.updateSuccess ) { 
      this.setState({
        updateSuccess: nextProps.userInfo.updateSuccess
      });
    }    
  }
  uploadPic(e) {
    let file = e.target.files[0]
    this.props.actions.uploadPic(file);
  }
  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});    
  }
  handleSubmit(e) {
    var data = {
      userName: this.state.userName,
      email: this.state.email,
      introdece: this.state.introdece,
      sigature: this.state.sigature      
    }
    this.props.actions.setPersonalInfo(data);
  }
  render() {
    // if(this.state.updateSuccess) {
    //   alert('更新个人信息成功');
    // }
    return (
      <div className="container-setting">
        <from>
          <div className="ipt ipt-pic">
            <label>头像</label>
            <p className="pic-wrap">
              <img src={ this.state.userPic } alt="" />
              <input className="fileBtn" type="file" name="file" onChange={ this.uploadPic } />
            </p>
          </div>
          <p className="ipt">
            <label>昵称</label>
            <input type="text"  value={ this.state.userName } onChange={ this.handleInput } placeholder="请输入昵称" name="userName" />
          </p>
          <p className="ipt">
            <label>电子邮箱</label>
            <input type="text" value={ this.state.email } onChange={ this.handleInput } placeholder="请输入邮箱" name="email" />
          </p>
          <p className="ipt">
            <label>个性签名</label>
            <input type="text" value={ this.state.sigature } onChange={ this.handleInput } placeholder="请输入个性签名" name="sigature" />
          </p>          
          <p className="ipt">
            <label>个人简介</label>
            <textarea type="text" value={ this.state.introdece } onChange={ this.handleInput } placeholder="请输入个人简介" name="introdece" />
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

