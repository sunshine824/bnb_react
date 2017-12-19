import React, {Component} from 'react'
import {Spin} from 'antd'

import './style.less'

export default class Loading extends Component{
    render(){
        return(
            <div className="loading">
                <Spin tip="加载中..."/>
            </div>
        )
    }
}