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
  }
  componentDidMount(){
    
  }
  handleChange() {
    let value = this.refs.editor.value;
    this.setState({
      markdownText: value
    });
  }
  render() { 
    var articleContent = document.getElementById('articleContent') ? document.getElementById('articleContent').innerHTML : '';
    let content = articleContent;
    return (
      <div className="container-add">
        <TopicHeader content = { content } />       
        <textarea className = "content-input" 
          placeholder = "请输入文章内容,markdown 语法" 
          ref = "editor"
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

