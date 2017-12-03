import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { bindActionCreators } from 'redux'
import TopicHeader from './AddTopicHead'
import * as actions from '../actions/index'
import '../static/scss/addTopic.scss';

class addTopic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      markdownText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
  }
  componentDidMount(){
    this.uploadPic();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.newTopic);
    if(nextProps.newTopic.picUrl != this.props.newTopic.picUrl) {
      let picUrl = nextProps.newTopic.picUrl;
      let markdownPicText = `![](${picUrl})`;
      let markdownText = this.state.markdownText + markdownPicText;
      this.setState({
        markdownText: markdownText
      });
    }
  }

  handleChange() {
    let value = this.refs.editor.value;
    this.setState({
      markdownText: value
    });
  }
  uploadPic() {
    let $ipt=document.getElementById('ipt');
    let that = this;
    $ipt.ondragover=function (e){
     e.preventDefault();
    }
    $ipt.ondrop=function (e){
     e.preventDefault();
     let file = e.dataTransfer.files[0];//获取到第一个上传的文件对象
     that.props.actions.uploadPic(file);
    }
  }
  render() { 
    let articleContent = document.getElementById('articleContent') ? document.getElementById('articleContent').innerHTML : '';
    let content = articleContent;
    return (
      <div className="container-add">
        <TopicHeader content = { content } />       
        <textarea className = "content-input" 
          id="ipt"
          placeholder = "请输入文章内容,markdown 语法" 
          ref = "editor"
          value={ this.state.markdownText }
          onChange = { this.handleChange }
        >
        </textarea>   
        <div className="toggle-view" id="articleContent">
          <ReactMarkdown source={ this.state.markdownText } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
   //console.log('Login:mapStateToProps,state is ',state);
    return { 
        newTopic: state.stores.newTopic
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
)(addTopic)

