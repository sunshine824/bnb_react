import React, {Component} from 'react'
import ScreenBox from './ScreenBox'
import HouseList from './HouseList'

import './style.less'

class HomeLeft extends Component {
    render() {
        return (
            <div className="home-left">
                <ScreenBox/>
                <HouseList/>
            </div>
        )
    }
}

export default HomeLeft