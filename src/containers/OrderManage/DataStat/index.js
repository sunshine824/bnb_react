import React, {Component} from 'react'
//import {Button} from 'antd'
//import {connect} from 'react-redux'
import {save_status} from '@/redux/actions'
//import {bindActionCreators} from 'redux'
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

    /*onChangeStatus(e) {
        const {actions} = this.props
        actions.save_status(e.target.value)
    }*/

    render() {
        const {stat_data} = this.state

        const renderLi = () => {
            const res = []
            for (let k in stat_data.data) {
                res.push(
                    <li key={k}>
                        <div className="box">
                            <p className="data-title">{stat_data.data[k].title}</p>
                            <strong>{stat_data.data[k].content}人</strong>
                            {/*<Button value={parseInt(k) + 1} type="primary"
                                    className={stat_data.data[k].status === 1 ? '' : 'hide'}
                                    onClick={this.onChangeStatus.bind(this)}>查看/办理</Button>*/}
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

/*function mapStateToProps(state) {
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_status
        }, dispatch)
    }
}*/

export default DataStat