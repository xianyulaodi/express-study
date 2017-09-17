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
        userInfo: {
            fans: "",
            focus: "",
            introdece: "",
            name: "",
            sigature: "",
            userPic: ""
        },
        articleList:[],
        isFocus: false

    }
    this.focusFn = this.focusFn.bind(this);
  }

  componentDidMount() {
    var authorId = this.props.match.params.authorId;
    this.props.actions.getAuthorDetail(authorId);
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.authorCenter.data != this.props.authorCenter.data) {
      let data = nextProps.authorCenter.data;
      this.setState({
        userInfo: data.userInfo,
        articleList: data.articleList
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
    if( that.props.header.isLogin ) {
        if( this.state.isFocus ) {
            alert('已关注');
            return
        }
        var authorId = this.props.match.params.authorId;
        this.props.actions.focus(authorId);
    } else {
      alert('请先登录');
    }   
  }

  render() {
    return (
      <div className="container-user">
        <div className="col-l">
            <header className="header">
              <p className="user-pic">
    			<img src="http://upload.jianshu.io/users/upload_avatars/3343569/65efd19a-8a5a-47d3-bfd3-c7cee81b280e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240" alt="" />
              </p>
              <div className="user-detail">
                <h2 className="user-name">{ this.state.userInfo.name }</h2>
                <ul className="other-info">
                    <li>
                        <span>{ this.state.userInfo.focus }</span>
                        <span>关注</span>
                    </li>
                    <li>
                        <span>{ this.state.userInfo.fans }</span>
                        <span>粉丝</span>
                    </li>
                    <li>
                        <span>44</span>
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
             <p>{ this.state.userInfo.introdece }</p>
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


