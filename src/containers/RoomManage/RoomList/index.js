import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getRoomListData} from '@/fetch/RoomList'
import Loading from '@/components/Loading'

import './style.less'

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            roomList: ''
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
                                            <li key={index} className="item">
                                                <div className="room-head">
                                                    <p>{item.name}</p>
                                                    <em></em>
                                                </div>
                                                <div className="room-name">
                                                    <p>{item.abbre}</p>
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
            </div>
        )
    }
}

export default RoomList