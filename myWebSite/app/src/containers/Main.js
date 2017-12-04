import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import PostList from '../components/PostList';;
import Banner from '../components/Banner';
import LeftBar from '../components/LeftBar';
import '../static/scss/main.scss';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curPage: 1,
      pageSize: 15,
      renderData: [],
      hotList: [],
      noMoreData: false
    }
    this.changePageNo = this.changePageNo.bind(this);
  }

  componentDidMount() {
    var data = {
      pageSize: this.state.pageSize,
      page: this.state.curPage
    }
    this.props.actions.GetTopicList(data);
    this.props.actions.GetBannerList();
    this.props.actions.GetHotList();
  }

  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.indexData.topicList;
    if(nextList.length > 0  && nextList != this.props.indexData.topicList) {
      var newRenderData = this.state.renderData.concat(nextList);
      this.setState({
        renderData: newRenderData
      });
    } else if (nextList.length == 0 && this.state.curPage > 1) {
      this.setState({
        noMoreData: true
      });   
    }
    if(nextProps.indexData.hotList !== this.props.indexData.hotList ) {
      this.setState({
        hotList: nextProps.indexData.hotList
      });      
    }
  }  

  changePageNo(pageNo) {
    let that = this;
    let curPage  = this.state.curPage +1;
    let data = {
      pageSize: this.state.pageSize,
      page: curPage      
    }
    that.props.actions.GetTopicList(data);
    this.setState({
      curPage: curPage
    });
  }
  render() {
    console.log('indexData:',this.props.indexData);
    var loadText = this.state.noMoreData 
                  ? <span className="no-data">没有更多数据啦~</span>
                  : <a className="more-btn" href="javascript:void(0);" onClick={ this.changePageNo } >查看更多</a>;
    console.log('this.props.topicList is ',this.props.indexData);
    return (
      <div className="container-main">
        <Banner bannerList = { this.props.indexData.bannerList } />
        <div className="container">
          <div className="container-left">
            <PostList posterInfo = { this.state.renderData }></PostList>
            <p className="load-more">{ loadText }</p>
          </div>
          <div className="container-right">
              <LeftBar hotList = { this.state.hotList } />
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


