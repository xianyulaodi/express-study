import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

class CommentItem extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }
  componentWillReceiveProps(nextProps){
  
  }
  render(){
    
    return(
      <div className="comment-item" >
        <dl className="replyer-info">
          <dt>
            <a className="img-circle replyer-pic" href="#">
              <img src={ this.props.item.replyer.avatar_url } alt="" />
            </a> 
          </dt>
          <dd className="replyer-detail">
            <span className="replyer-name">{ this.props.item.replyer.name }</span>
            <span className="other-info">1楼  { this.props.item.create_at }</span>
          </dd>
        </dl>
        <article className="conment-text">
            { this.props.item.content }
        </article>
      </div>
    )
  }
}

class Comment extends Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    if( that.props.header.isLogin ) {
        const   commentContent = this.refs.commentIpt.value,
                articleId = this.props.articleId,       
                data = {
                    content: commentContent,
                    articleId: articleId
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
    let comments = this.props.comments;
    return (
      <div className="container-comment">
        <div className="comment-wrap" >
          <a className="img-circle user-head" href="#">
            <img src="https://dummyimage.com/96x96/46ebbf/1d1d1d" alt="" />
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
              return ( <CommentItem key={ index } item={ item } /> )
            })
           }
        </div>         
      </div>
    );
  }
}

const mapStateToProps = (state) => {

    return { header: state.stores.header }
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

