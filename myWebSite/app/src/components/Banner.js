import React,{Component} from "react"
import {render} from 'react-dom'

import '../static/scss/header.scss'

class Banner extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    const bannerList = this.props.bannerList || [];
    return (
        <div className="banner-container" >
          {
            bannerList.map((item,index) => {
              return (
                <img key={index} src={item.picUrl} />
              )
            })
          }
        </div>
    );
  }
}

export default Banner;


