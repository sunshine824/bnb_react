import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import {getOrderList} from '@/fetch/OrderList'
import DataStat from './DataStat'
import TableData from './TableData'

import './style.less'

class OrderManage extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            orderList: ''
        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
        this._getOrderList()
    }

    //加载订单数据
    _getOrderList(status, start_time, end_time, content, page) {
        this.setState({orderList: ''})
        const result = getOrderList(status, start_time, end_time, content, page)
        result.then((res) => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                this.setState({
                    orderList: json
                })
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    render() {
        return (
            <div className="manage">
                <DataStat/>
                <TableData {...this.state} _getOrderList={this._getOrderList.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        states: state
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_path
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrderManage)