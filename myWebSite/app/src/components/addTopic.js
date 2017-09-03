import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import ReactMarkdown from 'react-markdown';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import '../static/scss/addTopic.scss';

class addTopic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      markdownText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    
  }
  handleSubmit(e){
    e.preventDefault();
    let title = this.refs.title.value;
    let content = document.getElementById('articleContent').innerHTML;
    const data = {
      title: title,
      content: content
    }
    if(title == '') {
      alert('文章标题不能为空');
      return false;
    }
    if(content == '') {
      alert('文章内容不能为空');
      return false;
    }
    this.props.actions.SubmitData('addNewTopic',data);
    
  }
  handleChange() {
    let value = this.refs.editor.value;
    this.setState({
      markdownText: value
    });
  }
  render() { 
    console.log()
    if(this.props.newTopic.newTopicStatus == 200) {
      if(window.confirm('发布成功，是否跳转到首页')) {
        window.location.href = '/'; //这里需要改为路由跳转的方式，待定
      }
      
    }
    return (
      <div className="container-add">
        <div className="col-l">
          <input type = "input" 
            placeholder = "请输入文章标题"  className="title-input"
            ref = "title"
          />
          <textarea className = "content-input" 
            placeholder = "请输入文章内容,markdown 语法" 
            ref = "editor"
            onChange = { this.handleChange }
          >
          </textarea>  
          <input type="button" value="提交" className="btn-submit" onClick = { this.handleSubmit } />
        </div> 
        <div className="col-r" id="articleContent">
          <ReactMarkdown source={ this.state.markdownText } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
   //console.log('Login:mapStateToProps,state is ',state);
    return { newTopic: state.stores.newTopic }
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

