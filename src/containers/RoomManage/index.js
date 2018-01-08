import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import {getRoomListData} from '@/fetch/RoomList'
import {getHouseListData} from '@/fetch/HouseList'
import HouseList from './HouseList'
import RoomList from './RoomList'

import './style.less'

class RoomManage extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            roomList: '',
            houseList: ''
        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
        this._getRoomList()
        this._getHouseList()
    }

    //获取房间列表
    _getRoomList() {
        const result = getRoomListData()
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                roomList: json
            })
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 获取房型列表
     * @private
     */
    _getHouseList() {
        const result = getHouseListData()
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                houseList: json
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    render() {
        return (
            <div className="manage">
                <HouseList {...this.state} _getRoomList={this._getRoomList.bind(this)}
                           _getHouseList={this._getHouseList.bind(this)}/>
                <RoomList {...this.state} _getRoomList={this._getRoomList.bind(this)}
                          _getHouseList={this._getHouseList.bind(this)}/>
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(RoomManage))