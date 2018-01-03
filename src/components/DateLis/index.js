import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class DateLis extends Component {
    render(){
        return(
            <li>
                <dl className="date-cell" markdate={this.props.date}>
                    <dt>
                        <b>{this.props.date}</b>
                    </dt>
                    <dd>剩 {this.props.room.has_count} 间</dd>
                </dl>
            </li>
        )
    }
}

export default DateLis