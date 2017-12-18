import React, {Component} from 'react'

import './style.less'

class RoomList extends Component{
    render(){
        return(
            <div className="room-manage">
                <div className="callout-head">
                    <h1>房间管理</h1>
                </div>
                <div className="rooms-list">
                    <ul>
                        <li>
                            <div className="room-head">
                                <p>荣华</p>
                                <em></em>
                            </div>
                            <div className="room-name">
                                <p>观景台</p>
                            </div>
                        </li>
                        <li>
                            <div className="room-head">
                                <p>荣华</p>
                                <em></em>
                            </div>
                            <div className="room-name">
                                <p>观景台</p>
                            </div>
                        </li>
                        <li>
                            <div className="room-head">
                                <p>荣华</p>
                                <em></em>
                            </div>
                            <div className="room-name">
                                <p>观景台</p>
                            </div>
                        </li>
                        <li>
                            <div className="room-head">
                                <p>荣华</p>
                                <em></em>
                            </div>
                            <div className="room-name">
                                <p>观景台</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default RoomList