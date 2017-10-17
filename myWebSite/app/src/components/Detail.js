import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Layout } from 'antd';

import Comment from './Comment';

import '../static/scss/detail.scss'

class Detail extends Component {

  constructor(props) {
    super(props);
      this.state={
        _id:'',
        title:'',
        content:'',
        author:{
          "avatar_url": '',
          "name": '',
        },
        createTime:'',
        read:'',
        like:'',
        commentNum:'',
        contentPic:'',
      }
  }
  componentWillMount() {
    var id = this.props.match.params.id;
    this.props.actions.GetArticleDetail(id);
    this.props.actions.GetComments(id);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.detailInfo.detailInfo != this.props.detailInfo.detailInfo) {
      let data = nextProps.detailInfo.detailInfo;
      this.setState({
        _id: data._id,
        title: data.title,
        content: data.content,
        author: data.author,
        createTime: data.create_at,
        read: data.visit_number,
        like: data.collect_number,
        commentNum: data.reply_number,
        contentPic: data.contentPic,
      });
    }
  }
  componentDidMount(){
    
  }
  render() {
    let comments = this.props.detailInfo.commentList || [];
    let addCommentStatus = this.props.detailInfo.addCommentStatus;
    if(addCommentStatus == 200) {
      alert('添加评论成功');
      window.location.reload();
    }
    return (
      <div className='container-detail'>
        <h1 className='title'>
          { this.state.title }
        </h1>
        <dl className="author-info">
          <dt>
            <a className="img-circle author-pic" href="" >
              <img src={ this.state.author.avatar_url } alt="" />
            </a> 
          </dt>
          <dd className="author-detail">
            <span className="author-name">{ this.state.author.name }</span>
            <span className="other-info">{ this.state.createTime }  字数：789  阅读：{ this.state.read }  喜欢：{ this.state.like }   评论：{ this.state.commentNum }  赞赏：5</span>
          </dd>
        </dl>
        <div className="content">
          <p dangerouslySetInnerHTML={{__html: this.state.content }}></p>
        </div>
        <div className='gap'>
          <hr/>
        </div>
        <Comment comments = { comments } articleId = { this.state._id } history={this.props.history}></Comment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { detailInfo: state.stores.detailInfo }
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
)(Detail)


