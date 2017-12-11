import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './style.less'

class HeadNav extends Component {
    render() {
        return (
            <ul className="main-nav">
                <li className="active">
                    <Link to="">日历管理</Link>
                </li>
                <li>
                    <Link to="">房源管理</Link>
                </li>
                <li>
                    <Link to="">订单管理</Link>
                </li>
                <li>
                    <Link to="">合作收益</Link>
                </li>
            </ul>
        )
    }
}

export default HeadNav