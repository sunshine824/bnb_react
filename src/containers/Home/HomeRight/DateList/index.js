import React, {Component} from 'react'
import DateLis from '@/components/DateLis'

import './style.less'

class DateList extends Component {
    render(){
        return(
            <ul className="table-date-grid">
                <DateLis/>
            </ul>
        )
    }
}

export default DateList