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
                stat_data: json
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {stat_data} = this.state

        const renderLi = () => {
            const res=[]
            for(let k in stat_data.data){
                res.push(
                    <li>
                        <div className="box">
                            <p className="data-title">{stat_data.data[k].title}</p>
                            <strong>{stat_data.data[k].content}人</strong>
                            <Button href="#" type="primary"
                                    className={stat_data.data[k].status === 1 ? '' : 'hide'}>查看/办理</Button>
                        </div>
                    </li>
                )
            }
            return res
        }

        return (
            <div className="data-stat">
                <ul>
                    {
                        stat_data ?
                            !stat_data.status ?
                                renderLi()
                                : '暂无统计'
                            : ''
                    }
                </ul>
            </div>
        )
    }
}

export default DataStat