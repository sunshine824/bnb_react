import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getRoomListData, editRoomInfo} from '@/fetch/RoomList'
import Loading from '@/components/Loading'
import ModelRoom from '../Model/ModelRoom'

import './style.less'

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            roomList: '',
            id: '',
            roomEditVisible: false,
            roomInfo: ''
        }
    }

    componentDidMount() {
        this._getRoomList()
    }

    _getRoomList() {
        const result = getRoomListData()
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                roomList: json
            })
        }).catch(err => {

        })
    }

    onChangeEditRoom(visible) {
        this.setState({
            roomEditVisible: visible
        })
    }

    editRoom(id) {
        const result = editRoomInfo(id)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                this.setState({
                    roomEditVisible: true,
                    id:id,
                    roomInfo: json
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    deteleRoomInfo(k) {
        const {roomInfo} = this.state
        roomInfo.data.channels.splice(k, 1)
        this.setState({
            roomInfo: {
                interpret: roomInfo.interpret,
                status: roomInfo.status,
                data: {
                    address: roomInfo.data.address,
                    channels: roomInfo.data.channels,
                    id: roomInfo.data.id,
                    name: roomInfo.data.name,
                    status: roomInfo.data.status,
                    type_id: roomInfo.data.type_id,
                    user_id: roomInfo.data.user_id
                }
            }
        })
    }

    render() {
        const {roomList} = this.state
        return (
            <div className="room-manage">
                <div className="callout-head">
                    <h1>房间管理</h1>
                </div>
                <div className="rooms-list">
                    <ul>
                        {
                            roomList ?
                                !roomList.status ?
                                    roomList.data.map((item, index) => {
                                        return (
                                            <li key={index} className="item"
                                                onClick={this.editRoom.bind(this, item.id)}>
                                                <div className="room-head">
                                                    <p>{item.num}</p>
                                                    <em></em>
                                                </div>
                                                <div className="room-name">
                                                    <p>{item.tname}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                    : <li className="no-room">
                                        暂无房间
                                    </li>
                                : <li className="loading">
                                    <Loading/>
                                </li>
                        }
                    </ul>
                </div>
                <ModelRoom {...this.state} onChangeRoom={this.onChangeEditRoom.bind(this)}
                           deteleRoomInfo={this.deteleRoomInfo.bind(this)}/>
            </div>
        )
    }
}

export default RoomList