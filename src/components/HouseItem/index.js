import React, {Component} from 'react'

import './style.less'

class HouseItem extends Component{
    render(){
        return(
            <li className="room-cell">
                <div className="room-cell-left" type_id={this.props.type_id}>
                    <p className="room-cell-type">{this.props.abbre}</p>
                </div>
                <div className="room-cell-right" room_id={this.props.id}>
                    <p className="room-num-section">{this.props.num}</p>
                </div>
            </li>
        )
    }
}

export default HouseItem