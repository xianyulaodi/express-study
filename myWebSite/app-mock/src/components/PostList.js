import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Link } from 'react-router-dom'

class Poster extends Component{
  constructor(props){
    super(props);
    this.state={
      _id:this.props.posterInfo._id,
      title:this.props.posterInfo.title,
      category:this.props.posterInfo.category,
      content:this.props.posterInfo.content,
      authorInfo:this.props.posterInfo.authorInfo,
      createTime:this.props.posterInfo.createTime,
      read:this.props.posterInfo.read,
      like:this.props.posterInfo.like,
      commentNum:this.props.posterInfo.commentNum,
      contentPic:this.props.posterInfo.contentPic,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      _id:nextProps.posterInfo._id,
      title:nextProps.posterInfo.title,
      category:nextProps.posterInfo.category,
      content:nextProps.posterInfo.content,
      authorInfo:nextProps.posterInfo.authorInfo,
      createTime:nextProps.posterInfo.createTime,
      read:nextProps.posterInfo.read,
      like:nextProps.posterInfo.like,
      commentNum:nextProps.posterInfo.commentNum,
      contentPic:nextProps.posterInfo.contentPic,
    });
  }
  render(){

    var content;
    if(this.state.content.length > 80)
      content = this.state.content.substr(0,80)+'...';
    else
      content = this.state.content;
    return(
      <div className="post-list" >
        <dl className="list-item" >
          <dt className="col-left">
            <div className="author-info">
              <a className="author-pic img-circle" href="#">
                <img src={ this.state.authorInfo.authorPic } alt="" />
              </a> 
              <Link className="author-name" to={ '/author_center/'+encodeURI(this.state.authorInfo.authorId) }>{ this.state.authorInfo.name }</Link>
              <span className="create-time">{ this.state.createTime }</span>
            </div>
            <Link className="title" to={'/detail/'+encodeURI(this.state._id) }>{ this.state.title }</Link>
            <p className="category">{ this.state.content }</p>
            <div className="list-bottom">
              <a target="_blank" href="/p/8f83d08c9659">
                已读：<i className="iconfont ic-list-read"></i> 
                { this.state.read }&nbsp;&nbsp;
              </a>
              <a target="_blank" href="/p/8f83d08c9659#comments">
                评论数：<i className="iconfont ic-list-comments"></i> {this.state.commentNum }&nbsp;&nbsp;
              </a>
              <a target="_blank" href="/p/8f83d08c9659#comments">
                喜欢：<i className="iconfont ic-list-like"></i>
                {this.state.like }
              </a>
            </div>
          </dt>
          <dd className="col-right">
            <img className="img-round" src={ this.state.contentPic } alt="" />
          </dd>
        </dl>
      </div>
    )
  }
}

class PostList extends Component {
  constructor(props){
    super(props);
    this.state={
      posterInfo:this.props.posterInfo,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      posterInfo:nextProps.posterInfo,
    });
  }
	render() {
    var data = this.props.posterInfo || [];
    var len = data.length;
    if(len > 0) {

      return(
        <div>
        {
          data.map((item,index) => {
            return (
              <Poster key={ index } posterInfo={ item } ></Poster>
            )
          })
        }
        </div>
      )
    
    } else {

      return(<div>没有找到任何新闻</div> )

    }
	}
}

export default PostList;