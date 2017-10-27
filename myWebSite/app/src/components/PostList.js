import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Link } from 'react-router-dom'

class Poster extends Component {
  constructor(props){
    super(props);
    this.state={
      _id:this.props.posterInfo._id,
      title:this.props.posterInfo.title,
      author_id:this.props.posterInfo.author_id,
      category:this.props.posterInfo.category,
      content:this.props.posterInfo.content,
      author:this.props.posterInfo.author,
      createTime:this.props.posterInfo.createTime,
      read:this.props.posterInfo.visit_number,
      like:this.props.posterInfo.collect_number,
      commentNum:this.props.posterInfo.reply_number,
      contentPic:this.props.posterInfo.contentPic,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      _id:nextProps.posterInfo._id,
      title:nextProps.posterInfo.title,
      author_id:nextProps.posterInfo.author_id,
      category:nextProps.posterInfo.category,
      content:nextProps.posterInfo.content,
      author:nextProps.posterInfo.author,
      createTime:nextProps.posterInfo.createTime,
      read:nextProps.posterInfo.visit_number,
      like:nextProps.posterInfo.collect_number,
      commentNum:nextProps.posterInfo.reply_number,
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
                <img src={ this.state.author.avatar_url } alt="" />
              </a> 
              <Link className="author-name" to={ '/author_center/'+encodeURI(this.state.author_id) }>{ this.state.author.name }</Link>
              <span className="create-time">{ this.state.createTime }</span>
            </div>
            <Link className="title" to={'/detail/'+encodeURI(this.state._id) }>{ this.state.title }</Link>
            <div className="category">
              <p dangerouslySetInnerHTML={{__html: this.state.content }}></p>
            </div>
            <div className="list-bottom">
              <a target="_blank" href="/p/8f83d08c9659">
                <i className="iconfont icon-read"></i> 
                { this.state.read }&nbsp;&nbsp;
              </a>
              <a target="_blank" href="/p/8f83d08c9659#comments">
                <i className="iconfont icon-comments"></i> {this.state.commentNum }&nbsp;&nbsp;
              </a>
              <a target="_blank" href="/p/8f83d08c9659#comments">
                <i className="iconfont icon-like"></i>
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