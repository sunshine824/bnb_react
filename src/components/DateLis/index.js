import React, {Component} from 'react'

import './style.less'

class DateLis extends Component {
    render(){
        return(
            <li>
                <dl className="date-cell">
                    <dt>
                        <b>12-12 二</b>
                    </dt>
                    <dd>剩20间</dd>
                </dl>
            </li>
        )
    }
}

export default DateLis