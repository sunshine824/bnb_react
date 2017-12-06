import React, {Component} from 'react'
import {testData} from '../../fetch/test'

import './style.less'

export default class Home extends Component {
    constructor() {
        super()
    }

    componentDidMount(){
        const result=testData('494a4b33584f3652355a686e7957344a4e48535578413d3d0a')
        result.then((res)=>{
            return res.json()
        }).then(json=>{
            console.log(json)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    render(){
        return(
            <div className="test">
                <div className="title">首页</div>
            </div>
        )
    }
}