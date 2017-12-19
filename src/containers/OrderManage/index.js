import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import DataStat from './DataStat'
import TableData from './TableData'

import './style.less'

class OrderManage extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    render() {
        return (
            <div className="manage">
                <DataStat/>
                <TableData/>
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