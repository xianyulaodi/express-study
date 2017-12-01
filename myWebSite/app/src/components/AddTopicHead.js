import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import UserHead from './UserHead'
import * as actions from '../actions/index'
import { Link,Route,Redirect } from 'react-router-dom'

class TopicHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDraw: false,
      typeList: [
        { value:"javascript", tabId: 1 },
        { value:"html", tabId: 2 },
        { value:"css", tabId: 3 },
        { value:"node", tabId: 4 },
      ],
      currentTab: 1,
      type: 'javascript',
      userPic: '',
      uid: ''
    }
    this.drawFn = this.drawFn.bind(this);
    this.choiceType = this.choiceType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.actions.getPersonalInfo();  // 这里到时候读cookie，不用一直发请求
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { 
    if(nextProps.userInfo.userInfo != this.props.userInfo.userInfo) {
      this.setState({
        userPic: nextProps.userInfo.userInfo.profile_image_url,
        uid: nextProps.userInfo.userInfo.uid
      })
    }
  }  

  drawFn() {
    this.setState({
      showDraw: !this.state.showDraw
    });
  }

  choiceType(tabId,value) {
    this.setState({
      currentTab: tabId,
      type: value
    }); 
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = this.refs.title.value;
    const type = this.state.type;
    const content = this.props.content;
    const realAuthor = this.refs.realAuthor.value || '';
    if(title == '') {
      alert('文章标题不能为空');
      return false;
    }
    if(content == '') {
      alert('文章内容不能为空');
      return false;
    }    
    const data = {
      title: title,
      content: content,
      type: type,
      realAuthor: realAuthor  //用于有些文字是转载的情况
    }
    
    this.props.actions.SubmitData('addNewTopic',data);
  }

  render() {
    if(this.props.newTopic.newTopicStatus == 200) {
      if(window.confirm('发布成功，是否跳转到首页')) {
        return <Redirect push to="/" />
      }
    }    
    const drawStyle = this.state.showDraw ? 'block' : 'none';
    const that = this;
    return (
      <header className='add-topic-head' >
        <div className="head-l">
          <input type="text" ref = "title" placeholder="输入文章标题" />
        </div>
        <div className="head-r">
          <div className="topic-user-head">
            <UserHead />            
          </div>
          <a href="javascript:void(0);" className="publish-btn" onClick={ this.drawFn }>发布</a>
          <div className="draw-down" style={{ display: drawStyle }} >
            <div className="draw-inner">
              <h3>文章分类</h3>
              <ul className="type-list">
                {
                  that.state.typeList.map((item,key) => {
                    let style = that.state.currentTab == item.tabId ? 'active' : '';
                    return <li className={ style } key={ key } onClick={ that.choiceType.bind(that,item.tabId,item.value) }>{ item.value }</li>
                  })
                }
              </ul>
              <input type="text" className="real-author" ref="realAuthor" placeholder="请输入作者名字; 可选" />
              <a href="javascript:void(0);" className="submit-btn" onClick={ this.handleSubmit } >确认发布</a>              
            </div>
          </div>            
        </div>
      </header>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo:state.stores.userInfo,
    newTopic: state.stores.newTopic
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
)(TopicHead)


