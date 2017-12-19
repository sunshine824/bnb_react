import React, {Component} from 'react'
import {Button} from 'antd'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getStatistics} from '@/fetch/Statistics'

import './style.less'

class DataStat extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            stat_data: {}
        }
    }

    componentDidMount() {
        this._getStatistics()
    }

    _getStatistics() {
        const result = getStatistics()
        result.then((res) => {
            return res.json()
        }).then(json => {
            this.setState({
                stat_data: json.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {stat_data} = this.state

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