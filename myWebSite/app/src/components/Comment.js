import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

class CommentItem extends Component{

  constructor(props) {
    super(props);
    this.state={
      
    }
    this.delComment = this.delComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  delComment(commentId) {

    this.props.delComment(commentId);
  }

  render() {
    let delBtn = this.props.uid == this.props.item.replyer_id 
                 ? <a href="javascript:void(0);" onClick = { this.delComment.bind(this,this.props.item._id) } className="del-comment">删除</a>
                 : '';
    let isAuthor = this.props.uid == this.props.item.author_id 
                ? <i>作者</i>
                : '';
    return(
      <div className="comment-item" >
        <dl className="replyer-info">
          <dt>
            <a className="img-circle replyer-pic" href="#">
              <img src={ this.props.item.replyer.avatar_url } alt="" />
            </a> 
          </dt>
          <dd className="replyer-detail">
            <span className="replyer-name">{ this.props.item.replyer.name } { isAuthor }</span>
            <span className="other-info">{ this.props.rank }楼  { this.props.item.create_at }</span>
            { delBtn }            
          </dd>
        </dl>
        <article className="conment-text">
            { this.props.item.content }
        </article>
        {/** 评论回复框,这里待定 **/}
        <div className="reply-comment-wrap">
            <ul>
              <li>张三回复: 不错，挺好的</li>
            </ul>
            <input type="text" placeholder="请输入回复内容" /><span className="replyer-btn">提交</span>
        </div>
      </div>
    )
  }
}

class Comment extends Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delComment = this.delComment.bind(this);
   
  }

  componentWillMount() {
    if( this.props.delCommentStatus ) {
      alert('删除评论成功');
    }
  }

  delComment(commentId) {
    const data = { replyId: commentId };
    this.props.actions.delComment(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    if(this.props.header.isLogin) {
      const commentContent = this.refs.commentIpt.value,
            articleId = this.props.articleId,  
            authorId = this.props.authorId,     
            data = {
                content: commentContent,
                articleId: articleId,
                authorId: authorId
            };
      if(commentContent == '') {
          alert('评论内容不能为空');
          return false;
      }
      that.props.actions.SubmitData('addCommentByArticleId',data);
    } else {
      alert('请先登录');
    }   
  }

  render() {
    const comments = this.props.comments;
    const uid = this.props.header.uid; 
    const that = this;
    const userPic = this.props.userInfo.userInfo ? this.props.userInfo.userInfo.profile_image_url : '';
    // console.log('userInfo',this.props.userInfo);
    return (
      <div className="container-comment">
        <div className="comment-wrap" >
          <a className="img-circle user-head" href="#">
            <img src={ userPic } alt="" />
          </a>
          <div className="comment-ipt">
            <textarea placeholder="评论内容" ref="commentIpt" name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div className="ovh mb20">
          <input type="button" value="提交评论" onClick={ this.handleSubmit } className="btn login-form-button" />
        </div>
        <div className='gap'>
          <hr/>
        </div> 
        <div className="comment-list">
           {
            comments.map((item,index) => {
              return ( <CommentItem key={ index } rank = { index + 1 } item={ item } uid ={ uid } delComment = { this.delComment.bind(that) } /> )
            })
           }
        </div>         
      </div>
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
)(Comment)

