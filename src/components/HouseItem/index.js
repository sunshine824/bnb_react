import React, {Component} from 'react'

import './style.less'

class HouseItem extends Component{
    render(){
        return(
            <li className="room-cell">
                <div className="room-cell-left">
                    <p className="room-cell-type">观景台</p>
                </div>
            </li>
        )
    }
}

export default HouseItem