import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './style.less'

class LeftMenu extends Component {

    render() {
        const {path} = this.props

        return (
            <ul className='left-menu'>
                <li className={path === '/personal-info' ? 'active' : ''}>
                    <Link to='/personal-info'>账号信息</Link>
                </li>
                <li className={path === '/channel-set' ? 'active' : ''}>
                    <Link to='/channel-set'>渠道设置</Link>
                </li>
                <li className={path === '/color-remark' ? 'active' : ''}>
                    <Link to='/color-remark'>颜色备注</Link>
                </li>
                <li className={path === '/re-password' ? 'active' : ''}>
                    <Link to='/re-password'>修改密码</Link>
                </li>
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        path: state.save_path[0] ? state.save_path[0].path : ''
    }
}

export default connect(mapStateToProps)(LeftMenu)