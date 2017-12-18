import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class DateLis extends Component {
    render(){
        return(
            <li>
                <dl className="date-cell" markdate={this.props.item.slice(0,-2)}>
                    <dt>
                        <b>{this.props.item.slice(5)}</b>
                    </dt>
                    <dd>剩20间</dd>
                </dl>
            </li>
        )
    }
}

export default DateLis