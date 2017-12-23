import React, {Component} from 'react'
import ScreenBox from './ScreenBox'
import DateList from './DateList'

import './style.less'

class HomeLeft extends Component {
    render() {
        return (
            <div className="home-top">
                <ScreenBox/>
                <DateList/>
            </div>
        )
    }
}

export default HomeLeft