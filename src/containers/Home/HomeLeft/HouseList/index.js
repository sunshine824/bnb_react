import React, {Component} from 'react'
import HouseItem from '@/components/HouseItem'

import './style.less'

class HouseList extends Component{
    render(){
        return(
            <div className="room-list">
                <ul>
                    <HouseItem/>
                </ul>
            </div>
        )
    }
}

export default HouseList