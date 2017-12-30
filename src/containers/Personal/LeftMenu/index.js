import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './style.less'

class LeftMenu extends Component{
    render(){
        return(
            <ul className='left-menu'>
                <li>
                    <Link to='/personal-info'>账号信息</Link>
                </li>
                <li>
                    <Link to='/channel-set'>渠道设置</Link>
                </li>
                <li>
                    <Link to='/color-remark'>颜色备注</Link>
                </li>
                <li>
                    <Link to='/re-password'>修改密码</Link>
                </li>
            </ul>
        )
    }
}

export default LeftMenu