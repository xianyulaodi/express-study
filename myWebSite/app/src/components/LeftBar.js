import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/index'

class LeftBar extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    
  }
  handleSubmit(e) {

  }
  render() {
    return (
      <div className="container-leftBar">
        <ul className="left-bar">
          <li>最新</li>
          <li>最热</li>
          <li>评论</li>
        </ul>
        <div className="hot-list">
          <a href="javascript:void(0);" >这个热门文章哦</a>
          <a href="javascript:void(0);" >这个热门文章哦</a>
          <a href="javascript:void(0);" >这个热门文章哦</a>
          <a href="javascript:void(0);" >这个热门文章哦</a>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { 
    header:state.stores.header
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
)(LeftBar)

