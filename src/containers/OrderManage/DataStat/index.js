import React, {Component} from 'react'
import {Button} from 'antd'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class DataStat extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            <div className="data-stat">
                <ul>
                    <li>
                        <p className="data-title">今日入住</p>
                        <strong>8人</strong>
                        <Button href="#" type="primary">查看/办理</Button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DataStat