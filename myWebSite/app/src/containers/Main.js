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
  }
  componentDidMount() {
    var data = 'currentPage=1&pageSize=10';
    this.props.actions.GetTopicList();
    this.props.actions.GetBannerList();
  }
  render() {
    console.log('this.props.posterInfo is ',this.props.indexData);
    console.log('this.props.topicList is ',this.props.indexData.topicList);
    return (
      <div className="container-main">
        <Banner bannerList = { this.props.indexData.bannerList } />
        <div className="container">
          <div className="container-left">
            <PostList posterInfo = { this.props.indexData.topicList }></PostList>
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


