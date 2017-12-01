import React, { Component } from "react"
import { render } from 'react-dom'
import '../static/scss/about.scss'

export default class About extends Component {
    render() {
        return ( 
            <div className = "container-about" >
                <div className="content">关于本站的介绍</div>
            </div>
        )
    }
}