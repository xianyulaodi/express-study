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
              <img src={ this.props.item.replyerInfo.replyerPic } alt="" />
            </a> 
          </dt>
          <dd className="replyer-detail">
            <span className="replyer-name">{ this.props.item.replyerInfo.name }</span>
            <span className="other-info">1楼  { this.props.item.createTime }</span>
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
    /**
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if(that.props.userInfo.userInfo!==null&&that.props.userInfo.userInfo!==undefined){
         const data = 'articleId='+that.props.articleId+'&comment='+values.comment+'&user='+that.props.userInfo.userInfo.username;
         that.props.actions.SubmitData('submitComment',data,that.props.history);
      }
      else{
        message.warning('未登录不能发表评论，请先登录');
        return;
      }
      //console.log('Comment handleSubmit values of form: ', values);
    });**/
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
            <textarea placeholder="评论内容" name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div className="ovh mb20">
          <input type="button" value="提交评论" className="btn login-form-button" />
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
   //console.log('Login:mapStateToProps,state is ',state);
    return { userInfo: state.stores.userInfo }
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
)(Comment)
