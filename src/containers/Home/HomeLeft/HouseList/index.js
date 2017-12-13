import React, {Component} from 'react'
import HouseItem from '@/components/HouseItem'
import {getRoomListData} from '@/fetch/RoomList'

import './style.less'

class HouseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomList: []
        }
    }

    componentDidMount() {
        this.getRoomList()
    }

    getRoomList() {
        const result = getRoomListData()
        result.then((res) => {
            return res.json()
        }).then(json => {
            this.setState({
                roomList: json.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {roomList} = this.state
        return (
            <div className="room-list">
                <ul>
                    {
                        roomList ?
                            roomList.map((item, index) => {
                                return (
                                    <HouseItem key={index} {...item}/>
                                )
                            })
                            : ''
                    }
                </ul>
            </div>
        )
    }
}

export default HouseList