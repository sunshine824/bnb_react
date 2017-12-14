import React, {Component} from 'react'
import DateList from './DateList'
import TableList from './TableList'

import './style.less'

class HomeRight extends Component {
    render(){
        return(
            <div className="home-right">
                <DateList/>
                <TableList/>
            </div>
        )
    }
}

export default HomeRight