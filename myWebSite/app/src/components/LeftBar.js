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
        <div className="ad-list">
          <p className="img-wrap">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509525793&di=5da9934b6c1ea1a73c430d366551fec8&imgtype=jpg&er=1&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F19%2F57%2F16pic_1957628_b.jpg" alt="" />
          </p>
          <p className="img-wrap">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509525793&di=5da9934b6c1ea1a73c430d366551fec8&imgtype=jpg&er=1&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F19%2F57%2F16pic_1957628_b.jpg" alt="" />
          </p>          
        </div>
        <div className="hot-list">
          <h2 className="hot-title">热门文章</h2>
          <a href="javascript:void(0);" >JavaScript专题系列20篇正式完结！</a>
          <a href="javascript:void(0);" >如何通过饿了么 Node.js 面试</a>
          <a href="javascript:void(0);" >Rem布局的原理解析</a>
          <a href="javascript:void(0);" >浅谈Web图像优化</a>
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

