import React, {Component} from 'react'
import DateList from './DateList'

import './style.less'

class HomeRight extends Component {
    render(){
        return(
            <div className="home-right">
                <DateList/>
            </div>
        )
    }
}

export default HomeRight