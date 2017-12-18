import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import HouseList from './HouseList'
import RoomList from './RoomList'

import './style.less'

class RoomManage extends Component{

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    render(){
        return(
            <div className="manage">
                <HouseList/>
                <RoomList/>
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