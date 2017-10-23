import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import PostList from '../components/PostList';
import '../static/scss/authorCenter.scss';

class authorCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorInfo: {
        fansNum: "",
        foucsNum: "",
        introdece: "",
        userName: "",
        sigature: "",
        profile_image_url: ""
      },
      articleList:[],
      isFocus: false,
      articleNum: 0,
      // isUserAuthor: false  //判断用户是不是就是该作者

    }
    this.focusFn = this.focusFn.bind(this);
    this.focus = this.focus.bind(this);
    this.unFocus = this.unFocus.bind(this);
  }

  componentDidMount() {
    var authorId = this.props.match.params.authorId;
    this.props.actions.getAuthorDetail(authorId);
    this.props.actions.isFocus(authorId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.authorCenter.data != this.props.authorCenter.data) {
      let data = nextProps.authorCenter.data;
      this.setState({
        authorInfo: data.authorInfo,
        articleList: data.list,
        articleNum: data.list.length
      });
    }
    if(nextProps.authorCenter.isFocus != this.props.authorCenter.isFocus) {
      this.setState({
        isFocus: nextProps.authorCenter.isFocus
      });
    }
  }  
  focusFn(e) {
    e.preventDefault();
    const that = this;
    const authorId = this.props.match.params.authorId;
    if( that.props.header.isLogin ) {
      if( this.state.isFocus ) {
        that.unFocus(authorId);
        return false;
      }
      that.focus(authorId);
    } else {
      alert('请先登录');
    }   
  }
  focus(authorId) {
    this.props.actions.focus(authorId);
  }
  unFocus(authorId) {
    this.props.actions.unFocus(authorId);
  }
  render() {
    return (
      <div className="container-user">
        <div className="col-l">
          <header className="header">
            <p className="user-pic">
  			      <img src={ this.state.authorInfo.profile_image_url } alt="" />
            </p>
            <div className="user-detail">
              <h2 className="user-name">{ this.state.authorInfo.userName }</h2>
              <ul className="other-info">
                <li>
                  <span>{ this.state.authorInfo.foucsNum }</span>
                  <span>关注</span>
                </li>
                <li>
                  <span>{ this.state.authorInfo.fansNum }</span>
                  <span>粉丝</span>
                </li>
                <li>
                  <span>{ this.state.articleNum }</span>
                  <span>文章</span>
                </li>
              </ul>
            </div>
            <p className="focusBtn" onClick={ this.focusFn }>{ this.state.isFocus ? '已关注' : '关注' }</p>
          </header>
            <div className="article-list">
    			    <PostList posterInfo = { this.state.articleList }></PostList>
            </div>
        </div>
        <div className="col-r">
          <h4>个人介绍</h4>
          <p>{ this.state.authorInfo.sigature }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      authorCenter: state.stores.authorCenter,
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
)(authorCenter)


