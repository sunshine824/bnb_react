import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import HouseList from './HouseList'
import RoomList from './RoomList'
import ModelRoom from './Model/ModelRoom'

import './style.less'

class RoomManage extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {

        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }


    render() {
        return (
            <div className="manage">
                <HouseList/>
                <RoomList/>
                <ModelRoom/>
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

export default connect(mapStateToProps, mapActionsToProps)(RoomManage)