import React, {Component} from 'react'
import HouseList from './HouseList'
import TableList from './TableList'

import './style.less'

class HomeRight extends Component {
    render(){
        return(
            <div className="home-bottom">
                <HouseList/>
                <TableList/>
            </div>
        )
    }
}

export default HomeRight