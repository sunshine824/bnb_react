import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './style.less'

class HeadNav extends Component {

    render() {
        const {save_path} = this.props

        const path = () => {
            if (save_path[0]) {
                return save_path[0].path
            }
        }

        return (
            <ul className="main-nav">
                <li className={(path()==='/' || path()==='/home') ? 'active' : ''}>
                    <Link to="/">日历管理</Link>
                </li>
                <li className={path()==='/room-manage' ? 'active' : ''}>
                    <Link to="/room-manage">房源管理</Link>
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