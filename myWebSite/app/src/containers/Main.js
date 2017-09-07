import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import PostList from '../components/PostList';
import Page from '../components/Page';
import Banner from '../components/Banner';

import '../static/scss/main.scss';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 15,
      renderData: [],
      isNoData: false
    }
    this.changePageNo = this.changePageNo.bind(this);
  }
  componentDidMount() {
    var data = {
      pageSize: this.state.pageSize,
      pageNo: this.state.currentPage
    }
    this.props.actions.GetTopicList(data);
    this.props.actions.GetBannerList();
  }
  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.indexData.topicList;
    if(nextList.length > 0  && nextList != this.props.indexData.topicList) {

      var newRenderData = this.state.renderData.concat(nextList);
      this.setState({
        renderData: newRenderData
      });

    } else if (nextList.length == 0 && this.currentPage > 1) {

      this.setState({
        isNoData: true
      });   

    }
  }  

  changePageNo(pageNo) {
    let that = this,
        currentPage  = this.state.currentPage;
    currentPage +=1;
    const data = {
      pageSize: this.state.pageSize,
      pageNo: this.state.currentPage      
    }
    that.props.actions.GetTopicList(data);
    this.setState({
      currentPage: currentPage
    });
  }
  render() {
    var loadText = this.props.indexData.noMoreData 
                  ? <span>没有更多数据啦</span>
                  : <a href="javascript:void(0);" onClick={ this.changePageNo } >点击查看更多</a>;
    // console.log('this.props.topicList is ',this.props.indexData.topicList);
    return (
      <div className="container-main">
        <Banner bannerList = { this.props.indexData.bannerList } />
        <div className="container">
          <div className="container-left">
            <PostList posterInfo = { this.state.renderData }></PostList>
            { loadText }
          </div>
          <div className="container-right">
              内容左侧,内容待定
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    /**
     * [value]:state.stores.indexData 这里跟reducer/index.js的返回值对应
     * [key]: indexData 跟页面上的this.props.indexData中的indexData 对应，可替换成其他词语
     */
    return {
      indexData: state.stores.indexData  
    }
}
const mapDispatchToProps = (dispatch) => {
    //console.log('Main.js mapDispatchToProps');
    return {
      actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)


